import logging
from ftplib import FTP
from typing import Any

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField

logger = logging.getLogger(__name__)


class FtpConfig(ConfigForm):
    host = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=21)
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    user = forms.CharField(required=False)
    passwd = WriteOnlyField(required=False)


class FtpCheck(BaseCheck):
    icon = "ftp.svg"
    pragma = ["ftp", "ftps"]
    config_class = FtpConfig
    address_format = "{host}:{port}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("user"):
            cfg["user"] = cfg.get("username", "")
        if not cfg.get("passwd"):
            cfg["passwd"] = cfg.get("password", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            cfg = {**self.config}
            p = cfg.pop("port")

            ftp = FTP(**cfg)  # noqa: S321
            ftp.port = p
            ftp.connect()
            return True
        except (EOFError, TimeoutError, ConnectionRefusedError) as e:
            if raise_error:
                raise CheckError("FTP check failed") from e
        return False
