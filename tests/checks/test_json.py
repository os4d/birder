from unittest.mock import Mock

import pytest
import requests

from birder.checks.json import JsonCheck, JsonConfig
from birder.exceptions import CheckError


def test_json_check_success(mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", json={}, status=200)
    c = JsonCheck(Mock(configuration={"url": "http://www.google.com/?a=1", "timeout": 10, "status_success": "200"}))
    assert c.check(True)


def test_json_check_fail(monkeypatch, mocked_responses):
    mocked_responses.add("GET", "http://www.google.com/", json={}, status=404)

    c = JsonCheck(Mock(configuration={"url": "http://www.google.com", "timeout": 2, "status_success": "200"}))
    assert not c.check()

    c = JsonCheck(Mock(configuration={"url": "http://a.b.xx", "timeout": 2, "status_success": "200"}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.http.requests.get", Mock(side_effect=requests.exceptions.ConnectionError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(("match", "result"), [("a==`1`", True), ("--", False)])
def test_json_match(mocked_responses, match, result):
    mocked_responses.add("GET", "http://www.google.com/", json={"a": 1}, status=200)
    c = JsonCheck(configuration={"url": "http://www.google.com/?a=1", "match": match})
    assert c.check() is result


@pytest.mark.parametrize(
    "config",
    [
        {"url": "http://www.google.com", "timeout": "10", "status_success": "200,300"},
        {"url": "http://www.google.com", "timeout": 10, "status_success": [200, 300]},
    ],
)
def test_json_config(config):
    c: JsonConfig = JsonCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 10
    assert c.cleaned_data["status_success"] == [200, 300]
    assert str(c)


def test_json_config_error():
    c: JsonConfig = JsonCheck.config_class({"url": "http://www.google.com", "timeout": 10, "status_success": "200,abc"})
    assert not c.is_valid()
    assert c.errors == {"status_success": ["Enter a whole number."]}
