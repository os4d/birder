import os
from typing import Any

import click

import birder


@click.group()
@click.version_option(version=birder.VERSION)
def cli(**kwargs: Any) -> None:
    import django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "birder.config.settings")
    django.setup()


def main() -> None:
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)


from . import check, monitor, upgrade  # noqa: F401,E402
