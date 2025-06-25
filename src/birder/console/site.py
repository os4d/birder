from django.http import HttpRequest
from django.utils.translation import gettext as _
from django.utils.translation import gettext_lazy
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.sites import UnfoldAdminSite

from birder.admin import (
    Deadline,
    DeadlineAdmin,
    Environment,
    EnvironmentAdmin,
    Monitor,
    MonitorAdmin,
    Project,
    ProjectAdmin,
    User,
    UserAdmin,
)


class ConsoleSite(UnfoldAdminSite):
    site_title = gettext_lazy("Birder Admin console")
    site_header = gettext_lazy("Birder")
    index_title = gettext_lazy("Birder")
    site_url = "/"
    index_template = None
    settings_name = "MANAGE_CONFIG"

    def has_permission(self, request: HttpRequest) -> bool:
        return bool(request.user.is_active and request.user.has_perm("can_access_console"))


class ConsoleUserAdmin(UserAdmin):
    list_display = ("username", "email")
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    # "is_staff",
                    # "is_superuser",
                    "groups",
                    # "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )


console = ConsoleSite("console")
console.register(Project, ProjectAdmin)
console.register(Monitor, MonitorAdmin)
console.register(Environment, EnvironmentAdmin)
console.register(Deadline, DeadlineAdmin)
console.register(User, ConsoleUserAdmin)
