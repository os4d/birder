import os
from pathlib import Path
from typing import TYPE_CHECKING
from unittest import mock

import pytest
from click.testing import CliRunner

from birder.cli import cli

if TYPE_CHECKING:
    from birder.models import Deadline

pytestmark = pytest.mark.django_db


@pytest.fixture
def env() -> dict[str, str]:
    return {
        "ALLOWED_HOSTS": "test",
        "CSRF_COOKIE_SECURE": "test",
        "CSRF_TRUSTED_ORIGINS": "http://testserver/,",
        "CELERY_BROKER_URL": "",
        "CACHE_URL": "",
        "DATABASE_URL": "",
        "SECRET_KEY": "",
        "MEDIA_ROOT": "/tmp/media",
        "STATIC_ROOT": "/tmp/static",
        "DJANGO_SETTINGS_MODULE": "birder.config.settings",
        "SECURE_SSL_REDIRECT": "1",
        "SESSION_COOKIE_SECURE": "1",
    }


def test_deadline_list(
    monkeypatch: pytest.MonkeyPatch, env: dict[str, str], tmp_path: Path, deadline: "Deadline"
) -> None:
    with mock.patch.dict(os.environ, {**env}, clear=True):
        runner = CliRunner()
        result = runner.invoke(cli, ["deadlines", "list"])
        assert result.exit_code == 0
        assert result.stdout
        assert result.stderr == ""
        with mock.patch("birder.models.Deadline.is_expiring", False):
            result = runner.invoke(cli, ["deadlines", "list"])
            assert result.exit_code == 0
            assert result.stdout
            assert result.stderr == ""
            with mock.patch("birder.models.Deadline.is_warn", False):
                result = runner.invoke(cli, ["deadlines", "list"])
                assert result.exit_code == 0
                assert result.stdout
                assert result.stderr == ""
