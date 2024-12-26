from typing import TYPE_CHECKING, Any

import factory.fuzzy
from factory.django import DjangoModelFactory

from birder.models import User

if TYPE_CHECKING:
    from django.db.models import Model


class UserFactory(DjangoModelFactory):
    username = factory.Sequence(lambda n: f"name-{n}@example.com")
    email = factory.Sequence(lambda n: f"name-{n}@example.com")
    password = "password"  # noqa

    class Meta:
        model = User

    @classmethod
    def _create(cls, model_class: "Model", *args: Any, **kwargs: Any) -> "User":
        """Create an instance of the model, and save it to the database."""
        if cls._meta.django_get_or_create:
            return cls._get_or_create(model_class, *args, **kwargs)

        manager = cls._get_manager(model_class)
        return manager.create_user(*args, **kwargs)  # Just user the create_user method recommended by Django


class SuperUserFactory(UserFactory):
    username = factory.Sequence(lambda n: "superuser%03d@example.com" % n)
    email = factory.Sequence(lambda n: "superuser%03d@example.com" % n)
    is_superuser = True
    is_staff = True
    is_active = True
