from birder.tasks import clean_log, process, queue_trigger, store_history


def test_task_execute(monitor):
    queue_trigger(monitor.pk)


def test_task_process(monitor):
    process()


def test_clean_log(db):
    clean_log()


def test_store_history(monitor):
    store_history()
