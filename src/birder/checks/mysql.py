import pymysql
from django import forms
from django.core.validators import MinValueValidator

from ..exceptions import CheckError
from .base import BaseCheck, ConfigForm


class MySQLConfig(ConfigForm):
    host = forms.CharField(required=True)
    port = forms.IntegerField(validators=[MinValueValidator(1)], initial=3306)
    database = forms.CharField(required=False)
    user = forms.CharField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput)
    connect_timeout = forms.IntegerField(initial=2)


class MySQLCheck(BaseCheck):
    icon = "mysql.svg"
    pragma = ["mysql"]
    config_class = MySQLConfig

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