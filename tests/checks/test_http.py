from unittest.mock import Mock
from urllib.parse import ParseResult

import pytest
from django.core.exceptions import ValidationError

from birder.checks.http import HttpCheck, HttpConfig


def test_http():
    c = HttpCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.config
    assert c.conn == ParseResult(scheme="http", netloc="www.google.com", path="/", params="", query="a=1", fragment="")
    assert c.query == {"a": ["1"]}
    assert c.config["status_success"] == [200]


def test_http_check(mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", status=200)
    c = HttpCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.check()
    mocked_responses.add("GET", "http://www.google.com/", status=404)
    assert not c.check()
    c = HttpCheck(Mock(configuration={}))
    assert not c.check()


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


def test_http_config_from_uri():
    uri = "http://username:password@localhost/path/?timeout=4"
    assert HttpCheck.config_from_uri(uri) == {
        "url": "http://localhost/path/",
        "username": "username",
        "password": "password",
        "match": "",
        "status_success": [200],
        "timeout": 4,
    }
    with pytest.raises(ValidationError):
        assert HttpCheck.config_from_uri("http://")
