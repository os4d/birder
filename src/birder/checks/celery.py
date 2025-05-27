from typing import Any

import amqp.exceptions
import kombu.exceptions
import redis.exceptions
from celery import Celery as CeleryApp
from celery.app.control import Control
from celery.exceptions import CeleryError
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class CeleryConfig(ConfigForm):
    broker = forms.ChoiceField(choices=[("amqp", "amqp"), ("redis", "redis")])
    hostname = forms.CharField()
    port = forms.IntegerField(required=True)
    extra = forms.CharField(required=False)
    min_workers = forms.IntegerField(
        required=True, validators=[MinValueValidator(1)], help_text="Minimum number of workers"
    )
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)


class CeleryCheck(BaseCheck):
    icon = "celery.svg"
    pragma = ["celery"]
    config_class = CeleryConfig
    address_format = "{broker}://{hostname}:{port}/{extra}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("hostname"):
            cfg["hostname"] = cfg.get("host", "")
        if not cfg.get("min_workers"):
            cfg["min_workers"] = 1
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            broker = "{broker}://{hostname}:{port}/{extra}".format(**self.config)
            app = CeleryApp("birder", loglevel="info", broker=broker)
            ctrl = Control(app)
            workers = len(ctrl.ping())
            self.status = {"workers": workers}
            return workers > self.config["min_workers"]
        except (
            CeleryError,
            KeyError,
            redis.exceptions.RedisError,
            kombu.exceptions.KombuError,
            amqp.exceptions.AMQPError,
        ) as e:
            if raise_error:
                raise CheckError("Celery check failed") from e
        return False
