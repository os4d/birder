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


@pytest.mark.parametrize(
    "config",
    [
        {"connect_timeout": 2, "database": "", "host": "localhost", "port": 3306, "user": "user"},
        {"connect_timeout": 2, "database": "test", "host": "localhost", "port": 3306, "user": "user", "password": ""},
        {"connect_timeout": 2, "database": "test", "host": "localhost", "port": 3306, "user": "", "password": ""},
        {
            "connect_timeout": 2,
            "database": "test",
            "host": "localhost",
            "port": 3306,
            "user": "user",
            "password": "pwd",
        },
    ],
)
def test_mysql_config(config):
    assert MySQLCheck.clean_config(config)
