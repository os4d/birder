from unittest import mock

import pytest
from django.core.exceptions import ValidationError

from birder.models import Monitor, Project


@pytest.fixture
def unknown_environment(db):
    from testutils.factories import EnvironmentFactory

    return EnvironmentFactory(name="unknown_environment")


def test_model_project(project, environment):
    project.environments.add(environment)
    project.clean()
    project.save()


def test_model_invalid_default_environment(project: "Project", unknown_environment):
    project.default_environment = unknown_environment
    with pytest.raises(ValidationError):
        project.clean()


def test_model_project_get_absolute_url(project: "Project"):
    project.get_absolute_url()


def test_model_project_failures(project: "Project"):
    with mock.patch.object(project, "data", {"key": Monitor.Status.FAIL}):
        assert project.failures == 1


def test_model_project_warnings(project: "Project", unknown_environment):
    with mock.patch.object(project, "data", {"key": Monitor.Status.WARN}):
        assert project.warnings == 1


def test_model_project_success(project: "Project", unknown_environment):
    with mock.patch.object(project, "data", {"key": Monitor.Status.SUCCESS}):
        assert project.success == 1


@pytest.mark.parametrize(
    "status", [Monitor.Status.FAIL, Monitor.Status.WARN, Monitor.Status.SUCCESS, Monitor.Status.UNKNOWN]
)
def test_model_project_status(project: "Project", status):
    with mock.patch.object(project, "data", {"key": status}):
        assert project.status == status
