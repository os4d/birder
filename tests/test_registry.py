import pytest

from birder.checks.base import BaseCheck
from birder.checks.registry import CheckRegistry


@pytest.fixture
def registry():
    return CheckRegistry(BaseCheck)


def test_checks(registry):
    assert registry == []

    # assert len(registry.checks) == 1
    # assert registry.uris == ("redis://127.0.0.1:6379/1")
    # assert registry["Redis"].trigger()
