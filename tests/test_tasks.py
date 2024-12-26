from birder.tasks import execute, process


def test_task_execute(monitor):
    execute(monitor.pk)


def test_task_process(monitor):
    process()
