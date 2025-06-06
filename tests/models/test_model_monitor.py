from unittest import mock

from freezegun import freeze_time

from birder.exceptions import CheckError
from birder.models import Monitor


def test_model_monitor(monitor: Monitor):
    t = monitor.token
    monitor.regenerate_token()
    assert monitor.token != t

    monitor.regenerate_token(False)
    assert monitor.token


def test_model_trigger(monitor: Monitor, mocked_responses, monkeypatch):
    mocked_responses.add(mocked_responses.GET, "https://example.com", status=200)
    assert monitor.run()

    assert monitor.run()


def test_model_get_absolute_url(monitor: Monitor):
    assert monitor.get_absolute_url()


def test_model_monitor_run_local_trigger(monitor: Monitor):
    from birder.checks import HttpCheck

    monitor.strategy = HttpCheck(monitor)
    monitor.warn_threshold = 2
    monitor.err_threshold = 3
    assert monitor.run()
    assert monitor.counters == (0, 2, 3)
    with mock.patch.object(HttpCheck, "check") as mocked:
        mocked.side_effect = CheckError
        assert not monitor.run()
        assert monitor.failures == 1
        assert not monitor.run()
        assert monitor.failures == 2
        assert not monitor.run()
        assert monitor.failures == 3
        assert monitor.status == Monitor.Status.FAIL


def test_model_monitor_run_remote_trigger(monitor: Monitor):
    from birder.checks import HealthCheck

    monitor.strategy = HealthCheck(monitor)
    monitor.warn_threshold = 2
    monitor.err_threshold = 3
    monitor.run()

    with freeze_time("2020-01-01 00:00:00"):
        monitor.get()
        monitor.run()
    with freeze_time("2020-01-01 00:01:00"):
        monitor.run()
    with freeze_time("2020-01-01 00:02:00"):
        monitor.run()
