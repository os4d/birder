import logging
import os
from argparse import ArgumentParser
from typing import Any

from constance import config
from django.core.cache import cache
from django.core.management import BaseCommand, call_command

logger = logging.getLogger(__name__)

KEY = "birder:upgrade"


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def add_arguments(self, parser: ArgumentParser) -> None:
        super().add_arguments(parser)
        parser.add_argument(
            "--force",
            action="store_true",
            help="Bypass and delete lock",
        )

    def handle(self, *args: Any, **options: Any) -> None:
        from birder.models import Environment, User

        redis_client = cache.client.get_client()
        if options["force"]:
            redis_client.delete(KEY)
        if redis_client.get(KEY):
            return
        if redis_client.set(KEY, "locked", nx=True, ex=86400):
            try:
                call_command("migrate", interactive=False)
                call_command("collectstatic", interactive=False)
                from django.contrib.auth.models import Group

                Environment.objects.get_or_create(name="development")
                Environment.objects.get_or_create(name="staging")
                Environment.objects.get_or_create(name="production")

                g, is_new = Group.objects.get_or_create(name="Default")
                if is_new:
                    config.NEW_USER_DEFAULT_GROUP = g.pk
                if (admin_user_email := os.environ.get("ADMIN_EMAIL")) and os.environ.get("ADMIN_PASSWORD"):
                    try:
                        User.objects.get(email=admin_user_email)
                        self.stdout.write(self.style.WARNING("Exiting superuser found."))
                    except User.DoesNotExist:
                        User.objects.create_superuser(
                            username=admin_user_email, email=admin_user_email, password=os.environ.get("ADMIN_PASSWORD")
                        )
                        self.stdout.write(self.style.SUCCESS("Superuser created!"))

            finally:
                redis_client.delete(KEY)
        else:
            self.stdout.write("Concurrent process detected.")
