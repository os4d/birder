import kombu.exceptions
import redis.exceptions
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from redis import Redis as RedisClient

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class RedisConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Server hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=6379)
    socket_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    socket_connect_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    password = WriteOnlyField(required=False)


class RedisCheck(BaseCheck):
    icon = "redis.svg"
    pragma = ["redis"]
    config_class = RedisConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            client = RedisClient(**self.config)
            client.ping()
            return True
        except (redis.exceptions.ConnectionError, ConnectionRefusedError, kombu.exceptions.KombuError) as e:
            if raise_error:
                raise CheckError("Redis check failed") from e
        return False
