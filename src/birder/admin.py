import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from admin_extra_buttons.decorators import button
from admin_extra_buttons.mixins import ExtraButtonsMixin
from adminfilters.autocomplete import AutoCompleteFilter, LinkedAutoCompleteFilter
from adminfilters.mixin import AdminFiltersMixin
from django.conf import settings
from django.contrib import admin, messages
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from django.db.models import Model, QuerySet
from django.forms import Form
from django.http import Http404, HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.templatetags.static import static
from django.urls import reverse
from flags.models import FlagState
from strategy_field.admin import StrategyFieldListFilter
from unfold.admin import ModelAdmin as UnfoldModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from .forms import ChangeIconForm, FlagStateForm, MonitorForm
from .models import Deadline, Environment, LogCheck, Monitor, Project, User
from .tasks import queue_trigger
from .ws.utils import notify_ui

logger = logging.getLogger(__name__)

if TYPE_CHECKING:
    from django.contrib.admin.options import _FieldGroups


class BirderAdminMixin(ExtraButtonsMixin, AdminFiltersMixin, UnfoldModelAdmin):
    pass


@admin.register(User)
class UserAdmin(BaseUserAdmin, BirderAdminMixin):
    search_fields = ("username",)
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm


@admin.register(Project)
class ProjectAdmin(BirderAdminMixin, admin.ModelAdmin[Project]):
    search_fields = ("name",)
    list_display = (
        "name",
        "public",
    )
    filter_horizontal = ("environments",)
    conditional_fields = {"default_environment": "not pk"}

    def get_changeform_initial_data(self, request: HttpRequest) -> dict:
        initial = super().get_changeform_initial_data(request)
        initial.setdefault("environments", (Environment.objects.first()))
        return initial

    @button()
    def monitors(self, request: HttpRequest, pk: str) -> HttpResponseRedirect:
        url = reverse("admin:birder_monitor_changelist")
        return HttpResponseRedirect(f"{url}?project__exact={pk}")

    def get_fields(self, request: "HttpRequest", obj: Project | None = None) -> "_FieldGroups":
        if obj:
            return super().get_fields(request, obj)
        return ["name", "environments"]

    def save_model(self, request: HttpRequest, obj: Model, form: Form, change: Any) -> None:
        if not obj.pk:
            obj.default_environment = form.cleaned_data["environments"].first()
        super().save_model(request, obj, form, change)


def assert_object_or_404(obj: Model | None) -> None:
    if not obj:
        raise Http404


class StrategyFieldListComboFilter(StrategyFieldListFilter):
    template = "strategy_field/list_filter.html"


@admin.register(Monitor)
class MonitorAdmin(BirderAdminMixin, admin.ModelAdmin[Monitor]):
    search_fields = ("name",)
    list_display = ("name", "project", "environment", "counters", "checker", "active")
    list_filter = (
        ("project", LinkedAutoCompleteFilter.factory(parent=None)),
        ("environment", LinkedAutoCompleteFilter.factory(parent=None)),
        ("strategy", StrategyFieldListComboFilter),
        "active",
    )
    actions = ["check_selected"]
    autocomplete_fields = ("environment", "project")
    form = MonitorForm
    change_form_template = None
    fields = (
        "name",
        "project",
        "environment",
        "strategy",
    )

    @admin.display(ordering="strategy")
    def checker(self, obj: Monitor) -> str:
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
            [
                (p.name, request.build_absolute_uri(static(f"images/icons/{p.name}")))
                for p in (Path(settings.PACKAGE_DIR) / "static" / "images" / "icons").glob("*.*")
            ]
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

    @button(label="Run")
    def manual_run(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        monitor: Monitor = self.object
        assert_object_or_404(monitor)
        try:
            if monitor.run():
                self.message_user(request, "Monitor checked", level=messages.SUCCESS)
            else:
                self.message_user(request, "Monitor failed", level=messages.ERROR)
        except Exception as e:  # noqa #BLE001
            self.message_user(request, str(e), level=messages.ERROR)

    @button(label="Check")
    def manual_check(self, request: HttpRequest, pk: str) -> HttpResponse:
        self.get_common_context(request, pk)
        monitor: Monitor = self.object
        assert_object_or_404(monitor)
        try:
            monitor.strategy.check(raise_error=True)
            self.message_user(request, "Monitor check success", level=messages.SUCCESS)
        except Exception as e:  # noqa #BLE001
            logger.exception("Monitor check failed", exc_info=e)
            self.message_user(request, f"Monitor check failure: {e}", level=messages.ERROR)

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
class LogCheckAdmin(BirderAdminMixin, admin.ModelAdmin[LogCheck]):
    list_display = ("timestamp", "monitor", "status")
    list_filter = ("status", "timestamp", ("monitor", AutoCompleteFilter))
    readonly_fields = ("timestamp", "monitor", "status", "payload")

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False


@admin.register(Environment)
class EnvironmentAdmin(BirderAdminMixin, admin.ModelAdmin[LogCheck]):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Deadline)
class DeadlineAdmin(BirderAdminMixin, admin.ModelAdmin[LogCheck]):
    autocomplete_fields = ("monitor",)

    list_display = ("monitor", "start", "end", "recurrences")
    search_fields = ("monitor__name",)


admin.site.unregister(FlagState)
admin.site.unregister(Group)


@admin.register(FlagState)
class FlagStateAdmin(BirderAdminMixin, admin.ModelAdmin[FlagState]):
    form = FlagStateForm


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, BirderAdminMixin):
    pass
