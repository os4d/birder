import logging
from typing import Any

from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks import HttpCheck
from birder.models import Environment, Monitor, Project

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        logging.disable(logging.CRITICAL)
        prd, __ = Environment.objects.get_or_create(name="production")
        sample, __ = Project.objects.get_or_create(name="Sample", defaults={"default_environment": prd, "public": True})
        sample.environments.add(prd)
        sample.save()
        Monitor.objects.update_or_create(
            project=sample,
            name="Google",
            environment=prd,
            defaults={
                "strategy": fqn(HttpCheck),
                "configuration": {"url": "https://www.google.com/", "auth_type": ""},
                "notes": """
- [https://www.google.com/](https://www.google.com/)
""",
            },
        )
