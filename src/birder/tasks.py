from birder.config.celery import app
from birder.models import Monitor


@app.task
def queue_trigger(pk: str) -> None:
    Monitor.objects.get(active=True, pk=pk).trigger()


@app.task
def process() -> None:
    for m in Monitor.objects.filter(active=True):
        queue_trigger.delay(m.pk)
