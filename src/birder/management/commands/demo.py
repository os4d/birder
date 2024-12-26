import logging
from typing import Any

from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks import HttpCheck
from birder.models import Monitor, Project

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        demo, __ = Project.objects.get_or_create(name="Demo")
        for url in [
            "https://www.google.com",
            "https://github.com",
            "https://os4d.org",
            "http://example.com",
            "https://gitlab.com/",
            "https://pypi.org/",
            "https://www.djangoproject.com/",
            "https://mail.google.com/",
            "redis://localhost",
        ]:
            Monitor.objects.get_or_create(
                project=demo,
                name=url,
                strategy=fqn(HttpCheck),
                configuration={
                    "url": "http://www.google.com/?a=1",
                    "match": "",
                    "timeout": 10,
                    "status_success": "200",
                },
            )
