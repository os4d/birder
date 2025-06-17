from typing import Any

from django.conf import settings
from django.http import HttpRequest
from django.templatetags.static import static
from django.urls import reverse_lazy

COMMON_CONFIG = {
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
}
UNFOLD = {
    **COMMON_CONFIG,
    "ENVIRONMENT": "birder.config.fragments.unfold.environment_callback",  # environment name in header
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
    "SHOW_HISTORY": True,  # show/hide "History" button, default: True
    "SHOW_BACK_BUTTON": False,  # show/hide "Back" button on changeform in header, default: False
    "THEME": "dark",  # Force theme: "dark" or "light". Will disable theme switcher
    "LOGIN": {
        "image": lambda request: static("images/birder.svg"),
        "redirect_after": lambda request: reverse_lazy("manage:index"),
    },
}


def dashboard_callback(request: HttpRequest, context: dict[str, Any]) -> dict[str, Any]:
    context.update(
        {
            "sample": "example",  # this will be injected into templates/admin/index.html
        }
    )
    return context


def environment_callback(request: "HttpRequest") -> tuple[str, str]:
    return settings.ENVIRONMENT


def badge_callback(request: "HttpRequest") -> int:
    return 3


def permission_callback(request: "HttpRequest") -> bool:
    return request.user.is_superuser
