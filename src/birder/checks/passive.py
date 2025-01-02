from typing import Any

from .base import BaseCheck, ConfigForm


class HealthCheckConfig(ConfigForm):
    help_text = """
{% absolute_url "trigger" monitor.pk monitor.token %}
"""


class HealthCheck(BaseCheck):
    icon = "socket.svg"
    pragma = ["rabbitmq", "amqp", "rabbit"]
    config_class = HealthCheckConfig
    address_format = ""
    mode = BaseCheck.MODE_PASSIVE
    verbose_name = "Remote HealthCheck"

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        return cfg

    @property
    def address(self) -> str:
        return "-"

    def check(self, raise_error: bool = False) -> bool:
        return True
