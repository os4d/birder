import logging
from typing import Any

from constance import config
from django.core.management import BaseCommand, call_command
from django_celery_beat.models import CrontabSchedule, IntervalSchedule, PeriodicTask

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

        min5, __ = IntervalSchedule.objects.get_or_create(every=5, period=IntervalSchedule.MINUTES)
        week1, __ = IntervalSchedule.objects.get_or_create(every=7, period=IntervalSchedule.DAYS)
        sunday, __ = CrontabSchedule.objects.get_or_create(day_of_week="0")

        PeriodicTask.objects.get_or_create(name="process", defaults={"task": "birder.tasks.process", "interval": min5})
        PeriodicTask.objects.get_or_create(
            name="clean_log", defaults={"task": "birder.tasks.clean_log", "crontab": sunday}
        )
