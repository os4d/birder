from unittest import mock
from unittest.mock import Mock

import pytest

from birder.checks import parser
from birder.checks.celery import CeleryQueueCheck
from birder.exceptions import CheckError


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
