from __future__ import annotations

from typing import Any

from environ import Env

ConfigItem = tuple[Any, str | list | bool]

CONFIG: dict[str, ConfigItem] = {
    "ADMIN_EMAIL": (str, ""),
    "ADMIN_PASSWORD": (str, ""),
    "ALLOWED_HOSTS": (list, []),
    "AZURE_CLIENT_KEY": (str, ""),
    "AZURE_CLIENT_SECRET": (str, ""),
    "AZURE_TENANT_ID": (str, ""),
    "CACHE_URL": (str, "redis://host:6379/0"),
    "CSRF_TRUSTED_ORIGINS": (list, []),
    "DATABASE_URL": (str, "sqlite:///birder.sqlite3"),
    "DEBUG": (bool, False),
    "EXTRA_APPS": (list, []),
    "GOOGLE_CLIENT_ID": (str, ""),
    "GOOGLE_CLIENT_SECRET": (str, ""),
    "LOG_LEVEL": (str, "ERROR"),
    "SECRET_KEY": (str, "super-secret-key"),
    "SOCIAL_AUTH_LOGIN_URL": (str, "/login/"),
    "SOCIAL_AUTH_RAISE_EXCEPTIONS": (bool, False),
    "SOCIAL_AUTH_REDIRECT_IS_HTTPS": (bool, False),
    "SOCIAL_AUTH_WHITELISTED_DOMAINS": (list, []),
    "STATIC_ROOT": (str, "/app/static/"),
    "STATIC_URL": (str, "static/"),
    "SUPERUSERS": (list, []),
    "VALKEY_URL": (str, "redis://host:6379/0"),
}
env = Env(**CONFIG)
