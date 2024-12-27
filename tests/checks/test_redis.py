from unittest.mock import Mock, patch

import pytest
import redis
from django.core.exceptions import ValidationError

from birder.checks.redis import RedisCheck
from birder.exceptions import CheckError


def test_redis():
    c = RedisCheck(
        Mock(
            configuration={
                "host": "localhost",
                "port": 6379,
                "socket_timeout": 2,
                "socket_connect_timeout": 2,
                "password": "",
            }
        )
    )
    assert c.config
    assert c.config["port"] == 6379


def test_redis_check_success():
    c = RedisCheck(configuration={"host": "localhost"})
    with patch("redis.Redis.ping"):
        assert c.check()


def test_redis_check_fail():
    c = RedisCheck(configuration={"host": "localhost"})
    with patch("redis.Redis.ping", side_effect=redis.ConnectionError):
        assert not c.check()
        with pytest.raises(CheckError):
            c.check(True)


def test_redis_config_from_uri():
    uri = "redis://:123@localhost:6379/0?&socket_timeout=4"
    assert RedisCheck.config_from_uri(uri) == {
        "host": "localhost",
        "port": 6379,
        "password": "123",
        "socket_timeout": 4,
        "socket_connect_timeout": 2,
    }

    uri = "redis://:123@localhost?&socket_timeout=4"
    assert RedisCheck.config_from_uri(uri) == {
        "host": "localhost",
        "port": 6379,
        "password": "123",
        "socket_timeout": 4,
        "socket_connect_timeout": 2,
    }
    with pytest.raises(ValidationError):
        assert RedisCheck.config_from_uri("http://")
