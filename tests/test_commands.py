import os
import random
from io import StringIO
from pathlib import Path
from typing import TYPE_CHECKING
from unittest import mock

import pytest
from django.core.management import call_command

if TYPE_CHECKING:
    from pytest_django.fixtures import SettingsWrapper

pytestmark = pytest.mark.django_db


@pytest.fixture
def env() -> dict[str, str]:
    return {
        "ADMIN_EMAIL": "test@example.com",
        "ADMIN_PASSWORD": "test",
        "ALLOWED_HOSTS": "test",
        "AURORA_API_TOKEN": "test",
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


def test_upgrade_init(
    monkeypatch: pytest.MonkeyPatch,
    env: dict[str, str],
    tmp_path: Path,
    settings: "SettingsWrapper",
) -> None:
    static_root_path = tmp_path / str(random.randint(1, 10000))
    assert not Path(static_root_path).exists()
    out = StringIO()
    settings.STATIC_ROOT = str(static_root_path.absolute())
    with mock.patch.dict(os.environ, {**env}, clear=True):
        call_command("upgrade", stdout=out)
        assert "error" not in str(out.getvalue())
        call_command("upgrade", stdout=out)
        assert "error" not in str(out.getvalue())
