from typing import Any

import factory
from django.contrib.auth.models import Group, Permission

from .base import AutoRegisterModelFactory
from .contenttypes import ContentTypeFactory


class PermissionFactory(AutoRegisterModelFactory):
    content_type = factory.SubFactory(ContentTypeFactory)

    class Meta:
        model = Permission


class GroupFactory(AutoRegisterModelFactory):
    name = factory.Sequence(lambda n: "group %s" % n)

    class Meta:
        model = Group
        django_get_or_create = ("name",)

    @classmethod
    def _after_postgeneration(cls, instance: "Group", create: bool, results: Any = None):
        instance.save()

    @factory.post_generation
    def permissions(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for perm in extracted:
                self.permissions.add(perm)
