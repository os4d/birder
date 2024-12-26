from strategy_field.utils import fqn

from birder.checks import RedisCheck
from birder.models import Monitor


def test_model_monitor(monitor: Monitor):
    t = monitor.token
    monitor.regenerate_token()
    assert monitor.token != t

    monitor.regenerate_token(False)
    assert monitor.token


def test_model_monitor_from_conn_string():
    m = Monitor.from_conn_string("redis://:123@localhost:6379/0")
    assert fqn(m.strategy) == fqn(RedisCheck)
    assert m.configuration == {
        "host": "localhost",
        "port": 6379,
        "password": "123",
        "socket_connect_timeout": 5,
        "socket_timeout": 5,
    }
