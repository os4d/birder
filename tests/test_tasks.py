from birder.tasks import process, queue_trigger, clean_log


def test_task_execute(monitor):
    queue_trigger(monitor.pk)


def test_task_process(monitor):
    process()


def test_clean_log(db):
    clean_log()
