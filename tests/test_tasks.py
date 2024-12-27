from birder.tasks import queue_trigger, process


def test_task_execute(monitor):
    queue_trigger(monitor.pk)


def test_task_process(monitor):
    process()
