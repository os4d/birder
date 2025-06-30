from unittest.mock import MagicMock, patch

import pytest
from pymongo.errors import ConnectionFailure, OperationFailure, ServerSelectionTimeoutError

from birder.checks.mongodb import MongoDbCheck
from birder.exceptions import CheckError


@pytest.fixture
def mongodb_config():
    return {
        "host": "localhost",
        "port": 27017,
        "username": "testuser",
        "password": "testpass",
        "database": "testdb",
        "connect_timeout": 1,
    }


def test_mongodb_check_success(mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        # Configure the mock instance returned by MongoClient
        mock_mongo_client.return_value.admin = MagicMock()
        mock_mongo_client.return_value.admin.command.return_value = {"ok": 1}

        check = MongoDbCheck(configuration=mongodb_config)
        assert check.check()


def test_mongodb_check_connection_failure(mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        mock_mongo_client.side_effect = ConnectionFailure("Connection failed")
        check = MongoDbCheck(configuration=mongodb_config)
        assert not check.check()


def test_mongodb_check_operation_failure(mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        mock_mongo_client.return_value.admin = MagicMock()
        mock_mongo_client.return_value.admin.command.side_effect = OperationFailure("Auth failed")
        check = MongoDbCheck(configuration=mongodb_config)
        assert not check.check()


def test_mongodb_check_raise_error(mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        mock_mongo_client.side_effect = ServerSelectionTimeoutError("Connection failed")
        check = MongoDbCheck(configuration=mongodb_config)
        with pytest.raises(CheckError):
            check.check(raise_error=True)
