import pytest

from birder.checks import RedisCheck
from birder.checks.base import BaseCheck
from birder.checks.registry import CheckRegistry


@pytest.fixture
def registry() -> CheckRegistry:
    reg = CheckRegistry(BaseCheck)
    reg.register(RedisCheck)
    return reg


def test_checks(registry):
    assert registry[0]


def test_from_conn_string(registry):
    checker = registry.checker_from_url("redis://localhost:6379/0")
    assert checker == RedisCheck
    with pytest.raises(ValueError, match="Unknown protocol"):
        registry.checker_from_url("miss://localhost:6379/0")
