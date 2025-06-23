import logging

from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from elastic_transport import ApiError, TransportError
from elasticsearch import Elasticsearch
from urllib3.exceptions import HTTPError

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField

logger = logging.getLogger(__name__)


class ValidateEsHost:
    def __call__(self, value: str) -> bool:
        entries = value.split(",")
        errs = []
        for entry in entries:
            try:
                URLValidator(["http", "https"])(entry)
            except ValidationError as err:
                errs.append(err)
        if errs:
            raise ValidationError(errs)
        return True


class ElasticSearchConfig(ConfigForm):
    hosts = forms.CharField(
        required=True, help_text="Servers list as host1:port1, host2:port2", validators=[ValidateEsHost()]
    )
    api_key = WriteOnlyField(required=False)


class ElasticSearchCheck(BaseCheck):
    icon = "elasticsearch.svg"
    pragma = ["es"]
    config_class = ElasticSearchConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            cfg = {**self.config}
            hosts = cfg.pop("hosts").split(",")
            client = Elasticsearch(hosts=hosts, **cfg)
            health = client.cat.health(format="json")
            return health[0]["status"] == "green"
        except (TransportError, ApiError, HTTPError, ConnectionResetError, TypeError, KeyError) as e:
            logger.exception("ElasticSearch status check failed", exc_info=e)
            if raise_error:
                raise CheckError(f"ElasticSearch check failed: {e}") from e
        return False
