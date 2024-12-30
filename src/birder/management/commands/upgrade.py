import logging
from typing import Any

from constance import config
from django.core.management import BaseCommand, call_command

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        call_command("migrate", interactive=False)

        from django.contrib.auth.models import Group

        g, is_new = Group.objects.get_or_create(name="Default")
        if is_new:
            config.NEW_USER_DEFAULT_GROUP = g.pk
