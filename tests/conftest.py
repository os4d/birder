import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING

import pytest
import responses

if TYPE_CHECKING:
    from django_webtest import DjangoTestApp
    from django_webtest.pytest_plugin import MixinWithInstanceVariables

    from birder.models import User, Monitor

here = Path(__file__).parent
sys.path.insert(0, str(here / "../src"))
sys.path.insert(0, str(here / "extras"))


def pytest_configure(config):
    os.environ["DJANGO_SETTINGS_MODULE"] = "birder.config.settings"
    os.environ["SECRET_KEY"] = "super-secret"
    import django
    django.setup()


@pytest.fixture
def app(django_app_factory: "MixinWithInstanceVariables", user: "User") -> "DjangoTestApp":
    django_app = django_app_factory(csrf_checks=False)
    django_app.set_user(user)
    django_app._user = user
    return django_app


@pytest.fixture
def mocked_responses():
    with responses.RequestsMock(assert_all_requests_are_fired=False) as rsps:
        yield rsps


@pytest.fixture
def environment(db):
    from testutils.factories import EnvironmentFactory
    return EnvironmentFactory()


@pytest.fixture
def project(db):
    from testutils.factories import ProjectFactory
    return ProjectFactory()


@pytest.fixture
def monitor(project) -> "Monitor":
    from testutils.factories import MonitorFactory

    return MonitorFactory(project=project)


@pytest.fixture
def user_role(project):
    from testutils.factories import UserRoleFactory

    return UserRoleFactory(project=project)
