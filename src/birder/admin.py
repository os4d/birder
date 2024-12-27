from admin_extra_buttons.decorators import button
from admin_extra_buttons.mixins import ExtraButtonsMixin
from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from .models import Monitor, Project, User
from .tasks import queue_trigger


@admin.register(User)
class UserAdmin(_UserAdmin[User]):
    search_fields = ("username",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin[Project]):
    search_fields = ("name",)


@admin.register(Monitor)
class MonitorAdmin(ExtraButtonsMixin, admin.ModelAdmin[Monitor]):
    search_fields = ("name",)
    list_display = ("name", "status", "checker")
    list_filter = ("project",)
    actions = ["check_selected"]

    @admin.display(boolean=True)
    def status(self, obj: Monitor) -> bool:
        return obj.status

    @admin.display(ordering="strategy")
    def checker(self, obj: Monitor) -> bool:
        return obj.strategy.__class__.__name__

    def check_selected(self, request: HttpRequest, queryset: QuerySet[Monitor]) -> None:
        for m in queryset.all():
            queue_trigger.delay(m.id)

    def get_fields(self, request: HttpRequest, obj: Monitor | None = None) -> list[str]:
        if not obj:
            return ["name", "strategy", "project"]
        return ["name", "strategy", "project"]

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
                        monitor.save()
                        return HttpResponseRedirect("..")
                else:
                    monitor.save()
                    return HttpResponseRedirect("..")
        else:
            form = monitor.strategy.config_class(initial=monitor.configuration)
        ctx["form"] = form
        return render(request, "admin/monitor/configure.html", ctx)
