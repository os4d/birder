import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING

import pytest
import responses

try:
    from django.utils.deprecation import RemovedInDjango60Warning
except ImportError:
    RemovedInDjango60Warning = FutureWarning

if TYPE_CHECKING:
    from django_webtest import DjangoTestApp
    from django_webtest.pytest_plugin import MixinWithInstanceVariables

    from birder.models import Monitor, User

here = Path(__file__).parent
sys.path.insert(0, str(here / "../src"))
sys.path.insert(0, str(here / "extras"))


def pytest_configure(config):
    import warnings

    warnings.filterwarnings("ignore", category=DeprecationWarning, module="pyasn1.codec.ber.encoder")
    warnings.filterwarnings("ignore", category=UserWarning, module="pytest_celery.vendors.worker")
    warnings.filterwarnings("ignore", category=RemovedInDjango60Warning, module="django.db.models")

    os.environ["DJANGO_SETTINGS_MODULE"] = "birder.config.settings"
    os.environ["SECRET_KEY"] = "super-secret"
    os.environ["STATIC_URL"] = "static/"
    os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
    import django

    django.setup()


@pytest.fixture
def configure() -> None:
    from constance import config as constance_config

    constance_config.CACHE_PREFIX = "tests"


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

    return EnvironmentFactory(name="development")


@pytest.fixture
def project(environment):
    from testutils.factories import EnvironmentFactory, ProjectFactory

    env1 = EnvironmentFactory(name="development")
    env2 = EnvironmentFactory(name="production")
    return ProjectFactory(environments=[env1, env2], default_environment=env1)


@pytest.fixture
def monitor(project) -> "Monitor":
    from testutils.factories import MonitorFactory

    return MonitorFactory(project=project, environment=project.default_environment)


@pytest.fixture
def deadline(project) -> "Monitor":
    from testutils.factories import DeadlineFactory

    return DeadlineFactory()


@pytest.fixture
def user_role(project):
    from testutils.factories import UserRoleFactory

    return UserRoleFactory(project=project)


@pytest.fixture
def passive_monitor(project) -> "Monitor":
    from testutils.factories import MonitorFactory

    from birder.checks import HealthCheck

    return MonitorFactory(project=project, strategy=HealthCheck)


@pytest.fixture(scope="session", autouse=True)
async def close_channels_redis_connections():
    yield
    from channels.layers import channel_layers

    if channel_layers:
        for channel_layer in channel_layers.all():
            if hasattr(channel_layer, "close_pools"):
                await channel_layer.close_pools()
