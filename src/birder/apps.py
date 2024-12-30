from django.apps import AppConfig


class Config(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "birder"

    def ready(self) -> None:
        from . import tasks  # noqa
        from . import signals  # noqa
