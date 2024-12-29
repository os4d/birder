from birder.tasks import clean_log, process, queue_trigger


def test_task_execute(monitor):
    queue_trigger(monitor.pk)


def test_task_process(monitor):
    process()


def test_clean_log(db):
    clean_log()
