from typing import TYPE_CHECKING

import pytest
from django.core.exceptions import ValidationError

if TYPE_CHECKING:
    from birder.models import Project


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
