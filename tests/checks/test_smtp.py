from unittest.mock import Mock

import pytest

from birder.checks.smtp import SMTPCheck
from birder.exceptions import CheckError


def test_smtp():
    c = SMTPCheck(configuration={"host": "localhost", "port": 587, "username": "username", "password": "password"})
    assert c.config == {
        "host": "localhost",
        "port": 587,
        "timeout": 2,
        "username": "username",
        "password": "password",
    }


def test_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.smtp.SMTP", Mock())
    c = SMTPCheck(configuration={"host": "localhost", "port": 389})
    assert c.check()
    c = SMTPCheck(configuration={"host": "localhost", "port": 389, "username": "username", "password": "password"})
    assert c.check()


def test_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.smtp.SMTP.starttls", Mock(side_effect=ConnectionRefusedError("")))
    c = SMTPCheck(configuration={"host": "localhost", "port": 389, "username": "username", "password": "password"})
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
