from unittest.mock import Mock

from birder.checks import HealthCheck


def test_healthcheck():
    c = HealthCheck(Mock(configuration={"whatever": "localhost"}))
    assert c.clean_config({}) == {}


def test_healthcheck_address():
    c = HealthCheck(Mock(configuration={"whatever": "localhost"}))
    assert c.address == "-"
