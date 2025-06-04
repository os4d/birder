from typing import TYPE_CHECKING

from click.testing import CliRunner

from birder.cli import cli, main

if TYPE_CHECKING:
    from birder.models import Monitor


def test_cli():
    runner = CliRunner()
    result = runner.invoke(cli, "--version")
    assert result.stdout
    assert result.exit_code == 0


def test_cli_monitor_list(db):
    runner = CliRunner()
    result = runner.invoke(cli, ["monitor", "list"])
    assert result.exit_code == 0


def test_cli_monitor_reset(db):
    runner = CliRunner()
    result = runner.invoke(cli, ["monitor", "reset"])
    assert result.exit_code == 0


def test_cli_monitor_refresh(monitor: "Monitor"):
    runner = CliRunner()
    result = runner.invoke(cli, ["monitor", "refresh", str(monitor.pk)])
    assert result.exit_code == 0


def test_cli_monitor_check(monitor: "Monitor"):
    runner = CliRunner()
    result = runner.invoke(cli, ["monitor", "check", str(monitor.pk)])
    assert result.exit_code == 0


def test_cli_monitor_main(monitor: "Monitor"):
    try:
        main()
    except SystemExit:
        assert True
