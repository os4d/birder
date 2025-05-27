from unittest import mock
from unittest.mock import Mock

import celery.exceptions
import pytest

from birder.checks.celery import CeleryCheck, CeleryConfig
from birder.exceptions import CheckError


def test_celery_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.celery.Control", Mock())
    with mock.patch("birder.checks.celery.Control") as mocked_check:
        mocked_check.return_value.ping.return_value = [{"worker1": {"ok": True}}, {"worker2": {"ok": False}}]
        c = CeleryCheck(
            Mock(
                configuration={
                    "hostname": "localhost",
                    "timeout": 5,
                    "broker": "redis",
                    "port": 5672,
                    "min_workers": 1,
                }
            )
        )
        assert c.check(True)


def test_celery_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.celery.Control", Mock(side_effect=celery.exceptions.CeleryError))

    c = CeleryCheck(
        Mock(
            configuration={
                "hostname": "localhost",
                "timeout": 2,
                "broker": "redis",
                "port": 5672,
                "min_workers": 1,
            }
        )
    )
    assert not c.check()

    monkeypatch.setattr("birder.checks.celery.Control", Mock(side_effect=celery.exceptions.CeleryError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(
    "config",
    [
        {
            "hostname": "localhost",
            "port": 5672,
            "timeout": 5,
            "broker": "redis",
            "min_workers": 1,
        },
        {
            "hostname": "localhost",
            "port": "5672",
            "timeout": "5",
            "broker": "redis",
            "min_workers": 1,
        },
    ],
)
def test_celery_config(config):
    c: CeleryConfig = CeleryCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 5
    assert str(c)


def test_celery_config_error():
    c: CeleryConfig = CeleryCheck.config_class(
        {
            "hostname": "localhost",
            "port": 5672,
            "timeout": "--",
            "broker": "redis",
            "min_workers": 1,
        }
    )
    assert not c.is_valid()
    assert c.errors == {"timeout": ["Enter a whole number."]}
