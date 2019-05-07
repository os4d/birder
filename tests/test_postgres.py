from birder.checks import Postgres


def test_pg1():
    c = Postgres('MONITOR_PG', 'postgres://localhost/db1?charset=utf8mb4')
    assert c.conn_kwargs == dict(host="localhost",
                                 user=None,
                                 password=None,
                                 database='db1',
                                 port=5432,
                                 charset='utf8mb4')


def test_pg2():
    c = Postgres('MONITOR_PG', 'postgres://user:@localhost/db1?charset=utf8mb4')
    assert c.conn_kwargs == dict(host="localhost",
                                 user='user',
                                 password='',
                                 database='db1',
                                 port=5432,
                                 charset='utf8mb4')


def test_pg3():
    c = Postgres('MONITOR_PG', 'postgres://user:pass@localhost/db1?charset=utf8mb4')
    assert c.conn_kwargs == dict(host="localhost",
                                 user='user',
                                 password='pass',
                                 database='db1',
                                 port=5432,
                                 charset='utf8mb4')
