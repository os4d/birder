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


@patch("birder.checks.mongodb.logger")
def test_mongodb_check_connection_failure(mock_logger, mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        conn_failure = ConnectionFailure("Connection failed")
        mock_mongo_client.side_effect = conn_failure
        check = MongoDbCheck(configuration=mongodb_config)
        assert not check.check()
        mock_logger.exception.assert_called_once_with("MongoDB check failed", exc_info=conn_failure)


@patch("birder.checks.mongodb.logger")
def test_mongodb_check_operation_failure(mock_logger, mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        mock_mongo_client.return_value.admin = MagicMock()
        op_failure = OperationFailure("Auth failed")
        mock_mongo_client.return_value.admin.command.side_effect = op_failure
        check = MongoDbCheck(configuration=mongodb_config)
        assert not check.check()
        mock_logger.exception.assert_called_once_with("MongoDB check failed", exc_info=op_failure)


@patch("birder.checks.mongodb.logger")
def test_mongodb_check_raise_error(mock_logger, mongodb_config):
    with patch("birder.checks.mongodb.MongoClient", autospec=True) as mock_mongo_client:
        timeout_error = ServerSelectionTimeoutError("Connection failed")
        mock_mongo_client.side_effect = timeout_error
        check = MongoDbCheck(configuration=mongodb_config)
        with pytest.raises(CheckError):
            check.check(raise_error=True)
        mock_logger.exception.assert_called_once_with("MongoDB check failed", exc_info=timeout_error)
