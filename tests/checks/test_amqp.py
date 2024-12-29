from unittest.mock import Mock

import kombu.exceptions
import pytest

from birder.checks.amqp import AmqpCheck, AmqpConfig
from birder.exceptions import CheckError


def test_amqp_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.amqp.KombuConnection", Mock())
    c = AmqpCheck(Mock(configuration={"hostname": "localhost", "timeout": 10}))
    assert c.check(True)


def test_amqp_check_fail(monkeypatch, mocked_responses):
    mocked_responses.add("GET", "localhost/", json={}, status=404)

    c = AmqpCheck(Mock(configuration={"hostname": "localhost", "timeout": 2}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.amqp.KombuConnection", Mock(side_effect=kombu.exceptions.OperationalError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(
    "config",
    [
        {"hostname": "localhost", "port": 5672, "connect_timeout": 5},
        {"hostname": "localhost", "port": "5672", "connect_timeout": "5"},
    ],
)
def test_amqp_config(config):
    c: AmqpConfig = AmqpCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["connect_timeout"] == 5
    assert str(c)


def test_amqp_config_error():
    c: AmqpConfig = AmqpCheck.config_class({"hostname": "localhost", "port": 5672, "connect_timeout": "--"})
    assert not c.is_valid()
    assert c.errors == {"connect_timeout": ["Enter a whole number."]}
