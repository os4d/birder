import os
from unittest import mock

from birder.checks import Celery


@mock.patch.dict(os.environ,{'MONITOR_CELERY':'celery://192.168.66.66:6379/2?broker=redis&a=1'})
def test_celery():
    c = Celery('MONITOR_CELERY', os.environ['MONITOR_CELERY'])
    assert c.check()
