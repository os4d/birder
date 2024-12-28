from typing import Any

import requests
from django import forms
from django.core.validators import MaxValueValidator, MinValueValidator, URLValidator

from ..exceptions import CheckError
from ..widgets import TokenInput
from .base import BaseCheck, ConfigForm


class SeparatedValuesField(forms.Field):
    def __init__(
        self, base_field: type[forms.Field] = forms.IntegerField, separator: str = ",", *args: Any, **kwargs: Any
    ) -> None:
        super().__init__(*args, **kwargs)
        self.base_field = base_field
        self.separator = separator

    def clean(self, data: dict[str, Any]) -> list[int | str]:
        if isinstance(data, str) and self.separator in data:
            self.value_list = data.split(self.separator)
        elif isinstance(data, (list | tuple)):
            self.value_list = data
        else:
            self.value_list = [data]

        base_field = self.base_field()
        return [base_field.clean(value) for value in self.value_list]

    def prepare_value(self, value: list[Any]) -> str:
        if isinstance(value, str):
            return value
        return self.separator.join(map(str, value))


class BaseHttpConfig(ConfigForm):
    url = forms.URLField(validators=[URLValidator()])
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=2)
    status_success = SeparatedValuesField(required=True, initial="200")
    username = forms.CharField(required=False)
    password = forms.CharField(required=False, widget=TokenInput)


class HttpConfig(BaseHttpConfig):
    match = forms.CharField(required=False)


class HttpCheck(BaseCheck):
    icon = "http.svg"
    pragma = ["http", "https"]
    config_class = HttpConfig

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("url"):
            cfg["url"] = cfg.get("address", "")
        return cfg

    @property
    def address(self) -> str:
        return self.config.get("url")

    def check(self, raise_error: bool = False) -> bool:
        try:
            timeout = self.config["timeout"]
            match = self.config["match"]
            res = requests.get(self.config["url"], timeout=timeout)
            if res.status_code not in self.config["status_success"]:
                return False
            return not (match and str(match) not in str(res.content))
        except (forms.ValidationError, requests.exceptions.RequestException) as e:
            if raise_error:
                raise CheckError("HTTP check failed") from e
        return False
