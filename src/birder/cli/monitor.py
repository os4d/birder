from typing import Any

import click
from click import Context
from tabulate import tabulate

from . import cli


@cli.group()
def monitor(**kwargs: Any) -> None:
    """Manage monitors."""


@monitor.command(name="list")
@click.pass_context
def list_(ctx: Context, **kwargs: Any) -> None:
    """List all existing monitors."""
    from birder.models import Monitor

    data = Monitor.objects.values(
        "id",
        "project__name",
        "environment__name",
        "name",
        "strategy",
        "active",
    ).order_by("project__name", "environment", "name")
    table = tabulate(data, "keys", tablefmt="simple", showindex="always")
    click.echo(table)


@monitor.command(name="check")
@click.argument("monitor_id", type=int, required=False)
@click.option("-a", "--all", "_all", type=int, is_flag=True)
@click.option("-d", "--debug", "debug", is_flag=True)
@click.pass_context
def check_(ctx: Context, monitor_id: int, _all: bool = False, debug: bool = True, **kwargs: Any) -> None:
    """Run selected check."""
    from birder.models import BaseCheck, Monitor

    if _all and monitor_id:
        raise click.UsageError("Do not use --all and id")
    ok = click.style("\u2714", fg="green")
    ko = click.style("\u2716", fg="red")

    def c(m: Monitor) -> None:
        res = m.run()
        status = ok if res else ko
        info = "" if not debug else f" | {m.configuration}"
        click.echo(
            f"{m.project.name[:20]:<22} | "
            f"{m.environment.name[:15]:<17} | "
            f"{m.name[:20]:<22} | "
            f"{status} | "
            f"{m.strategy.status}"
            f"{info}"
        )

    if _all:
        monitors = Monitor.objects.select_related("project", "environment").order_by(
            "project__name", "environment", "name"
        )
    else:
        monitors = [Monitor.objects.get(id=monitor_id)]

    for monitor in monitors:
        if monitor.strategy.mode == BaseCheck.LOCAL_TRIGGER:
            c(monitor)


@monitor.command()
@click.argument("monitor_id", type=int)
@click.pass_context
def refresh(ctx: Context, monitor_id: int, **kwargs: Any) -> None:
    """Force UI refresh."""
    from birder.models import Monitor
    from birder.ws.utils import notify_ui

    monitor = Monitor.objects.get(id=monitor_id)
    notify_ui("update", monitor=monitor)


@monitor.command()
@click.pass_context
def reset(ctx: Context, **kwargs: Any) -> None:
    """Reset all checks."""
    from django.core.cache import cache

    cache.clear()
