from birder.config.celery import app
from birder.models import Monitor


@app.task
def execute(pk: str) -> None:
    Monitor.objects.get(active=True, pk=pk).trigger()


@app.task
def process() -> None:
    for m in Monitor.objects.filter(active=True):
        execute.delay(m.pk)
