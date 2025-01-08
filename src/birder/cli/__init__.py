import os
from typing import Any

import click
from click import Context
from tabulate import tabulate

import birder


@click.group()
@click.version_option(version=birder.VERSION)
@click.pass_context
def cli(ctx: Context, **kwargs: Any) -> None:
    import django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "birder.config.settings")
    django.setup()


@cli.command(name="list")
@click.pass_context
def list_(ctx: Context, **kwargs: Any) -> None:
    from birder.models import Monitor

    data = Monitor.objects.values(
        "id",
        "project__name",
        "name",
        "strategy",
        "active",
    )
    table = tabulate(data, [], tablefmt="grid")
    click.echo(table)


@cli.command()
@click.argument("monitor_id", type=int)
@click.pass_context
def trigger(ctx: Context, monitor_id: int, **kwargs: Any) -> None:
    from birder.models import Monitor

    monitor = Monitor.objects.get(id=monitor_id)
    monitor.trigger()


@cli.command()
@click.argument("monitor_id", type=int)
@click.pass_context
def refresh(ctx: Context, monitor_id: int, **kwargs: Any) -> None:
    from birder.models import Monitor
    from birder.ws.utils import notify_ui

    monitor = Monitor.objects.get(id=monitor_id)
    notify_ui("update", monitor=monitor)


@cli.command()
@click.pass_context
def reset(ctx: Context, **kwargs: Any) -> None:
    from django.core.cache import cache

    cache.clear()


def main() -> None:
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)
