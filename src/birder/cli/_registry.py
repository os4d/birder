#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020
import click

from birder.core.registry import registry

from . import cli


@cli.group(name="registry")
@click.pass_context
def reg(ctx, **kwargs):
    pass


#
# @reg.command()
# @click.argument('conn', type=str)
# @click.option('--label', default=None)
# @click.option('--dry-run', default=False, is_flag=True)
# def add(conn, label, dry_run, **kwargs):
#     if label:
#         url = conn
#     elif '|' in conn:
#         label, url = conn.split('|', 1)
#     else:
#         label, url = conn, conn
#     try:
#         check = Factory.from_conn_string(label, url, _system=True, label=label)
#         registry.register(check)
#         registry.persist()
#     except Exception as e:
#         click.secho(e)
#
#
# @reg.command()
# @click.argument('check', type=CheckParam)
# def disable(check, **kwargs):
#     registry.disable(check.pk)
#
#
# @reg.command()
# @click.argument('check', type=CheckParam)
# def enable(check, **kwargs):
#     registry.enable(check.pk)
#
#
# @reg.command()
# def inspect(**kwargs):
#     dynamic = client.hgetall("monitors")
#
#     for k, v in dynamic.items():
#         click.secho(f"{k} : {v}")
#
#
@reg.command('list')
@click.option('--removed', default=False, is_flag=True)
@click.option('--system', default=False, is_flag=True)
def list_(removed, system, **kwargs):
    click.secho("{} targets registered".format(len(registry)), bold=True)

    click.echo("Active:")
    for target in registry:
        if target.enabled:
            click.secho("  {0:3} {1:<25} {2}".format(target.pk, target.label, target.url))
    registry.sort_by()
    # if system:
    #     click.echo("System:")
    #     for target in registry.system:
    #         click.secho("  {0:3} {1:<15} {2}".format(target.pk, target.label, target.url))
    #
    # if removed:
    #     click.echo("Removed:")
    #     for target in registry.removed:
    #         click.secho("  {0:3} {1:<15} {2}".format(target.pk, target.label, target.url))
    # click.echo("")


# @reg.command()
# def reset(**kwargs):
#     registry.reset()
#
#
# @reg.command()
# def init(**kwargs):
#     registry.initialize()
#
# @reg.command()
# def update_from_env(**kwargs):
#     registry.update_from_env()
#
# @reg.command()
# @click.argument('check', type=CheckParam)
# def rm(check, **kwargs):
#     registry.delete(check.pk)
#
#
@reg.command()
@click.argument('order', nargs=-1)
@click.option('--list', '-l', 'show', is_flag=True, default=False)
@click.pass_context
def sort(ctx, order, show, **kwargs):
    registry.sort_by(order)
    # click.secho(",".join(map(str, registry.order)))
    # if show:
    #     ctx.invoke(list_)
