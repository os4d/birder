import os
import random
import time
from pathlib import Path
from typing import TYPE_CHECKING, Generator
from unittest import mock

import pytest
from click.testing import CliRunner

from birder.cli import cli
from birder.models import User

if TYPE_CHECKING:
    from pytest_django.fixtures import SettingsWrapper

pytestmark = pytest.mark.django_db


@pytest.fixture
def env() -> dict[str, str]:
    return {
        "ADMIN_EMAIL": "test@example.com",
        "ADMIN_PASSWORD": "test",
        "ALLOWED_HOSTS": "test",
        "CSRF_COOKIE_SECURE": "test",
        "CSRF_TRUSTED_ORIGINS": "http://testserver/,",
        "HOPE_API_TOKEN": "test",
        "CELERY_BROKER_URL": "",
        "CACHE_URL": "",
        "DATABASE_URL": "",
        "SECRET_KEY": "",
        "MEDIA_ROOT": "/tmp/media",
        "STATIC_ROOT": "/tmp/static",
        "DJANGO_SETTINGS_MODULE": "country_workspace.config.settings",
        "SECURE_SSL_REDIRECT": "1",
        "SESSION_COOKIE_SECURE": "1",
    }


@pytest.fixture
def lock_upgrade() -> Generator[str, None, None]:
    from django.core.cache import cache

    mocked_key = "test-key"
    redis_client = cache.client.get_client()
    redis_client.set(mocked_key, "locked", nx=True, ex=86400)
    mock.patch("birder.cli.upgrade.KEY", mocked_key).start()
    yield mocked_key
    redis_client.delete(mocked_key)


def test_upgrade_init(
    monkeypatch: pytest.MonkeyPatch, env: dict[str, str], tmp_path: Path, settings: "SettingsWrapper"
) -> None:
    static_root_path = tmp_path / str(random.randint(1, 10000))
    assert not Path(static_root_path).exists()
    settings.STATIC_ROOT = str(static_root_path.absolute())
    with mock.patch.dict(os.environ, {**env}, clear=True):
        runner = CliRunner()
        result = runner.invoke(cli, "upgrade")

        assert "error" not in result.stdout
        assert "Superuser created!" in result.stdout
        result = runner.invoke(cli, "upgrade")

        assert "error" not in result.stdout
        assert "Superuser not updated/created" in result.stdout

        assert (user := User.objects.get(email=os.environ["ADMIN_EMAIL"]))
        assert user.is_active
        assert user.is_superuser


@pytest.mark.parametrize("check", ["--check", "--no-check"])
@pytest.mark.parametrize("clear", ["--clear", "--no-clear"])
@pytest.mark.parametrize("force", ["--force", "--no-force"])
@pytest.mark.parametrize("verbosity", [0, 1, 2])
def test_upgrade_args(
    monkeypatch: pytest.MonkeyPatch,
    env: dict[str, str],
    settings: "SettingsWrapper",
    tmp_path: Path,
    verbosity: int,
    force: str,
    check: str,
    clear: str,
) -> None:
    static_root_path = tmp_path / str(random.randint(1, 10000))
    settings.STATIC_ROOT = str(static_root_path.absolute())
    with mock.patch.dict(os.environ, {**env}, clear=True):
        runner = CliRunner()
        result = runner.invoke(cli, ["upgrade", "--verbosity", verbosity, force, clear, check])
        assert result.stderr == ""
        assert result.exit_code == 0


def test_upgrade_lock(monkeypatch: pytest.MonkeyPatch, env: dict[str, str], lock_upgrade) -> None:
    runner = CliRunner()
    result = runner.invoke(cli, ["upgrade"])
    assert "Concurrent process detected." in result.stderr
    assert result.stderr
    assert result.exit_code == 2


def test_upgrade_check(monkeypatch: pytest.MonkeyPatch, env: dict[str, str], lock_upgrade) -> None:
    runner = CliRunner()
    result = runner.invoke(cli, ["upgrade", "--check"])
    assert result.stderr == ""
    assert result.exit_code == 0


def test_upgrade_no_admin(monkeypatch: pytest.MonkeyPatch, env: dict[str, str], lock_upgrade) -> None:
    import birder.cli.upgrade

    birder.cli.upgrade.KEY = str(time.time())
    runner = CliRunner()
    result = runner.invoke(cli, ["upgrade", "--verbosity", "2"])
    assert "no ADMIN_EMAIL/ADMIN_PASSWORD env vars found" in result.stdout
    assert result.exit_code == 0
    result = runner.invoke(cli, ["upgrade", "--verbosity", "0"])
    assert result.exit_code == 0


def test_upgrade_error(monkeypatch: pytest.MonkeyPatch, env: dict[str, str], lock_upgrade) -> None:
    import birder.cli.upgrade

    birder.cli.upgrade.KEY = str(time.time())
    with mock.patch("django.core.management.call_command", side_effect=Exception):
        runner = CliRunner()
        result = runner.invoke(cli, ["upgrade", "--verbosity", "2"])
        assert result.stderr == "\nAborted!\n"
        assert result.exit_code == 1
