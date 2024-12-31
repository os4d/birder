import logging
from typing import Any

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand
from strategy_field.utils import fqn

from birder.checks import parser
from birder.models import Monitor, Project
from birder.ws.utils import notify_ui

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    requires_migrations_checks = False
    requires_system_checks = ()

    def handle(self, *args: Any, **options: Any) -> None:
        for m in Monitor.objects.all():
            notify_ui("update", monitor=m)
