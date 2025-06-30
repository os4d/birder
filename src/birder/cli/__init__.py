import os
from typing import Any

import click

import birder


@click.group()
@click.version_option(version=birder.VERSION, message="Birder %(version)s")
def cli(**kwargs: Any) -> None:
    import django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "birder.config.settings")
    django.setup()


def main() -> None:
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)


from . import bg, check, deadlines, env, monitor, upgrade  # noqa: F401,E402
