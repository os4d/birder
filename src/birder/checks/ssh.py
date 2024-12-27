from typing import Any

from django import forms
from django.core.validators import MinValueValidator
from pexpect import pxssh

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class SSHConfig(ConfigForm):
    server = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=22)
    username = forms.CharField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput)
    login_timeout = forms.IntegerField(initial=2)


class SSHCheck(BaseCheck):
    icon = "ssh.svg"
    pragma = ["ssh"]
    config_class = SSHConfig

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        cfg["server"] = cfg.get("host", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            s = pxssh.pxssh()
            return s.login(**self.config)
        except pxssh.ExceptionPexpect as e:
            if raise_error:
                raise CheckError("Postgres check failed") from e
        return False
