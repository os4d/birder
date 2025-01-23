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
