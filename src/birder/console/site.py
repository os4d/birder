from django.utils.translation import gettext_lazy
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


console = ConsoleSite("console")
console.register(Project, ProjectAdmin)
console.register(Monitor, MonitorAdmin)
console.register(Environment, EnvironmentAdmin)
console.register(Deadline, DeadlineAdmin)
console.register(User, UserAdmin)
