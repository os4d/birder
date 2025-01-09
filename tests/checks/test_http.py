from unittest.mock import Mock

import pytest
import requests

from birder.checks.http import HttpCheck, HttpConfig
from birder.exceptions import CheckError


def test_http():
    c = HttpCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.config
    assert c.config["status_success"] == [200]
    c = HttpCheck(Mock(configuration={}))
    assert c.config == c.config_class.DEFAULTS


def test_http_check_success(mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", status=200)
    c = HttpCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.check()


def test_http_check_fail(monkeypatch, mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", status=404)

    c = HttpCheck(Mock(configuration={"url": "http://www.google.com", "timeout": 10, "status_success": "200"}))
    assert not c.check()

    c = HttpCheck(Mock(configuration={"url": "http://a.b.xx", "timeout": 10, "status_success": "200"}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.http.requests.get", Mock(side_effect=requests.exceptions.ConnectionError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(("match", "result"), [("test", True), ("--", False)])
def test_http_match(mocked_responses, match, result):
    mocked_responses.add("GET", "http://www.google.com/", body="test", status=200)
    c = HttpCheck(
        Mock(
            configuration={"url": "http://www.google.com/?a=1", "match": match, "timeout": 10, "status_success": "200"}
        )
    )
    assert c.check() is result


@pytest.mark.parametrize(
    "config",
    [
        {"url": "http://www.google.com", "timeout": "10", "status_success": "200,300"},
        {"url": "http://www.google.com", "timeout": 10, "status_success": [200, 300]},
    ],
)
def test_http_config(config):
    c: HttpConfig = HttpCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 10
    assert c.cleaned_data["status_success"] == [200, 300]
    assert str(c)


def test_http_config_error():
    c: HttpConfig = HttpCheck.config_class({"url": "http://www.google.com", "timeout": 10, "status_success": "200,abc"})
    assert not c.is_valid()
    assert c.errors == {"status_success": ["Enter a whole number."]}
