from json import JSONDecodeError
from typing import Any

import jmespath
import requests
from django import forms
from jmespath.exceptions import LexerError

from ..exceptions import CheckError
from . import HttpCheck
from .http import BaseHttpConfig


class JsonConfig(BaseHttpConfig):
    match = forms.CharField(required=False)


class JsonCheck(HttpCheck):
    icon = "json.svg"
    pragma = ["http+json", "https+json"]
    config_class = JsonConfig

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("url"):
            cfg["url"] = cfg.get("address", "").replace("+json://", "://")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            timeout = self.config["timeout"]
            match = self.config["match"]
            res = requests.get(self.config["url"], timeout=timeout)
            if res.status_code not in self.config["status_success"]:
                return False
            data = res.json()
            if match:
                return jmespath.search(match, data)
            return True
        except (forms.ValidationError, requests.exceptions.RequestException, JSONDecodeError, LexerError) as e:
            if raise_error:
                raise CheckError("JSON check failed") from e
        return False
