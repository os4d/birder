from typing import Any

import psycopg2
from django import forms
from django.core.validators import MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class PostgresConfig(ConfigForm):
    host = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=5432)
    database = forms.CharField(required=False)
    user = forms.CharField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput)
    connect_timeout = forms.IntegerField(initial=2)


class PostgresCheck(BaseCheck):
    icon = "postgres.svg"
    pragma = ["postgres", "postgis"]
    config_class = PostgresConfig

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        cfg["database"] = cfg.get("path")
        return cfg

    def check(self, raise_error: bool = False) -> bool:
        try:
            conn = psycopg2.connect(**self.config)
            cursor = conn.cursor()
            cursor.execute("SELECT 1;")
            return True
        except psycopg2.OperationalError as e:
            if raise_error:
                raise CheckError("Postgres check failed") from e
        return False
