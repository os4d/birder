from admin_extra_buttons.decorators import button
from admin_extra_buttons.mixins import ExtraButtonsMixin
from adminfilters.autocomplete import AutoCompleteFilter, LinkedAutoCompleteFilter
from adminfilters.mixin import AdminFiltersMixin
from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from .models import Environment, LogCheck, Monitor, Project, User
from .tasks import queue_trigger


@admin.register(User)
class UserAdmin(_UserAdmin[User]):
    search_fields = ("username",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin[Project]):
    search_fields = ("name",)


@admin.register(Monitor)
class MonitorAdmin(ExtraButtonsMixin, AdminFiltersMixin, admin.ModelAdmin[Monitor]):
    search_fields = ("name",)
    list_display = ("name", "status", "checker", "verbosity")
    list_filter = (("env", LinkedAutoCompleteFilter.factory(parent=None)),)
    actions = ["check_selected"]

    @admin.display(boolean=True)
    def status(self, obj: Monitor) -> bool:
        return obj.status

    @admin.display(ordering="strategy")
    def checker(self, obj: Monitor) -> bool:
        return obj.strategy.__class__.__name__

    def check_selected(self, request: HttpRequest, queryset: QuerySet[Monitor]) -> None:
        for m in queryset.all():
            queue_trigger.send(m.id)

    def get_fields(self, request: HttpRequest, obj: Monitor | None = None) -> list[str]:
        return ["name", "strategy", "project", "verbosity", "active", "grace_period"]

    @button(label="Refresh Token")
    def regenerate_token(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        self.object.regenerate_token(True)

    @button(label="Check")
    def manual_check(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        monitor: Monitor = self.object
        if monitor.trigger():
            self.message_user(request, "Monitor checked", level=messages.SUCCESS)
        else:
            self.message_user(request, "Monitor failed", level=messages.ERROR)

    @button()
    def configure(self, request: HttpRequest, pk: str) -> HttpResponse:
        ctx = self.get_common_context(request, pk)
        monitor: Monitor = self.object
        if request.method == "POST":
            form = monitor.strategy.config_class(request.POST, initial=monitor.configuration)
            if form.is_valid():
                monitor.configuration = form.cleaned_data
                if "check" in request.POST:
                    if not monitor.strategy.check():
                        self.message_user(request, "Check failed", level=messages.ERROR)
                    else:
                        self.message_user(request, "Check success", level=messages.SUCCESS)
                        monitor.save()
                        return HttpResponseRedirect("..")
                else:
                    monitor.save()
                    return HttpResponseRedirect("..")
        else:
            form = monitor.strategy.config_class(initial=monitor.configuration)
        ctx["form"] = form
        return render(request, "admin/monitor/configure.html", ctx)


@admin.register(LogCheck)
class LogCheckAdmin(ExtraButtonsMixin, AdminFiltersMixin, admin.ModelAdmin[LogCheck]):
    list_display = ("timestamp", "monitor", "status")
    list_filter = ("status", "timestamp", ("monitor", AutoCompleteFilter))
    readonly_fields = ("timestamp", "monitor", "status", "payload")

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False


@admin.register(Environment)
class EnvironmentAdmin(ExtraButtonsMixin, AdminFiltersMixin, admin.ModelAdmin[LogCheck]):
    list_display = ("name",)
