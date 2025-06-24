import asyncio
import logging
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

logger = logging.getLogger(__name__)


class CeleryConfig(ConfigForm):
    broker = forms.ChoiceField(choices=[("amqp", "amqp"), ("redis", "redis")])
    hostname = forms.CharField()
    port = forms.IntegerField(required=True)
    extra = forms.CharField(required=False, help_text="Extra information. Es. database number")
    min_workers = forms.IntegerField(
        required=True, validators=[MinValueValidator(1)], help_text="Minimum number of workers", initial=1
    )
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)


class CeleryBaseCheck(BaseCheck):
    def check(self, raise_error: bool = False) -> bool:
        try:
            return self._check(raise_error)
        except (
            CeleryError,
            ConnectionError,
            KeyError,
            amqp.exceptions.AMQPError,
            kombu.exceptions.KombuError,
            kombu.exceptions.OperationalError,
            redis.exceptions.RedisError,
        ) as e:
            logger.exception(e)
            if raise_error:
                raise CheckError("Celery check failed") from e
        return False


class CeleryCheck(CeleryBaseCheck):
    icon = "celery.svg"
    pragma = ["celery"]
    config_class = CeleryConfig
    address_format = "{broker}://{hostname}:{port}/{extra}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("hostname"):
            cfg["hostname"] = cfg.get("host", "")
        return cfg

    def _check(self, raise_error: bool = False) -> bool:
        broker = "{broker}://{hostname}:{port}/{extra}".format(**self.config)
        app = CeleryApp("birder", loglevel="info", broker=broker)
        ctrl = Control(app)
        workers = len(ctrl.ping())
        self.status = {"workers": workers}
        return workers > self.config["min_workers"]


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


class CeleryQueueCheck(CeleryBaseCheck):
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

    def _check(self, raise_error: bool = False) -> bool:
        broker = Broker("{broker}://{hostname}:{port}/{extra}".format(**self.config))
        queues_result = broker.queues([self.config["queue_name"]])
        res = asyncio.run(queues_result) or [{"messages": 0}]
        length = res[0].get("messages", 0)
        self.status = {"size": length}
        return length > self.config["max_queued"]
