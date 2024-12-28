from typing import TYPE_CHECKING

from environ import Env

if TYPE_CHECKING:
    ConfigItem: type = tuple[type, str]

CONFIG: "dict[str, ConfigItem]" = {
    "AZURE_CLIENT_SECRET": (str, ""),
    "AZURE_TENANT_ID": (str, ""),
    "AZURE_CLIENT_KEY": (str, ""),
    "CELERY_BROKER_URL": (str, ""),
    "CELERY_TASK_ALWAYS_EAGER": (bool, False),
    "CELERY_TASK_STORE_EAGER_RESULT": (bool, True),
    "CELERY_TASK_EAGER_PROPAGATES": (bool, True),
    "CELERY_VISIBILITY_TIMEOUT": (int, None),
    "DATABASE_URL": (str, "sqlite:///birder.sqlite3"),
    "DEBUG": (bool, True),
    "EXTRA_APPS": (list, []),
    "GOOGLE_CLIENT_ID": (str, ""),
    "GOOGLE_CLIENT_SECRET": (str, ""),
    "LOG_LEVEL": (str, "ERROR"),
    "SOCIAL_AUTH_REDIRECT_IS_HTTPS": (bool, False),
    "SOCIAL_AUTH_RAISE_EXCEPTIONS": (bool, False),
    "SOCIAL_AUTH_LOGIN_URL": (str, "/login/"),
    "SECRET_KEY": (str, "super-secret-key"),
    "SUPERUSERS": (list, []),
}
env = Env(**CONFIG)
