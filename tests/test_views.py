import pytest
from django.urls import reverse


@pytest.fixture
def project_with_default_env(environment):
    from testutils.factories import EnvironmentFactory, ProjectFactory

    env1 = EnvironmentFactory(name="development")
    env2 = EnvironmentFactory(name="production")
    return ProjectFactory(environments=[env1, env2])


def test_index(django_app, monitor):
    assert django_app.get("/")


def test_project(django_app, monitor):
    url = reverse("project-detail", args=[monitor.project.pk])
    assert django_app.get(url)


def test_project_with_default_environment(django_app, project_with_default_env):
    url = reverse("project-detail", args=[project_with_default_env.pk])
    assert django_app.get(url).status_code == 200


def test_monitor_detail(django_app, monitor):
    assert django_app.get(reverse("monitor-detail", kwargs={"pk": monitor.pk}))


def test_monitor_api(django_app, passive_monitor):
    url = reverse("trigger", args=[passive_monitor.pk, passive_monitor.token])
    assert django_app.get(url)


def test_trigger_wrong_token(django_app, passive_monitor):
    url = reverse("trigger", args=[passive_monitor.pk, "=="])
    ret = django_app.get(url, expect_errors=True)
    assert ret.status_code == 403
    assert "Invalid Token" in ret.text


def test_trigger_wrong_strategy(django_app, monitor):
    url = reverse("trigger", args=[monitor.pk, monitor.token])
    ret = django_app.get(url, expect_errors=True)
    assert ret.status_code == 400
    assert "Check not enabled for remote call" in ret.text


def test_trigger_404(django_app, db):
    url = reverse("trigger", args=[0, "=="])
    res = django_app.get(url, expect_errors=True)
    assert res.status_code == 404


@pytest.mark.parametrize("code", [400, 403, 404, 500])
def test_errors(django_app, code):
    url = reverse(f"errors-{code}")
    res = django_app.get(url, expect_errors=True)
    assert res.status_code == code
