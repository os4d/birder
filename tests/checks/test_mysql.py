from unittest.mock import Mock

import pymysql.err
import pytest

from birder.checks import MySQLCheck
from birder.exceptions import CheckError


def test_mysql():
    c = MySQLCheck(configuration={"host": "localhost", "database": "test"})
    assert c.config == {
        "connect_timeout": 2,
        "database": "test",
        "host": "localhost",
        "password": "",
        "port": 3306,
        "user": "",
    }


def test_mysql_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.mysql.pymysql.connect", Mock())
    c = MySQLCheck(configuration={"host": "localhost", "database": "test"})
    assert c.check()


def test_mysql_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.mysql.pymysql.connect", Mock(side_effect=pymysql.err.OperationalError))
    c = MySQLCheck(configuration={"host": "localhost", "database": "test"})
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
