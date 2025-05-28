import logging
from typing import Any

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks import HealthCheck, parser
from birder.exceptions import CheckError
from birder.models import Environment, Monitor, Project

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        logging.disable(logging.CRITICAL)

        Monitor.objects.all().delete()
        demo, __ = Project.objects.get_or_create(name="Demo", public=True)
        demo.environments.add(*Environment.objects.all())
        demo.save()
        dev, __ = Environment.objects.get_or_create(name="development")
        Monitor.objects.get_or_create(
            project=demo,
            name="Remote",
            environment=dev,
            defaults={"strategy": fqn(HealthCheck)},
        )
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
            "smtp://admin@example.com:password@localhost:2560",
            "celery://localhost:36379?broker=redis",
            "celery+queue://localhost:36379?broker=redis",
            "tcp://localhost:8000",
            "http+xml://google.com",
        ]:
            try:
                checker, config = parser(url)
                frm = checker.config_class(config)
                frm.is_valid()
            except ValidationError as e:
                self.stdout.write(self.style.ERROR(f"{url}: {e}"))
            else:
                m, __ = Monitor.objects.get_or_create(
                    project=demo,
                    environment=dev,
                    name=checker.pragma[0],
                    strategy=fqn(checker),
                    defaults={"strategy": fqn(checker), "configuration": frm.cleaned_data},
                    notes=f"""
## {checker.pragma[0]}

{fqn(checker)}

url: `{url}`


""",
                )
                try:
                    if frm.is_valid():
                        if not checker(configuration=config).check():
                            self.stdout.write(self.style.WARNING(f"{checker.__name__}: {frm.cleaned_data}"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"{checker.__name__}: {frm.errors}"))
                    else:
                        self.stdout.write(self.style.ERROR(f"{checker.__name__}: {frm.errors}"))

                except (CheckError, ValueError):
                    self.stdout.write(self.style.ERROR(f"{checker.__name__}: {frm.errors}"))
