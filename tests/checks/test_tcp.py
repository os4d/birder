from unittest.mock import Mock

import pytest
import requests

from birder.checks.tcp import TCPCheck, TCPConfig
from birder.exceptions import CheckError


def test_tcp_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.tcp.socket.socket.connect_ex", Mock(return_value=0))
    c = TCPCheck(Mock(configuration={"hostname": "localhost", "timeout": 2, "port": 8000}))
    assert c.check(True)


def test_tcp_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.tcp.socket.socket", Mock())

    c = TCPCheck(Mock(configuration={"hostname": "localhost", "timeout": 2, "port": 8000}))
    assert not c.check()

    c = TCPCheck(Mock(configuration={"hostname": "http://a.b.xx", "timeout": 2, "port": 8000}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.tcp.socket.socket", Mock(side_effect=ConnectionRefusedError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(
    "config",
    [
        {"hostname": "localhost", "timeout": "5", "port": 8000},
        {"hostname": "localhost", "timeout": 5, "port": 8000},
    ],
)
def test_tcp_config(config):
    c: TCPConfig = TCPCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 5
    assert str(c)


def test_tcp_config_error():
    c: TCPConfig = TCPCheck.config_class({"hostname": "localhost", "timeout": "-", "port": 8000})
    assert not c.is_valid()
    assert c.errors == {"timeout": ["Enter a whole number."]}
