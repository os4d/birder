from typing import TYPE_CHECKING

from environ import Env

if TYPE_CHECKING:
    ConfigItem: type = tuple[type, str]

CONFIG: "dict[str, ConfigItem]" = {
    "AZURE_CLIENT_SECRET": (str, ""),
    "AZURE_TENANT_ID": (str, ""),
    "AZURE_CLIENT_KEY": (str, ""),
    "DATABASE_URL": (str, "sqlite:///birder.sqlite3"),
    "GOOGLE_CLIENT_ID": (str, ""),
    "GOOGLE_CLIENT_SECRET": (str, ""),
    "SOCIAL_AUTH_REDIRECT_IS_HTTPS": (bool, False),
    "SOCIAL_AUTH_RAISE_EXCEPTIONS": (bool, False),
    "SOCIAL_AUTH_LOGIN_URL": (str, "/login/"),
    "DEBUG": (bool, True),
    "SUPERUSERS": (list, []),
    "SECRET_KEY": (str, "super-secret-key"),
    "EXTRA_APPS": (list, []),
}
env = Env(**CONFIG)
