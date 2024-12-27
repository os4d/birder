from birder.models import Monitor


def test_model_monitor(monitor: Monitor):
    t = monitor.token
    monitor.regenerate_token()
    assert monitor.token != t

    monitor.regenerate_token(False)
    assert monitor.token
