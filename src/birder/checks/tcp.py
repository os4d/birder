import socket
from contextlib import closing

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class TCPConfig(ConfigForm):
    hostname = forms.CharField(required=True, help_text="Hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=7)
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)


class TCPCheck(BaseCheck):
    icon = "tcp.svg"
    pragma = ["tcp"]
    config_class = TCPConfig
    address_format = "{hostname}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
                socket.setdefaulttimeout(self.config["timeout"])  # seconds (float)
                result = sock.connect_ex((self.config["hostname"], self.config["port"]))
                if result != 0:
                    raise CheckError("TCP Server timed out")
                return True
        except (EOFError, TimeoutError, ConnectionRefusedError, CheckError) as e:
            if raise_error:
                raise CheckError("TCP check failed") from e
        return False
