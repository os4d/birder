import redis.exceptions
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from redis import Redis as RedisClient

from .base import BaseCheck, ConfigForm


class RedisConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Redis Server hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=6379)
    socket_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=5)
    socket_connect_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=5)
    password = forms.CharField(required=False, widget=forms.PasswordInput)


class RedisCheck(BaseCheck):
    icon = "redis.svg"
    pragma = ["redis"]
    config_class = RedisConfig

    def check(self) -> bool:
        try:
            client = RedisClient(**self.config)
            client.ping()
            return True
        except redis.exceptions.ConnectionError:
            return False
