import os
from unittest import mock

from birder.checks import Celery, MySQL, Postgres


@mock.patch.dict(os.environ, {'MONITOR_PG': 'postgres://user:pass@localhost:3306/db1?charset=utf8mb4'})
def test_mysql():
    c = Postgres('MONITOR_PG', os.environ['MONITOR_PG'])
    assert c.conn_kwargs == dict(host="localhost",
                                 user='user',
                                 password='pass',
                                 database='db1',
                                 port=3306,
                                 charset='utf8mb4')
