from typing import TYPE_CHECKING

import pytest
from django.urls import reverse
from pytest_django.fixtures import SettingsWrapper

from birder.models import Monitor

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

    settings.FLAGS = {"OLD_STYLE_UI": [("boolean", True)]}
    django_app = django_app_factory(csrf_checks=False)
    admin_user = SuperUserFactory(username="superuser")
    django_app.set_user(admin_user)
    django_app._user = admin_user
    return django_app


def test_monitor_check(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])

    mocked_responses.add("GET", monitor.strategy.config["url"], status=500)
    res = app.get(url)
    res.click("Check")

    mocked_responses.add("GET", monitor.strategy.config["url"], status=200)
    res.click("Check")


def test_monitor_configure(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])
    res = app.get(url)
    res = res.click("Configure")
    res.forms["config_form"]["url"] = ""
    res = res.forms["config_form"].submit()
    assert res.status_code == 200

    res.forms["config_form"]["url"] = "http://example.com"
    res = res.forms["config_form"].submit()
    assert res.status_code == 302
