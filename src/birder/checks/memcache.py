from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from pymemcache.client.base import Client as MemCacheClient

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class MemCacheConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Server hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=11211)
    connect_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)


class MemCacheCheck(BaseCheck):
    icon = "memcache.svg"
    pragma = ["memcache"]
    config_class = MemCacheConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            base = {**self.config}
            host, port = base.pop("host"), base.pop("port")
            cfg = {"server": (host, port), **base}
            client = MemCacheClient(**cfg)
            client._connect()
            return True
        except ConnectionError as e:
            if raise_error:
                raise CheckError("Redis check failed") from e
        return False
