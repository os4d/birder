from contextlib import nullcontext as does_not_raise
from typing import TYPE_CHECKING
from unittest.mock import patch

import pytest
from django.http import Http404
from django.urls import reverse
from pyquery import PyQuery
from pytest_django.fixtures import SettingsWrapper
from strategy_field.utils import fqn

from birder.admin import assert_object_or_404
from birder.checks import HttpCheck
from birder.models import Monitor

if TYPE_CHECKING:
    from django_webtest import DjangoTestApp
    from django_webtest.pytest_plugin import MixinWithInstanceVariables
    from responses import RequestsMock

    from birder.models import Project

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


@pytest.mark.parametrize(
    ("obj", "expectation"),
    [
        (object(), does_not_raise()),
        (None, pytest.raises(Http404)),
    ],
)
def test_assert_object_or_404(obj, expectation):
    with expectation:
        assert_object_or_404(obj)


def test_monitor_add(app: "DjangoTestApp", mocked_responses, project: "Project") -> None:
    url = reverse("admin:birder_monitor_add")
    res = app.get(url)
    res.forms["monitor_form"]["name"] = "Monitor #1"
    res.forms["monitor_form"]["strategy"] = fqn(HttpCheck)
    res.forms["monitor_form"]["project"].force_value(project.pk)
    res.forms["monitor_form"]["environment"].force_value(project.default_environment.pk)
    res.forms["monitor_form"].submit().follow()
    monitor = Monitor.objects.get(name="Monitor #1")
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])
    res = app.get(url)
    res = res.click("Check")


def test_monitor_run(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])

    mocked_responses.add("GET", monitor.strategy.config["url"], status=500)
    res = app.get(url)
    res.click("Run")

    mocked_responses.add("GET", monitor.strategy.config["url"], status=200)
    res.click("Run")


def test_monitor_check(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])

    mocked_responses.add("GET", monitor.strategy.config["url"], status=500)
    res = app.get(url)
    res.click("Check")

    mocked_responses.add("GET", monitor.strategy.config["url"], status=200)
    res.click("Check")


def test_monitor_run_error(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])
    res = app.get(url)
    with patch.object(Monitor, "run") as m:
        m.side_effect = Exception("Error executing")
        res = res.click("Run").follow()
        pq = PyQuery(res.body)
        assert pq(".errornote").text() == "Error executing"


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

    res = app.get(url)
    res = res.click("Configure")
    res.forms["config_form"]["url"] = ""
    res = res.forms["config_form"].submit()
    assert res.status_code == 200


def test_monitor_configure_check(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    mocked_responses.add("GET", "https://google.com/", status=400)

    url = reverse("admin:birder_monitor_change", args=[monitor.pk])
    res = app.get(url)
    res = res.click("Configure")
    res.forms["config_form"]["url"] = "https://google.com"
    res = res.forms["config_form"].submit("check")
    assert res.status_code == 200

    mocked_responses.add("GET", "https://google.com/", status=200)
    res.forms["config_form"]["url"] = "https://google.com/"
    res = res.forms["config_form"].submit("check")
    assert res.status_code == 302


def test_actions(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_changelist")
    res = app.get(url)
    res.forms["changelist-form"]["action"] = "check_selected"
    res.forms["changelist-form"]["_selected_action"] = True
    res = res.forms["changelist-form"].submit()
    assert res.status_code == 302


def test_change_icon(app: "DjangoTestApp", mocked_responses, monitor: Monitor) -> None:
    url = reverse("admin:birder_monitor_change", args=[monitor.pk])
    res = app.get(url)
    res = res.click("Change Icon")
    res.forms["config_form"]["icon"] = "=="
    res = res.forms["config_form"].submit()
    assert res.status_code == 200
    res.forms["config_form"]["icon"] = "http://example.com"
    res = res.forms["config_form"].submit()
    assert res.status_code == 302
