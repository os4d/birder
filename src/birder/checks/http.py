from urllib.parse import parse_qs, urlparse

import requests
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator, URLValidator
from typing_extensions import Any

from .base import BaseCheck, ConfigForm


class SeparatedValuesField(forms.Field):
    def __init__(
        self, base_field: type[forms.Field] = forms.IntegerField, separator: str = ",", *args: Any, **kwargs: Any
    ) -> None:
        super().__init__(*args, **kwargs)
        self.base_field = base_field
        self.separator = separator

    def clean(self, data: dict[str, Any]) -> dict[str, Any]:
        if not data:
            raise forms.ValidationError("Enter at least one value.")
        if isinstance(data, str):
            self.value_list = data.split(self.separator)
        else:
            self.value_list = data

        if self.base_field is not None:
            base_field = self.base_field()
            data = [base_field.clean(value) for value in self.value_list]
        return data

    def prepare_value(self, value: list[Any]) -> str:
        return self.separator.join(map(str, value))


class HttpConfig(ConfigForm):
    url = forms.URLField(validators=[URLValidator()])
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=10)
    match = forms.CharField(required=False)
    status_success = SeparatedValuesField(required=True, initial=200)


class HttpCheck(BaseCheck):
    icon = "http.png"
    config_class = HttpConfig

    def ready(self) -> None:
        if self.config:
            self.conn = urlparse(self.config["url"])
            self.query = parse_qs(self.conn.query)

    def check(self) -> bool:
        timeout = self.config["timeout"]
        res = requests.get(self.config["url"], timeout=timeout)
        self._assert(res.status_code in self.config["status_success"], f"Invalid status code: {res.status_code}")
        if match := self.config["match"]:
            self._assert(str(match) in str(res.content), "Cannot find %s" % match)
        return True
