import os
from typing import Any

import click
from click import Context

from . import cli

KEY = "birder:upgrade"


@cli.command()
@click.option("--force/--no-force", is_flag=True, default=False)
@click.option("--check/--no-check", is_flag=True, default=False)
@click.option("--clear/--no-clear", is_flag=True, default=False)
@click.option("-v", "--verbosity", type=int, default=1)
@click.pass_context
def upgrade(ctx: Context, force: bool, verbosity: int, check: bool, clear: bool, **kwargs: Any) -> None:  # noqa: C901, PLR0912
    """Upgrade system."""
    from constance import config
    from django.contrib.auth.models import Group
    from django.core.cache import cache
    from django.core.management import call_command

    from birder.models import Environment, User

    redis_client = cache.client.get_client()
    if force or clear:
        redis_client.delete(KEY)
    if clear:
        return
    if check:
        if redis_client.exists(KEY):
            click.secho("Upgrade is running.", fg="yellow")
        else:
            click.secho("Upgrade is not running.", fg="green")
        return
    if redis_client.set(KEY, "locked", nx=True, ex=86400):
        try:
            if verbosity >= 1:
                click.secho("Run database migrations")
            call_command("migrate", interactive=False, verbosity=verbosity - 1)
            if verbosity >= 1:
                click.secho("Collect static assets")
            call_command("collectstatic", interactive=False, verbosity=-1)
            if verbosity >= 1:
                click.secho("Create standard environments")
            Environment.objects.get_or_create(name="development")
            Environment.objects.get_or_create(name="staging")
            Environment.objects.get_or_create(name="production")

            g, is_new = Group.objects.get_or_create(name="Default")
            if is_new:
                config.NEW_USER_DEFAULT_GROUP = g.pk
            if (admin_user_email := os.environ.get("ADMIN_EMAIL")) and os.environ.get("ADMIN_PASSWORD"):
                try:
                    User.objects.get(email=admin_user_email)
                    click.secho(f"{admin_user_email} user found. Superuser not updated/created", fg="yellow")
                except User.DoesNotExist:
                    User.objects.create_superuser(
                        username=admin_user_email, email=admin_user_email, password=os.environ.get("ADMIN_PASSWORD")
                    )
                    click.secho("Superuser created!", fg="green")
            elif verbosity >= 1:
                click.secho("no ADMIN_EMAIL/ADMIN_PASSWORD env vars found", fg="yellow")
        except Exception as e:  # noqa: BLE001
            redis_client.delete(KEY)
            click.secho(f"{e}", fg="red", err=True)
            raise click.Abort(2) from None
        finally:
            redis_client.delete(KEY)
    else:
        click.secho("Concurrent process detected.", fg="red", err=True)
        ctx.exit(2)
