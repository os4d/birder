import boto3
from django import forms

from ..exceptions import CheckError
from . import HttpCheck
from .base import ConfigForm, WriteOnlyField


class S3Config(ConfigForm):
    endpoint_url = forms.CharField(required=True)
    bucket_name = forms.CharField(required=True)
    region_name = forms.CharField(required=False)
    aws_access_key_id = forms.CharField(required=True)
    aws_secret_access_key = WriteOnlyField(required=True)
    aws_session_token = WriteOnlyField(required=False)


class S3Check(HttpCheck):
    icon = "s3.svg"
    pragma = ["s3"]
    config_class = S3Config
    address_format: str = "s3://{bucket_name}/"

    def check(self, raise_error: bool = False) -> bool:
        try:
            cfg = {**self.config}
            bucket_name = cfg.pop("bucket_name")
            s3 = boto3.resource("s3", **cfg, config=boto3.session.Config(signature_version="s3v4"), verify=False)
            s3.Bucket(bucket_name).check()
            return True
        except ValueError as e:
            if raise_error:
                raise CheckError("JSON check failed") from e
        return False
