from unittest import mock
from unittest.mock import Mock

import celery.exceptions
import pytest

from birder.checks import parser
from birder.checks.celery import CeleryCheck, CeleryConfig, CeleryQueueCheck
from birder.exceptions import CheckError


def test_celery_parser():
    checker, config = parser(
        "celery://user:password@localhost:2221?broker=redis",
    )
    cfg = checker.config_class(config)
    assert cfg.is_valid(), cfg.errors
    assert cfg.cleaned_data == {
        "broker": "redis",
        "hostname": "localhost",
        "port": 2221,
        "extra": "",
        "min_workers": 1,
        "timeout": 2,
    }


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


def test_celery_queue_parser():
    checker, config = parser(
        "celery+queue://user:password@localhost:2221?broker=redis",
    )
    cfg = checker.config_class(config)
    assert cfg.is_valid(), cfg.errors
    assert cfg.cleaned_data == {
        "broker": "redis",
        "hostname": "localhost",
        "max_queued": 1,
        "queue_name": "celery",
        "port": 2221,
        "extra": "",
        "timeout": 2,
    }


def test_celery_queue_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.celery.Broker", Mock())
    with mock.patch("birder.checks.celery.Broker") as mocked_check:
        with mock.patch("birder.checks.celery.asyncio.run") as mocked_run:
            mocked_run.return_value = [{"messages": 20}]
            mocked_check.return_value.queues.return_value = [{"worker1": {"ok": True}}, {"worker2": {"ok": False}}]
            c = CeleryQueueCheck(
                Mock(
                    configuration={
                        "hostname": "localhost",
                        "timeout": 5,
                        "broker": "redis",
                        "port": 5672,
                        "queue_name": "celery",
                        "max_queued": 10,
                    }
                )
            )
            assert c.check(True)


def test_celery_queue_check_fail(
    monkeypatch,
):
    monkeypatch.setattr("birder.checks.celery.Broker", Mock())
    with mock.patch("birder.checks.celery.Broker") as mocked_check:
        mocked_check.return_value.queues.side_effect = KeyError
        c = CeleryQueueCheck(Mock(configuration={"hostname": "hostname", "min_workers": "2"}))
        with pytest.raises(CheckError):
            assert c.check(raise_error=True)
        assert not c.check(raise_error=False)


@pytest.mark.parametrize(
    "config",
    [
        {"hostname": "hostname", "min_workers": "2"},
        {"hostname": "", "min_workers": ""},
        {"hostname": "hostname", "min_workers": ""},
        {"hostname": "hostname", "min_workers": "0"},
        {"hostname": "", "min_workers": "1"},
    ],
)
def test_celery_queue_config(config):
    assert CeleryQueueCheck.clean_config(config)
