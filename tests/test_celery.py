import os
from unittest import mock

from birder.checks import Celery


@mock.patch.dict(os.environ, {'MONITOR_CELERY': 'celery://localhost:6379/2?broker=redis&a=1'})
def test_celery():
    c = Celery('MONITOR_CELERY', os.environ['MONITOR_CELERY'])
    with mock.patch('birder.checks.CeleryApp'):
        with mock.patch('birder.checks.Control'):
            assert c.check()
