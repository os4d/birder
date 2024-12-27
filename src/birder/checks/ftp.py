import logging
from ftplib import FTP

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm

logger = logging.getLogger(__name__)


class FtpConfig(ConfigForm):
    host = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=21)
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    user = forms.CharField(required=False)
    passwd = forms.CharField(required=False, widget=forms.PasswordInput)


class FtpCheck(BaseCheck):
    icon = "ftp.svg"
    pragma = ["ftp", "ftps"]
    config_class = FtpConfig

    def check(self, raise_error: bool = False) -> bool:
        try:
            cfg = {**self.config}
            p = cfg.pop("port")

            ftp = FTP(**cfg)  # noqa: S321
            ftp.port = p
            ftp.connect()
            return True
        except (EOFError, ConnectionRefusedError, TimeoutError) as e:
            logger.exception(e)
            if raise_error:
                raise CheckError("FTP check failed") from e
        return False
