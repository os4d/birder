import factory

from birder.models import UserRole

from .base import AutoRegisterModelFactory
from .django_auth import GroupFactory
from .project import ProjectFactory
from .user import UserFactory


class UserRoleFactory(AutoRegisterModelFactory):
    user = factory.SubFactory(UserFactory)
    project = factory.SubFactory(ProjectFactory)
    role = factory.SubFactory(GroupFactory)

    class Meta:
        model = UserRole
