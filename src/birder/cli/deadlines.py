from textwrap import shorten
from typing import Any

import click

from . import cli

KEY = "birder:upgrade"


@cli.group()
def deadlines(**kwargs: Any) -> None:
    """Manage monitors."""


@deadlines.command(name="list")
def list_(**kwargs: Any) -> None:  # noqa: C901, PLR0912
    """Upgrade system."""
    from birder.models import Deadline

    for deadline in Deadline.objects.all():
        if deadline.is_expiring:
            color = "red"
        elif deadline.is_warn:
            color = "yellow"
        else:
            color = "green"

        click.secho(
            f"{deadline.next} "
            f"{shorten(deadline.monitor.project.name, width=20):<22}"
            f"{shorten(deadline.monitor.name, width=20):<22}"
            f"{shorten(deadline.monitor.environment.name, width=20):<22}"
            f"{deadline.title} ",
            fg=color,
        )
