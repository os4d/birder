from smtplib import SMTP, SMTPException

from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class SMTPConfig(ConfigForm):
    host = forms.CharField(required=True, help_text="Server hostname or IP Address")
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=587)
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], initial=2)
    username = forms.CharField(required=False)
    password = WriteOnlyField(required=False)


class SMTPCheck(BaseCheck):
    icon = "smtp.svg"
    pragma = ["smtp"]
    config_class = SMTPConfig
    address_format = "{host}:{port}"

    def check(self, raise_error: bool = False) -> bool:
        try:
            config = {**self.config}
            username, password = config.pop("username"), config.pop("password")
            server = SMTP(**config)
            server.starttls()
            if username and password:
                server.login(username, password)
            server.quit()
            return True
        except (ConnectionRefusedError, SMTPException) as e:
            if raise_error:
                raise CheckError("SMTP check failed") from e
        return False
