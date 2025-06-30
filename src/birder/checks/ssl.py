import datetime
import socket
import ssl
from typing import Any
from urllib.parse import urlparse

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class SslConfig(ConfigForm):
    url = forms.URLField(
        assume_scheme="https",
        help_text="The URL of the website to check. Must start with https://",
    )
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=5)
    amber_days = forms.IntegerField(
        validators=[MinValueValidator(1)],
        initial=30,
        help_text="Warning threshold in days before expiry.",
    )
    red_days = forms.IntegerField(
        validators=[MinValueValidator(1)],
        initial=10,
        help_text="Critical threshold in days before expiry.",
    )


class SslCheck(BaseCheck):
    """Checks the expiry date of a web server's SSL/TLS certificate."""

    icon = "http.svg"  # Reusing http icon for now
    pragma = ["ssl", "tls"]
    config_class = SslConfig
    address_format: str = "{url}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("url"):
            cfg["url"] = cfg.get("address", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            parsed_url = urlparse(self.config["url"])
            hostname = parsed_url.hostname
            port = parsed_url.port or 443

            if not hostname:
                raise ValueError("Could not determine hostname from URL")

            context = ssl.create_default_context()
            with (
                socket.create_connection((hostname, port), timeout=self.config["timeout"]) as sock,
                context.wrap_socket(sock, server_hostname=hostname) as ssock,
            ):
                cert = ssock.getpeercert()

            if not cert:
                raise ssl.SSLError("Could not retrieve peer certificate.")

            expiry_date_str = cert.get("notAfter")
            if not expiry_date_str:
                raise ssl.SSLError("Certificate does not have a 'notAfter' field.")

            # SSL expiry date format can vary, handle common ones
            try:
                expiry_date = datetime.datetime.strptime(expiry_date_str, "%b %d %H:%M:%S %Y %Z")
            except ValueError:
                expiry_date = datetime.datetime.strptime(expiry_date_str, "%Y%m%d%H%M%SZ")

            now = datetime.datetime.utcnow()
            days_left = (expiry_date - now).days

            self.status = {
                "days_left": days_left,
                "expiry_date": expiry_date.isoformat(),
                "issuer": dict([x[0] for x in cert.get("issuer", ())]),
            }

            if days_left <= self.config["red_days"]:
                self.status["level"] = "critical"
                return False
            if days_left <= self.config["amber_days"]:
                self.status["level"] = "warning"
                return True  # Still a success, but with a warning status
            self.status["level"] = "ok"
            return True

        except (
            TimeoutError,
            ValueError,
            socket.gaierror,
            ssl.SSLError,
            ConnectionRefusedError,
            KeyError,
            TypeError,
        ) as e:
            self.status = {"error": str(e)}
            if raise_error:
                raise CheckError(f"SSL check failed for {self.config['url']}") from e
            return False
