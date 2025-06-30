from click.testing import CliRunner

from birder.cli import cli


def test_env_defaults_env_format():
    runner = CliRunner()
    result = runner.invoke(cli, ["env"])
    assert result.exit_code == 0
    assert result.output
