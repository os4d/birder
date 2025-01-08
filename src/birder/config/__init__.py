from typing import TYPE_CHECKING

from environ import Env

if TYPE_CHECKING:
    ConfigItem: type = tuple[type, str]

CONFIG: "dict[str, ConfigItem]" = {
    "ALLOWED_HOSTS": (list, []),
    "AZURE_CLIENT_SECRET": (str, ""),
    "AZURE_TENANT_ID": (str, ""),
    "AZURE_CLIENT_KEY": (str, ""),
    "DATABASE_URL": (str, "sqlite:///birder.sqlite3"),
    "DEBUG": (bool, False),
    "EXTRA_APPS": (list, []),
    "GOOGLE_CLIENT_ID": (str, ""),
    "GOOGLE_CLIENT_SECRET": (str, ""),
    "LOG_LEVEL": (str, "ERROR"),
    "VALKEY_URL": (str, ""),
    "SOCIAL_AUTH_REDIRECT_IS_HTTPS": (bool, False),
    "SOCIAL_AUTH_RAISE_EXCEPTIONS": (bool, False),
    "SOCIAL_AUTH_WHITELISTED_DOMAINS": (list, []),
    "SOCIAL_AUTH_LOGIN_URL": (str, "/login/"),
    "STATIC_URL": (str, "static/"),
    "STATIC_ROOT": (str, "/app/static/"),
    "SECRET_KEY": (str, "super-secret-key"),
    "SUPERUSERS": (list, []),
}
env = Env(**CONFIG)
