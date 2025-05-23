import os
from typing import Any

import click
from click import Context
from tabulate import tabulate

import birder


@click.group()
@click.version_option(version=birder.VERSION)
def cli(**kwargs: Any) -> None:
    import django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "birder.config.settings")
    django.setup()


@cli.command(name="list")
@click.pass_context
def list_(ctx: Context, **kwargs: Any) -> None:
    """List all existing monitors."""
    from birder.models import Monitor

    data = Monitor.objects.values(
        "id",
        "project__name",
        "name",
        "strategy",
        "active",
    )
    table = tabulate(data, [], tablefmt="simple")
    click.echo(table)


@cli.command(name="check")
@click.argument("monitor_id", type=int, required=False)
@click.option("-a", "--all", "_all", type=int, is_flag=True)
@click.pass_context
def trigger(ctx: Context, monitor_id: int, _all: bool = False, **kwargs: Any) -> None:
    """Run selected check."""
    from birder.models import BaseCheck, Monitor

    if _all and monitor_id:
        raise click.UsageError("--")
    ok = click.style("\u2714", fg="green")
    ko = click.style("\u2716", fg="red")
    if _all:
        for monitor in Monitor.objects.select_related("project", "environment").order_by(
            "project__name", "environment", "name"
        ):
            if monitor.strategy.mode == BaseCheck.LOCAL_TRIGGER:
                res = monitor.run()
                status = ok if res else ko
                click.echo(
                    f"{monitor.project.name[:20]:<22} | "
                    f"{monitor.environment.name[:15]:<17} | "
                    f"{monitor.name[:20]:<22} | "
                    f"{status}"
                )
    else:
        monitor = Monitor.objects.get(id=monitor_id)
        if monitor.strategy.mode == BaseCheck.LOCAL_TRIGGER:
            monitor.run()


@cli.command()
@click.argument("monitor_id", type=int)
@click.pass_context
def refresh(ctx: Context, monitor_id: int, **kwargs: Any) -> None:
    """Force UI refresh."""
    from birder.models import Monitor
    from birder.ws.utils import notify_ui

    monitor = Monitor.objects.get(id=monitor_id)
    notify_ui("update", monitor=monitor)


@cli.command()
@click.pass_context
def reset(ctx: Context, **kwargs: Any) -> None:
    """Reset all checks."""
    from django.core.cache import cache

    cache.clear()


def main() -> None:
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)
