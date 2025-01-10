from typing import Any

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator
from ldap3 import SYNC, Connection, Server
from ldap3.core.exceptions import LDAPException

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class LDAPConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Server address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=389)
    version = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)], initial=3)

    user = forms.CharField(required=True)
    password = WriteOnlyField(required=True)


class LDAPCheck(BaseCheck):
    icon = "ldap.svg"
    pragma = ["ldap"]
    config_class = LDAPConfig
    address_format = "{host}:{port}"
    client_strategy = SYNC

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("password"):
            cfg["password"] = cfg.get("password", "")
        if not cfg.get("user"):
            cfg["user"] = cfg.get("username", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            config = {**self.config}
            host, port = config.pop("host"), config.pop("port")
            uri = f"ldap://{host}:{port}"
            server = Server(uri)
            cfg = {**config, "client_strategy": self.client_strategy}
            conn = Connection(server, **cfg)
            conn.bind()
            return True
        except LDAPException as e:
            if raise_error:
                raise CheckError(f"LDAP check failed: {e}") from e
        return False
