from birder.models import Environment, Project

from .base import AutoRegisterModelFactory


class ProjectFactory(AutoRegisterModelFactory):
    class Meta:
        model = Project


class EnvironmentFactory(AutoRegisterModelFactory):
    class Meta:
        model = Environment
