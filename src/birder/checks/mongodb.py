import logging

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField

logger = logging.getLogger(__name__)


class MongoDbConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="MongoDB host or IP address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=27017)
    username = forms.CharField(required=False)
    password = WriteOnlyField(required=False)
    database = forms.CharField(required=False, help_text="Database name to connect to (optional)")
    connect_timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=5)


class MongoDbCheck(BaseCheck):
    icon = "mongodb.svg"
    pragma = ["mongodb"]
    config_class = MongoDbConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            cfg = {**self.config}
            host = cfg.pop("host")
            port = cfg.pop("port")
            username = cfg.pop("username", None)
            password = cfg.pop("password", None)
            database = cfg.pop("database", None)
            connect_timeout = cfg.pop("connect_timeout")

            client = MongoClient(
                host=host,
                port=port,
                username=username,
                password=password,
                authSource=database if database else "admin",
                serverSelectionTimeoutMS=connect_timeout * 1000,
            )
            # The ping command is cheap and does not require auth.
            client.admin.command("ping")
            return True
        except (ConnectionFailure, OperationFailure) as e:
            logger.exception("MongoDB check failed", exc_info=e)
            if raise_error:
                raise CheckError(f"MongoDB check failed: {e}") from e
        return False
