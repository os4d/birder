from unittest.mock import Mock

import pexpect.pxssh
import pytest

from birder.checks.ssh import SSHCheck
from birder.exceptions import CheckError


def test_ssh():
    c = SSHCheck(configuration={"server": "localhost", "username": "test"})
    assert c.config == {
        "login_timeout": 2,
        "server": "localhost",
        "password": "",
        "port": 22,
        "username": "test",
    }


def test_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.ssh.pxssh.pxssh", Mock())
    c = SSHCheck(configuration={"server": "localhost", "database": "test"})
    assert c.check()


def test_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.ssh.pxssh.pxssh", Mock(side_effect=pexpect.pxssh.ExceptionPxssh("")))
    c = SSHCheck(configuration={"server": "localhost", "database": "test"})
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
