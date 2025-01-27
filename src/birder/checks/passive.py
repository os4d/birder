from functools import cached_property
from typing import Any

from .base import BaseCheck, ConfigForm


class HealthCheckConfig(ConfigForm):
    help_text = """
{% absolute_url "trigger" monitor.pk monitor.token %}
"""

    def is_valid(self) -> bool:
        self.cleaned_data = {}
        return True


class HealthCheck(BaseCheck):
    icon = "socket.svg"
    pragma = []
    config_class = HealthCheckConfig
    address_format = ""
    mode = BaseCheck.REMOTE_INVOCATION
    verbose_name = "Remote HealthCheck"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        return {}

    @cached_property
    def config(self) -> dict[str, Any]:
        return self.config_class.DEFAULTS

    @property
    def address(self) -> str:
        return "-"

    def check(self, raise_error: bool = False) -> bool:
        return True
