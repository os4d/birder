from birder.tasks import process, queue_trigger


def test_task_execute(monitor):
    queue_trigger(monitor.pk)


def test_task_process(monitor):
    process()
