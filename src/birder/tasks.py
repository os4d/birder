import logging
from datetime import datetime, timedelta

import dramatiq
from constance import config
from django.utils import timezone
from dramatiq_crontab import cron
from durations_nlp import Duration

from birder.db import DataStore
from birder.models import LogCheck, Monitor
from birder.ws.utils import notify_ui

logger = logging.getLogger(__name__)


@dramatiq.actor
def queue_trigger(pk: str | int) -> None:
    try:
        m = Monitor.objects.get(active=True, pk=pk)
        m.run()
    except Monitor.DoesNotExist:
        logger.warning(f"Monitor #{pk} does not exist")


@cron("*/1 * * * *")  # every 5 minutes
@dramatiq.actor
def process() -> None:
    m: Monitor
    notify_ui("ping", timestamp=timezone.now().strftime(config.DATETIME_FORMAT))
    for m in (
        Monitor.objects.select_related("project", "environment").filter(active=True).order_by("project", "environment")
    ):
        queue_trigger.send(m.pk)


@dramatiq.actor
def clean_log() -> None:
    seconds = Duration(config.RETENTION_POLICY).to_seconds()
    offset = timezone.now() - timedelta(seconds=seconds)
    LogCheck.objects.filter(timestamp__lte=offset).delete()


@dramatiq.actor
def store_history() -> None:
    m: Monitor
    for m in Monitor.objects.all():
        db = DataStore(m)
        db.archive(datetime.now())
