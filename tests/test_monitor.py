from monitor.scanner import get_monitor


def test_redis():
    url = "redis://localhost"
    check = get_monitor(url)
    assert check(url)


def test_postgres():
    url = "postgres://localhost"
    check = get_monitor(url)
    assert check(url)


def test_http():
    url = "http://localhost"
    check = get_monitor(url)
    assert check(url)
