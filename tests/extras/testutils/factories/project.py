from birder.models import Project

from .base import AutoRegisterModelFactory


class ProjectFactory(AutoRegisterModelFactory):
    class Meta:
        model = Project
