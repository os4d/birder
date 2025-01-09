from typing import Any

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from kombu import Connection as KombuConnection
from kombu.exceptions import OperationalError

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class AmqpConfig(ConfigForm):
    hostname = forms.CharField(required=True, help_text="AMQP Server hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=5672)
    ssl = forms.BooleanField(required=False, initial=False)
    connect_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    userid = forms.CharField(required=False)
    password = WriteOnlyField(required=False)


class AmqpCheck(BaseCheck):
    icon = "rabbitmq.svg"
    pragma = ["rabbitmq", "amqp", "rabbit"]
    config_class = AmqpConfig
    address_format = "{hostname}:{port}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("hostname", ""):
            cfg["hostname"] = cfg.get("host", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            conn = KombuConnection(**self.config)
            conn.ensure_connection(max_retries=1)
            return True
        except OperationalError as e:
            if raise_error:
                raise CheckError("AMQP check failed") from e
        return False


RabbitCheck = RabbitMQCheck = KombuCheck = AmqpCheck
