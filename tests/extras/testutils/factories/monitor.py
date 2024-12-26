import factory.fuzzy
from strategy_field.utils import fqn

from birder.checks import HttpCheck
from birder.models import Monitor

from .base import AutoRegisterModelFactory
from .project import ProjectFactory


class MonitorFactory(AutoRegisterModelFactory):
    project = factory.SubFactory(ProjectFactory)
    strategy = fqn(HttpCheck)
    configuration = {"timeout": 10, "url": "https://example.com", "match": "", "status_success": [200]}

    class Meta:
        model = Monitor
