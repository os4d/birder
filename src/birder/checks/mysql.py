from typing import Any

import pymysql
from django import forms
from django.core.validators import MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm, WriteOnlyField


class MySQLConfig(ConfigForm):
    host = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=3306)
    database = forms.CharField(required=False)
    user = forms.CharField(required=False)
    password = WriteOnlyField(required=False)
    connect_timeout = forms.IntegerField(initial=2)


class MySQLCheck(BaseCheck):
    icon = "mysql.svg"
    pragma = ["mysql"]
    config_class = MySQLConfig
    address_format = "{host}:{port}"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        if not cfg.get("database"):
            cfg["database"] = cfg.get("path", "")
        if not cfg.get("password"):
            cfg["password"] = cfg.get("password", "")
        if not cfg.get("user"):
            cfg["user"] = cfg.get("username", "")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            conn = pymysql.connect(**self.config)
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM DUAL;")
            return True
        except pymysql.err.OperationalError as e:
            if raise_error:
                raise CheckError("MySQL check failed") from e
        return False
