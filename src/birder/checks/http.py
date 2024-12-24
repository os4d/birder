from urllib.parse import urlparse, parse_qs

import requests
from django.core.validators import URLValidator, MinValueValidator, MaxValueValidator
from django import forms

from .base import BaseCheck, ConfigForm


class Config(ConfigForm):
    DEFAULTS = {"timeout": 10}
    url = forms.URLField(validators=[URLValidator()])
    timeout = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], initial=10)
    match = forms.CharField(required=False)


class HttpCheck(BaseCheck):
    icon = "http.png"
    status_success = [200]
    config_class = Config

    def ready(self)->None:
        self.conn = urlparse(self.config["url"])
        self.query = parse_qs(self.conn.query)

    def check(self) -> bool:
        timeout = self.config["timeout"]
        res = requests.get(self.config["url"], timeout=timeout)
        self._assert(res.status_code in self.status_success, f"Invalid status code: {res.status_code}")
        if self.match:
            self._assert(str(self.match) in str(res.content), "Cannot find %s" % self.match)
        return True
