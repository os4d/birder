from typing import Any

import click
from django.core.management import call_command

from . import cli


@cli.command()
@click.option("--deploy", is_flag=True, default=False)
@click.option("--list-tags", is_flag=True, default=False)
@click.option("-v", "--verbosity", type=int, default=1)
def check(deploy: bool, verbosity: int, **kwargs: Any) -> None:
    """Check Birder configuration."""
    call_command("check", deploy=deploy, verbosity=verbosity, **kwargs)
