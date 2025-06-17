from typing import TYPE_CHECKING

import pytest
from django.urls import reverse
from pytest_django.fixtures import SettingsWrapper

from birder.models import Environment

if TYPE_CHECKING:
    from django_webtest import DjangoTestApp
    from django_webtest.pytest_plugin import MixinWithInstanceVariables
    from responses import RequestsMock

pytestmark = [pytest.mark.admin, pytest.mark.smoke, pytest.mark.django_db]


@pytest.fixture
def app(
    django_app_factory: "MixinWithInstanceVariables",
    mocked_responses: "RequestsMock",
    settings: SettingsWrapper,
) -> "DjangoTestApp":
    from testutils.factories import SuperUserFactory

    django_app = django_app_factory(csrf_checks=False)
    admin_user = SuperUserFactory(username="superuser")
    django_app.set_user(admin_user)
    django_app._user = admin_user
    return django_app


def test_project_create(app: "DjangoTestApp", environment: Environment) -> None:
    url = reverse("admin:birder_project_add")
    res = app.get(url)
    res.forms["project_form"]["name"] = "Test Project"
    res.forms["project_form"]["environments"] = [environment.pk]
    res.forms["project_form"]["default_environment"] = environment.pk
    res = res.forms["project_form"].submit()

    assert res.status_code == 302, res.showbrowser()
