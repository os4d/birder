from datetime import timedelta
from typing import Any

import dramatiq
from constance import config
from django.core.cache import cache
from django.utils import timezone
from dramatiq_crontab import cron
from durations_nlp import Duration

from birder.models import LogCheck, Monitor
from birder.ws.utils import notify_ui


@dramatiq.actor
def queue_trigger(pk: str) -> dict[str, bool]:
    Monitor.objects.get(active=True, pk=pk).trigger()
    cache.set("system:last_check", timezone.now().strftime("%Y %b %d %H:%M"), timeout=86400)
    notify_ui("ping")


@cron("*/1 * * * *")  # every 5 minutes
@dramatiq.actor
def process() -> None:
    for m in Monitor.objects.filter(active=True):
        queue_trigger.send(m.pk)


@dramatiq.actor
def clean_log() -> dict[str, Any]:
    seconds = Duration(config.RETENTION_POLICY).to_seconds()
    offset = timezone.now() - timedelta(seconds=seconds)
    LogCheck.objects.filter(timestamp__lte=offset).delete()
