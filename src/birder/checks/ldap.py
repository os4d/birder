from contextlib import suppress

import ldap
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class LDAPConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Server address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=389)
    protocol_version = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)], initial=3)

    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    username = forms.CharField(required=True)
    password = WriteOnlyField(required=True)


class LDAPCheck(BaseCheck):
    icon = "ldap.svg"
    pragma = ["ldap"]
    config_class = LDAPConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            with suppress(ldap.INVALID_DN_SYNTAX):
                uri = "ldap://{host}:{port}".format(**self.config)
                username, password = self.config.pop("username"), self.config.pop("password")
                conn = ldap.initialize(uri)
                conn.set_option(ldap.OPT_REFERRALS, 0)  # Disable referrals for AD
                conn.protocol_version = self.config["protocol_version"]
                conn.simple_bind_s(username, password)
            return True
        except ldap.SERVER_DOWN as e:
            if raise_error:
                raise CheckError(f"LDAP check failed: {e}") from e
        return False
