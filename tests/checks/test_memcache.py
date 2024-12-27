from unittest.mock import Mock, patch

import pytest
import redis

from birder.checks.memcache import MemCacheCheck
from birder.exceptions import CheckError


def test_memcache():
    c = MemCacheCheck(
        Mock(
            configuration={
                "host": "localhost",
                "port": 11211,
                "socket_timeout": 2,
                "socket_connect_timeout": 2,
                "password": "",
            }
        )
    )
    assert c.config
    assert c.config["port"] == 11211


def test_memcache_check_success():
    c = MemCacheCheck(configuration={"host": "localhost"})
    with patch("birder.checks.memcache.MemCacheClient", Mock()):
        assert c.check()


def test_memcache_check_fail():
    c = MemCacheCheck(configuration={"host": "localhost"})
    with patch("redis.Redis.ping", side_effect=redis.ConnectionError):
        assert not c.check()
        with pytest.raises(CheckError):
            c.check(True)
