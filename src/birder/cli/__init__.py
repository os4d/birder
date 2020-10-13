#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020
import click
from click import ClickException

import birder
from birder.core.registry import registry
from ..core.queue import send


class CheckParamType(click.ParamType):
    name = 'check'

    def convert(self, value, param, ctx):
        try:
            return registry[value]
        except KeyError:
            raise ClickException(f'Unknown check {value}')


CheckParam = CheckParamType()


@click.group()
@click.version_option(version=birder.VERSION)
@click.option('--init/--no-init', '-i/-n', default=True, is_flag=True)
@click.pass_context
def cli(ctx, init, **kwargs):
    if init:
        try:
            registry.initialize()
        except Exception as e:
            click.secho(str(e))


@cli.command()
@click.pass_context
def refresh(ctx, **kwargs):
    send('--')



from . import _monitor  # noqa
from . import _registry  # noqa


def main():  # pragma: no cover
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)
