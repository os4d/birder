from __future__ import annotations

import multiprocessing
from typing import Any

from environ import Env

ConfigItem = tuple[Any, str | list | bool | int | float | bool]

CONFIG: dict[str, ConfigItem] = {
    "ADMIN_EMAIL": (str, ""),
    "ADMIN_PASSWORD": (str, ""),
    "ALLOWED_HOSTS": (list, []),
    "AZURE_CLIENT_KEY": (str, ""),
    "AZURE_CLIENT_SECRET": (str, ""),
    "AZURE_TENANT_ID": (str, ""),
    "CACHE_URL": (str, ""),
    "CHANNEL_BROKER": (str, ""),
    "CRYPT_KEYS": (list, []),
    "CRYPT_SALT_KEYS": (list, []),
    "CSRF_TRUSTED_ORIGINS": (list, []),
    "DATABASE_URL": (str, "sqlite:///birder.sqlite3"),
    "DEBUG": (bool, False),
    "ENVIRONMENT": (list, []),
    "EXTRA_APPS": (list, []),
    "GOOGLE_CLIENT_ID": (str, ""),
    "GOOGLE_CLIENT_SECRET": (str, ""),
    "LOG_LEVEL": (str, "ERROR"),
    "REDIS_SERVER": (str, "redis://redis-server:6379/0"),
    "SECRET_KEY": (str, ""),
    "SECURE_HSTS_SECONDS": (int, 0),
    "SOCIAL_AUTH_LOGIN_URL": (str, "/login/"),
    "SOCIAL_AUTH_RAISE_EXCEPTIONS": (bool, False),
    "SOCIAL_AUTH_REDIRECT_IS_HTTPS": (bool, False),
    "SOCIAL_AUTH_WHITELISTED_DOMAINS": (list, []),
    "SENTRY_DSN": (str, ""),
    "STATIC_ROOT": (str, "/app/static/"),
    "STATIC_URL": (str, "static/"),
    "SUPERUSERS": (list, []),
    "TASK_BROKER": (str, ""),
    "WORKER_PROCESSES": (int, multiprocessing.cpu_count()),
    "WORKER_THREADS": (int, 8),
}
env = Env(**CONFIG)
