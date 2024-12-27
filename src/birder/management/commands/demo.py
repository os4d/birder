import logging
from typing import Any

from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks.registry import registry
from birder.models import Monitor, Project

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        Monitor.objects.all().delete()
        demo, __ = Project.objects.get_or_create(name="Demo")
        for url in [
            "https://google.com",
            "redis://localhost:26379",
            "postgres://postgres:@localhost/postgres",
            "ftp://user:password@localhost:2221",
            "mysql://root:password@localhost:23306",
            "https+json://json.org:28000",
            "ssh://user:password@localhost:2222",
            "memcache://localhost:21121",
        ]:
            checker, config = registry.from_conn_string(url)
            m, __ = Monitor.objects.get_or_create(
                project=demo,
                name=url,
                strategy=fqn(checker),
                defaults={"strategy": fqn(checker), "configuration": config},
            )
            m.trigger()
