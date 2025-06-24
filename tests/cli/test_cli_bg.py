from pathlib import Path
from typing import TYPE_CHECKING
from unittest import mock

import pytest
from click.testing import CliRunner

from birder.cli import cli

if TYPE_CHECKING:
    from pytest_django.fixtures import SettingsWrapper

pytestmark = pytest.mark.django_db


def test_bg(monkeypatch: pytest.MonkeyPatch, tmp_path: Path, settings: "SettingsWrapper") -> None:
    with mock.patch("birder.cli.bg.os.execvp"):
        runner = CliRunner()
        result = runner.invoke(cli, ["bg"])
        assert result.exit_code == 2


@pytest.mark.parametrize("pid", ["", "test.pid"])
@pytest.mark.parametrize("verbosity", [0, 1, 2])
def test_bg_worker(tmp_path: Path, pid, verbosity) -> None:
    with mock.patch("birder.cli.bg.os.execvp"):
        runner = CliRunner()
        result = runner.invoke(cli, ["bg", "worker", "-v", verbosity, "--pid", pid])
        assert result.exit_code == 0


def test_bg_crontab(tmp_path: Path) -> None:
    with mock.patch("dramatiq_crontab.scheduler"):
        runner = CliRunner()
        result = runner.invoke(cli, ["bg", "crontab"])
        assert result.exit_code == 0
