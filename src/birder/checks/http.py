from typing import Any
from urllib.parse import parse_qs, urlparse

import requests
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator, URLValidator

from .base import BaseCheck, ConfigForm


class SeparatedValuesField(forms.Field):
    def __init__(
        self, base_field: type[forms.Field] = forms.IntegerField, separator: str = ",", *args: Any, **kwargs: Any
    ) -> None:
        super().__init__(*args, **kwargs)
        self.base_field = base_field
        self.separator = separator

    def clean(self, data: dict[str, Any]) -> list[int | str]:
        if not data:
            raise forms.ValidationError("Enter at least one value.")
        if isinstance(data, str):
            self.value_list = data.split(self.separator)
        else:
            self.value_list = data

        base_field = self.base_field()
        return [base_field.clean(value) for value in self.value_list]

    def prepare_value(self, value: list[Any]) -> str:
        return self.separator.join(map(str, value))


class HttpConfig(ConfigForm):
    url = forms.URLField(validators=[URLValidator()])
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=10)
    match = forms.CharField(required=False)
    status_success = SeparatedValuesField(required=True, initial="200")
    username = forms.CharField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput)


class HttpCheck(BaseCheck):
    icon = "http.svg"
    pragma = ["http", "https"]
    config_class = HttpConfig

    @classmethod
    def config_from_uri(cls, uri: str) -> dict[str, Any]:
        cfg = cls.parse_uri(uri)
        cfg["url"] = cfg["address"]
        frm = cls.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        raise forms.ValidationError(frm.errors)

    def ready(self) -> None:
        if self.config:
            self.conn = urlparse(self.config["url"])
            self.query = parse_qs(self.conn.query)

    def check(self) -> bool:
        if self.config:
            timeout = self.config["timeout"]
            match = self.config["match"]
            res = requests.get(self.config["url"], timeout=timeout)
            if res.status_code in self.config["status_success"]:
                return not (match and str(match) not in str(res.content))
        return False
