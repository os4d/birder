from typing import TYPE_CHECKING

from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

if TYPE_CHECKING:
    from django.http import HttpRequest

COMMON_CONFIG = {
    "SITE_DROPDOWN": [
        {
            "icon": "diamond",
            "title": _("Birder"),
            "link": "https://github.com/os4d/birder",
        },
        # ...
    ],
    "ENVIRONMENT": "birder.config.fragments.unfold.environment_callback",  # environment name in header
    "SHOW_HISTORY": True,
    "SITE_TITLE": "Birder: ",
    "SITE_HEADER": "Birder",
    "SITE_SUBHEADER": "Appears under SITE_HEADER",
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/x-icon",
            "href": lambda request: static("itcaster/images/favicon.ico"),
        },
    ],
    "SITE_URL": "/",
    "SITE_ICON": {
        "light": lambda request: static("images/birder.svg"),  # light mode
        "dark": lambda request: static("images/birder_dark.svg"),  # dark mode
    },
    "SITE_LOGO": {
        "light": lambda request: static("images/birder.svg"),  # light mode
        "dark": lambda request: static("images/birder_dark.svg"),  # dark mode
    },
    "STYLES": [
        lambda request: static("/css/styles_admin.css"),
    ],
    "BORDER_RADIUS": "6px",
    "COLORS": {
        "base": {
            "50": "249, 250, 251",
            "100": "243, 244, 246",
            "200": "229, 231, 235",
            "300": "209, 213, 219",
            "400": "156, 163, 175",
            "500": "107, 114, 128",
            "600": "75, 85, 99",
            "700": "55, 65, 81",
            "800": "31, 41, 55",
            "900": "17, 24, 39",
            "950": "3, 7, 18",
        },
        "primary": {
            "50": "254, 242, 242",
            "100": "254, 226, 226",
            "200": "254, 202, 202",
            "300": "252, 165, 165",
            "400": "248, 113, 113",
            "500": "239, 68, 68",
            "600": "220, 38, 38",
            "700": "185, 28, 28",
            "800": "153, 27, 27",
            "900": "127, 29, 29",
            "950": "76, 23, 23",
        },
        "font": {
            "subtle-light": "var(--color-base-500)",  # text-base-500
            "subtle-dark": "var(--color-base-400)",  # text-base-400
            "default-light": "var(--color-base-600)",  # text-base-600
            "default-dark": "var(--color-base-300)",  # text-base-300
            "important-light": "var(--color-base-900)",  # text-base-900
            "important-dark": "var(--color-base-100)",  # text-base-100
        },
    },
    "SIDEBAR": {
        "show_search": True,  # Search in applications and models names
        "show_all_applications": True,  # Dropdown with all applications and models
    },
}
UNFOLD = {
    **COMMON_CONFIG,
    "SHOW_VIEW_ON_SITE": True,  # show/hide "View on site" button, default: True
    "LOGIN": {
        "image": lambda request: static("images/birder.svg"),
        "redirect_after": lambda request: reverse_lazy("admin:index"),
    },
    "SIDEBAR": {
        "show_search": True,  # Search in applications and models names
        "show_all_applications": True,  # Dropdown with all applications and models
    },
}
MANAGE_CONFIG = {
    **COMMON_CONFIG,
    "SITE_SYMBOL": "speed",  # symbol from icon set
    "SHOW_BACK_BUTTON": True,  # show/hide "Back" button on changeform in header, default: False
    "THEME": "dark",  # Force theme: "dark" or "light". Will disable theme switcher
    "LOGIN": {
        "image": lambda request: static("images/birder.svg"),
        "redirect_after": lambda request: reverse_lazy("console:index"),
    },
    "SIDEBAR": {
        "show_search": False,  # Search in applications and models names
        "show_all_applications": False,  # Dropdown with all applications and models
        "navigation": [
            {
                "title": _("Configuration"),
                "separator": True,  # Top border
                "collapsible": False,  # Collapsible group of links
                "items": [
                    {
                        "title": _("Projects"),
                        "icon": "P",
                        "link": reverse_lazy("console:birder_project_changelist"),
                    },
                    {
                        "title": _("Environments"),
                        "icon": "E",
                        "link": reverse_lazy("console:birder_environment_changelist"),
                    },
                    {
                        "title": _("Monitors"),
                        "icon": "M",
                        "link": reverse_lazy("console:birder_monitor_changelist"),
                    },
                    {
                        "title": _("Deadlines"),
                        "icon": "D",
                        "link": reverse_lazy("console:birder_deadline_changelist"),
                    },
                ],
            },
            {
                "title": _("Security"),
                "separator": True,  # Top border
                "collapsible": False,  # Collapsible group of links
                "items": [
                    {
                        "title": _("Users"),
                        "icon": "people",
                        "link": reverse_lazy("console:birder_user_changelist"),
                    },
                ],
            },
        ],
    },
    "TABS": [
        {
            "models": [
                "birder.project",
            ],
            "items": [
                {
                    "title": _("Environments"),
                    "link": reverse_lazy("console:birder_environment_changelist"),
                    "permission": True,
                },
            ],
        }
    ],
}


def environment_callback(request: "HttpRequest") -> tuple[str, str]:
    return settings.ENVIRONMENT  # type: ignore[return-value]
