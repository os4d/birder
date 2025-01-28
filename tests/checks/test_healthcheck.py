from unittest.mock import Mock

from birder.checks.passive import HealthCheck, HealthCheckConfig


def test_healthcheck():
    c = HealthCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.config == {}


def test_healthcheck_check_success(mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", status=200)
    c = HealthCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.check()


def test_healthcheck_config_error():
    c: HealthCheckConfig = HealthCheck.config_class(
        {"url": "http://www.google.com", "timeout": 10, "status_success": "200,abc"}
    )
    assert c.is_valid()
