import pytest

from birder.checks.base import BaseCheck
from birder.checks.registry import CheckRegistry


@pytest.fixture
def registry():
    return CheckRegistry(BaseCheck)


def test_checks(registry):
    assert registry == []
