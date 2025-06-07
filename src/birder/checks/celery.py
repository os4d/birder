import asyncio
from typing import Any

import amqp.exceptions
import kombu.exceptions
import redis.exceptions
from celery import Celery as CeleryApp
from celery.app.control import Control
from celery.exceptions import CeleryError
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from flower.utils.broker import Broker

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class CeleryConfig(ConfigForm):
    broker = forms.ChoiceField(choices=[("amqp", "amqp"), ("redis", "redis")])
    hostname = forms.CharField()
    port = forms.IntegerField(required=True)
    extra = forms.CharField(required=False)
    min_workers = forms.IntegerField(
        required=True, validators=[MinValueValidator(1)], help_text="Minimum number of workers", initial=1
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


class CeleryQueueConfig(ConfigForm):
    broker = forms.ChoiceField(choices=[("amqp", "amqp"), ("redis", "redis")])
    hostname = forms.CharField()
    port = forms.IntegerField(required=True)
    extra = forms.CharField(required=False)
    queue_name = forms.CharField(required=True, initial="celery")

    max_queued = forms.IntegerField(
        required=True, validators=[MinValueValidator(1)], initial=1, help_text="Max number of elements pending queue"
    )
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)


class CeleryQueueCheck(BaseCheck):
    icon = "celery.svg"
    pragma = ["celery+queue"]
    config_class = CeleryQueueConfig
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
            broker = Broker("{broker}://{hostname}:{port}/{extra}".format(**self.config))
            queues_result = broker.queues([self.config["queue_name"]])
            res = asyncio.run(queues_result) or [{"messages": 0}]
            length = res[0].get("messages", 0)
            self.status = {"size": length}
            return length > self.config["max_queued"]
        except (
            CeleryError,
            KeyError,
            NotImplementedError,
            redis.exceptions.RedisError,
            kombu.exceptions.KombuError,
            amqp.exceptions.AMQPError,
        ) as e:
            if raise_error:
                raise CheckError("Celery check failed") from e
        return False
