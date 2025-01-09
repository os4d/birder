import factory.fuzzy

from birder.models import LogCheck

from .base import AutoRegisterModelFactory
from .monitor import MonitorFactory


class LogCheckFactory(AutoRegisterModelFactory):
    monitor = factory.SubFactory(MonitorFactory)

    class Meta:
        model = LogCheck
