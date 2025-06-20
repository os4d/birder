from typing import Any

import factory

from birder.models import Environment, Project

from .base import AutoRegisterModelFactory


class ProjectFactory(AutoRegisterModelFactory):
    name = factory.Sequence(lambda n: f"Project-{n}")

    class Meta:
        model = Project

    @classmethod
    def _after_postgeneration(cls, instance: "Project", create: bool, results: Any = None):
        instance.save()

    @factory.post_generation
    def environments(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for environment in extracted:
                self.environments.add(environment)


class EnvironmentFactory(AutoRegisterModelFactory):
    name = factory.Sequence(lambda n: f"Environment-{n}")

    class Meta:
        model = Environment
        django_get_or_create = ["name"]
