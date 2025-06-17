from django.utils.translation import gettext_lazy
from unfold.sites import UnfoldAdminSite


class ManageSite(UnfoldAdminSite):
    site_title = gettext_lazy("Birder site admin")
    site_header = gettext_lazy("Birder")
    index_title = gettext_lazy("Birder")
    site_url = "/"
    index_template = None
    settings_name = "MANAGE_CONFIG"
