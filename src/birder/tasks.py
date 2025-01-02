from datetime import datetime, timedelta
from typing import Any

import dramatiq
from constance import config
from django.core.cache import cache
from django.utils import timezone
from dramatiq_crontab import cron
from durations_nlp import Duration

from birder.checks import BaseCheck
from birder.db import DataStore
from birder.models import LogCheck, Monitor
from birder.ws.utils import notify_ui


@dramatiq.actor
def queue_trigger(pk: str) -> None:
    if (m := Monitor.objects.get(active=True, pk=pk)) and m.strategy.mode == BaseCheck.MODE_ACTIVE:
        m.trigger()
        cache.set("system:last_check", timezone.now().strftime("%Y %b %d %H:%M"), timeout=86400)
        notify_ui("ping")


@cron("*/1 * * * *")  # every 5 minutes
@dramatiq.actor
def process() -> None:
    m: Monitor
    for m in Monitor.objects.filter(active=True):
        if m.strategy.mode == BaseCheck.MODE_ACTIVE:
            queue_trigger.send(m.pk)
        else:
            timestamp = datetime.now()
            m.mark_ts_check()
            if m.last_success:
                time_difference = timestamp - m.last_success
                offset = time_difference.total_seconds() // 60
                if offset:
                    m.mark_ts_failure()
                    m.check_status(offset)
                    m.incr_current_errors()
            else:
                m.mark_ts_failure()


@dramatiq.actor
def clean_log() -> dict[str, Any]:
    seconds = Duration(config.RETENTION_POLICY).to_seconds()
    offset = timezone.now() - timedelta(seconds=seconds)
    LogCheck.objects.filter(timestamp__lte=offset).delete()


@dramatiq.actor
def store_history() -> dict[str, Any]:
    m: Monitor
    for m in Monitor.objects.all():
        db = DataStore(m)
        db.archive(datetime.now())
