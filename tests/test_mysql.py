import os
from unittest import mock

from birder.checks import Celery, MySQL


@mock.patch.dict(os.environ, {'MONITOR_MYSQL': 'mysql://user:pass@localhost:3306/db1?charset=utf8mb4'})
def test_mysql():
    c = MySQL('MONITOR_MYSQL', os.environ['MONITOR_MYSQL'])
    assert c.conn_kwargs == dict(host="localhost",
                                 user='user',
                                 password='pass',
                                 db='db1',
                                 port=3306,
                                 charset='utf8mb4')
