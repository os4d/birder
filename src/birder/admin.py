from pathlib import Path

from admin_extra_buttons.decorators import button
from admin_extra_buttons.mixins import ExtraButtonsMixin
from adminfilters.autocomplete import AutoCompleteFilter, LinkedAutoCompleteFilter
from adminfilters.mixin import AdminFiltersMixin
from django import forms
from django.conf import settings
from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from django.db.models import Model, QuerySet
from django.http import Http404, HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .forms import MonitorForm
from .models import Environment, LogCheck, Monitor, Project, User
from .tasks import queue_trigger
from .ws.utils import notify_ui


@admin.register(User)
class UserAdmin(_UserAdmin[User]):
    search_fields = ("username",)


@admin.register(Project)
class ProjectAdmin(ExtraButtonsMixin, admin.ModelAdmin[Project]):
    search_fields = ("name",)
    list_display = (
        "name",
        "public",
    )
    filter_horizontal = ("environments",)

    def get_changeform_initial_data(self, request: HttpRequest) -> dict:
        initial = super().get_changeform_initial_data(request)
        initial.setdefault("environments", (Environment.objects.first()))
        return initial

    @button()
    def monitors(self, request: HttpRequest, pk: str) -> HttpResponseRedirect:
        url = reverse("admin:birder_monitor_changelist")
        return HttpResponseRedirect(f"{url}?project__exact={pk}")


class ChangeIconForm(forms.Form):
    icon = forms.CharField(required=False)

    @property
    def media(self) -> forms.Media:
        media = super().media
        media += forms.Media(
            js=[
                "admin/js/vendor/jquery/jquery.js",
                "admin/js/jquery.init.js",
                "change-icon.js",
            ],
            css={"screen": ["birder-admin.css"]},
        )
        return media


def assert_object_or_404(obj: Model) -> None:
    if not obj:
        raise Http404


@admin.register(Monitor)
class MonitorAdmin(ExtraButtonsMixin, AdminFiltersMixin, admin.ModelAdmin[Monitor]):
    search_fields = ("name",)
    list_display = ("name", "project", "environment", "counters", "checker", "active")
    list_filter = (
        ("project", LinkedAutoCompleteFilter.factory(parent=None)),
        ("environment", LinkedAutoCompleteFilter.factory(parent=None)),
        "strategy",
        "active",
    )
    actions = ["check_selected"]
    autocomplete_fields = ("environment", "project")
    form = MonitorForm

    @admin.display(ordering="strategy")
    def checker(self, obj: Monitor) -> bool:
        return obj.strategy.__class__.__name__

    @admin.display()
    def counters(self, obj: Monitor) -> str:
        return "{} / {} / {}".format(*obj.counters)

    def check_selected(self, request: HttpRequest, queryset: QuerySet[Monitor]) -> None:
        for m in queryset.all():
            queue_trigger.send(m.id)

    def get_fields(self, request: HttpRequest, obj: Monitor | None = None) -> list[str]:
        return [
            "name",
            "strategy",
            "project",
            "environment",
            "active",
            "warn_threshold",
            "err_threshold",
            "custom_icon",
            "description",
            "notes",
        ]

    @button(label="Refresh Token")
    def regenerate_token(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        self.object.regenerate_token(True)

    @button(label="Change Icon")
    def change_icon(self, request: HttpRequest, pk: str) -> HttpResponse:
        ctx = self.get_common_context(request, pk)
        assert_object_or_404(self.object)
        ctx["icons"] = sorted(
            [p.name for p in (Path(settings.PACKAGE_DIR) / "static" / "images" / "icons").glob("*.*")]
        )
        if request.method == "POST":
            form = ChangeIconForm(request.POST)
            if form.is_valid():
                self.object.custom_icon = form.cleaned_data["icon"]
                self.object.save()
                notify_ui("refresh", monitor=self.object, crud="update")
                return HttpResponseRedirect("..")
        form = ChangeIconForm(initial={"icon": self.object.custom_icon})
        ctx["form"] = form

        return render(request, "admin/birder/monitor/change_icon.html", ctx)

    @button(label="Check")
    def manual_check(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        monitor: Monitor = self.object
        assert_object_or_404(monitor)

        if monitor.run():
            self.message_user(request, "Monitor checked", level=messages.SUCCESS)
        else:
            self.message_user(request, "Monitor failed", level=messages.ERROR)

    @button()
    def configure(self, request: HttpRequest, pk: str) -> HttpResponse:
        ctx = self.get_common_context(request, pk)
        monitor: Monitor = self.object
        assert_object_or_404(monitor)
        if monitor.strategy.config_class:
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
            ctx["form_help"] = form.render_help(ctx, request=request, monitor=self.object)
        return render(request, "admin/birder/monitor/configure.html", ctx)


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
    search_fields = ("name",)
