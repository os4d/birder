from unittest.mock import Mock

import pytest
import requests

from birder.checks.xml import XMLCheck, XMLConfig
from birder.exceptions import CheckError


def test_xml_check_success(mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", json={}, status=200)
    c = XMLCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.check(True)


def test_xml_check_fail(monkeypatch, mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", json={}, status=404)

    c = XMLCheck(Mock(configuration={"url": "http://www.google.com", "timeout": 2, "status_success": "200"}))
    assert not c.check()

    c = XMLCheck(Mock(configuration={"url": "http://a.b.xx", "timeout": 2, "status_success": "200"}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.http.requests.get", Mock(side_effect=requests.exceptions.ConnectionError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(("xpath", "result"), [("//html", True), ("//ccc", False)])
def test_xml_match(mocked_responses, xpath, result):
    mocked_responses.add("GET", "http://www.google.com/", body="<html></html>", status=200)
    c = XMLCheck(configuration={"url": "http://www.google.com/?a=1", "xpath": xpath})
    assert c.check() is result


@pytest.mark.parametrize(
    "config",
    [
        {"url": "http://www.google.com", "timeout": "10", "status_success": "200,300"},
        {"url": "http://www.google.com", "timeout": 10, "status_success": [200, 300]},
    ],
)
def test_xml_config(config):
    c: XMLConfig = XMLCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 10
    assert c.cleaned_data["status_success"] == [200, 300]
    assert str(c)


def test_xml_config_error():
    c: XMLConfig = XMLCheck.config_class({"url": "http://www.google.com", "timeout": 10, "status_success": "200,abc"})
    assert not c.is_valid()
    assert c.errors == {"status_success": ["Enter a whole number."]}
