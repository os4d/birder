from typing import TYPE_CHECKING

from click.testing import CliRunner

from birder.cli import cli, main

if TYPE_CHECKING:
    from birder.models import Monitor


def test_cli():
    runner = CliRunner()
    result = runner.invoke(cli)
    assert result.exit_code == 0


def test_cli_list(db):
    runner = CliRunner()
    result = runner.invoke(cli, "list")
    assert result.exit_code == 0


def test_cli_reset(db):
    runner = CliRunner()
    result = runner.invoke(cli, "reset")
    assert result.exit_code == 0


def test_cli_refresh(monitor: "Monitor"):
    runner = CliRunner()
    result = runner.invoke(cli, ["refresh", str(monitor.pk)])
    assert result.exit_code == 0


def test_cli_trigger(monitor: "Monitor"):
    runner = CliRunner()
    result = runner.invoke(cli, ["trigger", str(monitor.pk)])
    assert result.exit_code == 0


def test_cli_main(monitor: "Monitor"):
    try:
        main()
    except SystemExit:
        assert True
