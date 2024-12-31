import logging
from typing import Any

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks import parser
from birder.models import Monitor, Project

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        logging.disable(logging.CRITICAL)

        Monitor.objects.all().delete()
        demo, __ = Project.objects.get_or_create(name="Demo")
        for url in [
            "https://google.com",
            "redis://localhost:26379",
            "postgres://postgres:@localhost/postgres",
            "ftp://alpineftp:alpineftp@localhost:2221",
            "ldap://admin:password@localhost:1389",
            "mysql://root:password@localhost:23306",
            "https+json://dummyjson.com/c/3029-d29f-4014-9fb4",
            "ssh://user:password@localhost:2222",
            "memcache://localhost:21121",
            "rabbitmq://localhost:25672",
            "smtp://admin:password@localhost:2560",
            "celery://localhost:26379?broker=redis",
            "tcp://localhost:8000",
            "http+xml://google.com",
        ]:
            try:
                checker, config = parser(url)
                frm = checker.config_class(config)
            except ValidationError as e:
                self.stdout.write(self.style.ERROR(f"{url}: {e}"))
            else:
                m, __ = Monitor.objects.get_or_create(
                    project=demo,
                    name=checker.pragma[0],
                    strategy=fqn(checker),
                    defaults={"strategy": fqn(checker), "configuration": config},
                    verbosity=Monitor.Verbosity.FULL,
                    notes=f"""
## {checker.pragma[0]}

{fqn(checker)}

url: `{url}`


""",
                )
                m.trigger()
                if frm.is_valid():
                    if not checker(configuration=config).check():
                        self.stdout.write(self.style.WARNING(f"{checker.__name__}: {frm.cleaned_data}"))
                else:
                    self.stdout.write(self.style.ERROR(f"{checker.__name__}: {frm.errors}"))
