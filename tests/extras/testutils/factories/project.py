import factory

from birder.models import Environment, Project

from .base import AutoRegisterModelFactory


class ProjectFactory(AutoRegisterModelFactory):
    class Meta:
        model = Project

    @factory.post_generation
    def environments(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for environment in extracted:
                self.environments.add(environment)


class EnvironmentFactory(AutoRegisterModelFactory):
    class Meta:
        model = Environment
        django_get_or_create = ["name"]
