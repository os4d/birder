import pytest
from django.core.exceptions import ValidationError


def test_model_project(project, environment):
    project.environments.add(environment)
    project.clean()
    project.save()


def test_model_invalid_default_environment(project, environment):
    project.default_environment = environment
    with pytest.raises(ValidationError):
        project.clean()
