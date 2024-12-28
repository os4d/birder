from datetime import timedelta
from typing import Any

from constance import config
from django.core.cache import cache
from django.utils import timezone
from durations_nlp import Duration

from birder.config.celery import app
from birder.models import LogCheck, Monitor


@app.task
def queue_trigger(pk: str) -> dict[str, bool]:
    res = Monitor.objects.get(active=True, pk=pk).trigger()
    cache.set("system:last_check", timezone.now().strftime("%Y %b %d %H:%M"), timeout=86400)
    return {"result": res}


@app.task
def process() -> None:
    for m in Monitor.objects.filter(active=True):
        queue_trigger.delay(m.pk)


@app.task
def clean_log() -> dict[str, Any]:
    seconds = Duration(config.RETENTION_POLICY).to_seconds()
    offset = timezone.now() - timedelta(seconds=seconds)
    ret = LogCheck.objects.filter(timestamp__lte=offset).delete()
    return {"success": ret}
