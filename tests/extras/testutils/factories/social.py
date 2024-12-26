from uuid import uuid4

import factory
from social_django.models import UserSocialAuth

from .user import UserFactory


class SocialAuthUserFactory(UserFactory):
    @factory.post_generation
    def sso(obj, create, extracted, **kwargs):  # noqa N805
        UserSocialAuth.objects.get_or_create(user=obj, provider="test", uid=uuid4())
