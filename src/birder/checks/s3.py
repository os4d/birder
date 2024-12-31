import boto3
from botocore.exceptions import ClientError
from django import forms

from ..exceptions import CheckError
from . import HttpCheck
from .base import ConfigForm, WriteOnlyField


class S3Config(ConfigForm):
    bucket_name = forms.CharField(required=True)
    region_name = forms.CharField(required=True)
    aws_access_key_id = forms.CharField(required=True)
    aws_secret_access_key = WriteOnlyField(required=True)


class S3Check(HttpCheck):
    icon = "s3.svg"
    pragma = ["s3"]
    config_class = S3Config
    address_format: str = "s3://{bucket_name}/"

    def check(self, raise_error: bool = False) -> bool:
        try:
            client = boto3.client(service_name="s3", **self.config)
            client.head_bucket(Bucket="bucket-does-not-exist")
            return True
        except ClientError as e:
            if raise_error:
                raise CheckError("JSON check failed") from e
        return False
