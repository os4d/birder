import click
from django.conf import settings


@click.group()
def env() -> None:
    """Environment related commands."""


@env.command()
@click.option("--output", type=click.Choice(["json", "env"]), default="env", help="Output format.")
def defaults(output: str) -> None:
    """Output default environment variables."""
    if output == "json":
        click.echo(settings.ENV_DEFAULTS)
    else:
        for key, value in settings.ENV_DEFAULTS.items():
            click.echo(f"{key}={value}")
