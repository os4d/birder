from json import JSONDecodeError
from typing import Any

import lxml.etree
import requests
from django import forms
from jmespath.exceptions import LexerError
from lxml.etree import XPathSyntaxError
from lxml.html.soupparser import fromstring

from ..exceptions import CheckError
from . import HttpCheck
from .http import BaseHttpConfig


class XPATHField(forms.CharField):
    def clean(self, value: str) -> str:
        try:
            if value:
                lxml.etree.XPath(value)
        except XPathSyntaxError:
            raise forms.ValidationError("Invalid XPath expression") from None
        return value


class XMLConfig(BaseHttpConfig):
    xpath = XPATHField(required=False)


class XMLCheck(HttpCheck):
    icon = "xml.svg"
    pragma = ["http+xml", "https+xml"]
    config_class = XMLConfig

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("url"):
            cfg["url"] = cfg.get("address", "").replace("+xml://", "://")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            timeout = self.config["timeout"]
            match = self.config["xpath"]
            res = requests.get(self.config["url"], timeout=timeout)
            if res.status_code not in self.config["status_success"]:
                return False
            if match:
                tree = fromstring(res.content)
                if not tree.xpath(self.config["xpath"]):
                    return False
            return True
        except (forms.ValidationError, requests.exceptions.RequestException, JSONDecodeError, LexerError) as e:
            if raise_error:
                raise CheckError("JSON check failed") from e
        return False
