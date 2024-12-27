from unittest.mock import Mock

import psycopg2
import pytest

from birder.checks import PostgresCheck
from birder.exceptions import CheckError


def test_pg():
    c = PostgresCheck(configuration={"host": "localhost", "database": "test"})
    assert c.config == {
        "connect_timeout": 2,
        "database": "test",
        "host": "localhost",
        "password": "",
        "port": 5432,
        "user": "",
    }


def test_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.pg.psycopg2.connect", Mock())
    c = PostgresCheck(configuration={"host": "localhost", "database": "test"})
    assert c.check()


def test_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.pg.psycopg2.connect", Mock(side_effect=psycopg2.OperationalError))
    c = PostgresCheck(configuration={"host": "localhost", "database": "test"})
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
