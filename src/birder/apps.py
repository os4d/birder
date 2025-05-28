from django.apps import AppConfig
from django.core import checks


class Config(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "birder"

    def ready(self) -> None:
        from . import handlers  # noqa
        from . import tasks  # noqa
        from .check import check_crypt

        checks.register(check_crypt, "birder")
