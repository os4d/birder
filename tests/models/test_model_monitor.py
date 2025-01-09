from unittest.mock import Mock

from requests.exceptions import RequestException

from birder.models import Monitor


def test_model_monitor(monitor: Monitor):
    t = monitor.token
    monitor.regenerate_token()
    assert monitor.token != t

    monitor.regenerate_token(False)
    assert monitor.token


def test_model_trigger(monitor: Monitor, mocked_responses, monkeypatch):
    mocked_responses.add(mocked_responses.GET, "https://example.com", status=200)
    assert monitor.trigger()

    monitor.verbosity = Monitor.Verbosity.FULL
    assert monitor.trigger()


def test_model_trigger_errors(monitor: Monitor, mocked_responses, monkeypatch):
    mocked_responses.add(mocked_responses.GET, "https://example.com", status=500)
    monitor.verbosity = Monitor.Verbosity.FULL

    assert not monitor.trigger()
    assert monitor.logs.count() == 1

    monkeypatch.setattr("requests.get", Mock(side_effect=RequestException))
    assert not monitor.trigger()
    assert monitor.logs.count() == 2

    monitor.verbosity = Monitor.Verbosity.NONE
    assert not monitor.trigger()
    assert monitor.logs.count() == 2
