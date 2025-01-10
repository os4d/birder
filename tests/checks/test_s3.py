from unittest.mock import MagicMock, Mock

import pytest
from botocore.exceptions import ClientError

from birder.checks.s3 import S3Check
from birder.exceptions import CheckError


def test_s3():
    c = S3Check(
        configuration={
            "bucket_name": "bucket1",
            "region_name": "us",
            "aws_access_key_id": "key1",
            "aws_secret_access_key": "secret1",
        }
    )
    assert c.config == {
        "bucket_name": "bucket1",
        "region_name": "us",
        "aws_access_key_id": "key1",
        "aws_secret_access_key": "secret1",
    }


def test_check_success(monkeypatch):
    monkeypatch.setattr("birder.checks.s3.boto3.client", Mock())
    c = S3Check(
        configuration={
            "bucket_name": "bucket1",
            "region_name": "us",
            "aws_access_key_id": "key1",
            "aws_secret_access_key": "secret1",
        }
    )
    assert c.check()


def test_check_fail(monkeypatch):
    monkeypatch.setattr("birder.checks.s3.boto3.client", Mock(side_effect=ClientError(MagicMock(), "")))
    c = S3Check(
        configuration={
            "bucket_name": "bucket1",
            "region_name": "us",
            "aws_access_key_id": "key1",
            "aws_secret_access_key": "secret1",
        }
    )
    assert not c.check()
    with pytest.raises(CheckError):
        assert c.check(True)
