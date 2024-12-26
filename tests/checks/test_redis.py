from unittest.mock import Mock, patch

import pytest
import redis
from django.core.exceptions import ValidationError

from birder.checks.redis import RedisCheck


def test_redis():
    c = RedisCheck(
        Mock(
            configuration={
                "host": "localhost",
                "port": 6379,
                "socket_timeout": 5,
                "socket_connect_timeout": 5,
                "password": "",
            }
        )
    )
    assert c.config
    assert c.config["port"] == 6379


def test_redis_check(mocked_responses):
    c = RedisCheck(
        Mock(
            configuration={
                "host": "localhost",
                "port": 6379,
                "socket_timeout": 5,
                "socket_connect_timeout": 5,
                "password": "",
            }
        )
    )
    with patch("redis.Redis.ping"):
        assert c.check()
    with patch("redis.Redis.ping", side_effect=redis.ConnectionError()):
        assert not c.check()


def test_redis_config_from_uri():
    uri = "redis://:123@localhost:6379/0?&socket_timeout=4"
    assert RedisCheck.config_from_uri(uri) == {
        "host": "localhost",
        "port": 6379,
        "password": "123",
        "socket_timeout": 4,
        "socket_connect_timeout": 5,
    }

    uri = "redis://:123@localhost?&socket_timeout=4"
    assert RedisCheck.config_from_uri(uri) == {
        "host": "localhost",
        "port": 6379,
        "password": "123",
        "socket_timeout": 4,
        "socket_connect_timeout": 5,
    }
    with pytest.raises(ValidationError):
        assert RedisCheck.config_from_uri("http://")
