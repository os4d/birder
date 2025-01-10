from unittest.mock import Mock

import pytest
from ldap3 import MOCK_SYNC
from ldap3.core.exceptions import LDAPException

from birder.checks.ldap import LDAPCheck
from birder.exceptions import CheckError


def test_ldap():
    c = LDAPCheck(configuration={"host": "localhost", "port": 389, "user": "username", "password": "password"})
    assert c.config == {
        "host": "localhost",
        "port": 389,
        "version": 3,
        "user": "username",
        "password": "password",
    }


def test_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.ldap.LDAPCheck.client_strategy", MOCK_SYNC)
    c = LDAPCheck(configuration={"host": "localhost", "port": 389, "user": "username", "password": "password"})
    assert c.check()


def test_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.ldap.LDAPCheck.client_strategy", Mock(side_effect=LDAPException("")))
    c = LDAPCheck(configuration={"host": "localhost", "port": 389, "user": "username", "password": "password"})
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
