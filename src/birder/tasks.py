import logging
import sys
from datetime import datetime, timedelta

import dramatiq
from billiard.exceptions import TimeLimitExceeded
from constance import config
from django.core.management.color import make_style
from django.utils import timezone
from dramatiq_crontab import cron
from durations_nlp import Duration

from birder.db import DataStore
from birder.models import LogCheck, Monitor
from birder.ws.utils import notify_ui

logger = logging.getLogger(__name__)

style = make_style()
SECOND = 1000
MINUTE = SECOND * 60


@dramatiq.actor(max_age=MINUTE * 2, time_limit=SECOND * 5)
def queue_trigger(pk: str | int) -> None:
    timestamp = datetime.now()
    try:
        m = Monitor.objects.get(active=True, pk=pk)
    except Monitor.DoesNotExist:  # pragma: no cover
        logger.warning(f"Monitor #{pk} does not exist")
        return
    try:
        sys.stdout.write(style.SUCCESS(f"Run Monitor {m}\n"))
        logger.info(f"Monitor #{pk} triggered")
        m.run(timestamp)
    except TimeLimitExceeded:
        m.store_error(timestamp)
        m.store_last_timestamp_failure()
    except AttributeError:  # pragma: no cover
        logger.warning(f"Monitor #{pk} does not have a valid strategy")


@cron("*/1 * * * *")  # every 1 minute
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
