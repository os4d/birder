from unittest.mock import Mock

import pytest
import requests

from birder.checks.ftp import FtpCheck, FtpConfig
from birder.exceptions import CheckError


def test_ftp():
    c = FtpCheck(Mock(configuration={"host": "localhost"}))
    assert c.config


def test_ftp_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.ftp.FTP", Mock())
    c = FtpCheck(Mock(configuration={"host": "localhost", "user": "one", "passwd": "1234"}))
    assert c.check()


def test_ftp_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.ftp.FTP", Mock(side_effect=EOFError))

    c = FtpCheck(Mock(configuration={"host": "a.b.xxx", "timeout": 2}))
    assert not c.check()

    monkeypatch.setattr("birder.checks.http.requests.get", Mock(side_effect=requests.exceptions.ConnectionError))
    with pytest.raises(CheckError):
        c.check(True)


@pytest.mark.parametrize(
    "config",
    [
        {"host": "www.google.com", "timeout": "2", "port": 21},
        {"host": "www.google.com", "timeout": 2, "port": 21},
    ],
)
def test_ftp_config(config):
    c: FtpConfig = FtpCheck.config_class(config)
    assert c.is_valid(), c.errors
    assert c.cleaned_data["timeout"] == 2
    assert str(c)


def test_ftp_config_error():
    c: FtpConfig = FtpCheck.config_class({"host": "", "timeout": 2, "port": 21})
    assert not c.is_valid()
    assert c.errors == {"host": ["This field is required."]}
