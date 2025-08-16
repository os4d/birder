import datetime
import socket
import ssl

from django import forms
from django.core.validators import MinValueValidator
from django.utils.translation import gettext as _

from . import HttpCheck
from .base import ConfigForm


class SslCertConfig(ConfigForm):
    help_text = "Check the expiration date of an SSL certificate."

    hostname = forms.CharField()
    port = forms.IntegerField(initial=443)
    alert_days = forms.IntegerField(
        initial=7,
        validators=[MinValueValidator(1)],
        help_text=_("Number of days before the expiration date to produce an alert"),
    )


class SslCertCheck(HttpCheck):
    icon = "ssl.svg"
    pragma = ["ssl"]
    config_class = SslCertConfig
    address_format: str = "{host}"

    def check(self, raise_error: bool = False) -> bool:
        context = ssl.create_default_context()
        with (
            socket.create_connection((self.config["hostname"], self.config["port"])) as sock,
            context.wrap_socket(sock, server_hostname=self.config["hostname"]) as ssock,
        ):
            cert = ssock.getpeercert()
            expiry_str = cert["notAfter"]
            expiry_date = datetime.datetime.strptime(expiry_str, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=datetime.UTC)
            delta = expiry_date - datetime.datetime.now(datetime.UTC)
            return delta.days > self.config["alert_days"]
