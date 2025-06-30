import click

from birder.config import CONFIG, env

from . import cli


@cli.command("env")
def env_() -> None:
    """Environment related commands."""
    for key, (__, default) in CONFIG.items():
        if (current := env(key)) == default:
            click.secho(f"export {key}={current}", fg="green")
        else:
            click.secho(f"export {key}={current}  # (default: {default})", fg="yellow")
