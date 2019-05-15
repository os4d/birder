import os
import random

from datetime import timedelta

import signal
import sys
import time
from celery.utils.collections import OrderedDict
from multiprocessing.pool import Pool

import click
from redis_timeseries import tz_now

import birder
from birder.checks import Factory

from ..config import Config, Target, get_targets
from .tsdb import stats
from ..logging import logger


def _get_target(arg):
    if arg.isdigit():
        targets = get_targets()
        t = targets[int(arg)]
    elif ':' in arg:
        t = Factory.from_conn_string('', arg)
    else:
        targets = get_targets()
        t = next(filter(lambda x: x.label.lower() == arg, targets))
    return t


def monitor(target: Target, config: dict):
    try:
        color = "green"
        extra = "Ok"
        assert target.check(**config)
        stats.success(target.ts_name)
    except KeyboardInterrupt:
        return
    except BaseException as e:
        color = "red"
        extra = str(e)
        stats.increase(target.ts_name, 1)
    if config.get('echo'):
        click.secho("{0:<15} {1} {2}".format(target.label, target.url, extra), fg=color)


def init_worker():
    signal.signal(signal.SIGINT, signal.SIG_IGN)


@click.group()
@click.version_option(version=birder.VERSION)
@click.pass_context
def cli(ctx, **kwargs):
    pass


@cli.command()
def sample(**kwargs):
    targets = get_targets()
    end = tz_now()
    delta = timedelta(days=2)
    start =  end - delta
    incr = timedelta(minutes=1)
    for t in targets:
        moment = start
        click.echo("%s %s" % (t.ts_name, moment))
        while moment < end:
            value = int(random.getrandbits(1))
            stats.increase(t.ts_name, value, moment)
            moment = moment + incr
            click.echo("%s %s" % (moment, value))
            # click.echo("%s %s" % (moment, str(stats.get_buckets(t.ts_name, '60m', 2))))
    #
    # points = round(delta.total_seconds() / 60)
    # for point in range(1, points):
    #     dt = start + (incr * point)
    #     for t in targets:
    #         # value = int(random.getrandbits(1))
    #         # stats.hset("%s:s" % t.ts_name, int(value), dt)
    #         # stats.hset("%s:f" % t.ts_name, int(not value), dt)
    #
    #         value = random.randint(1, 50)
    #         # stats.hset(t.ts_name, value, dt)
    #         stats.increase(t.ts_name, value, dt)

@cli.command()
def list(**kwargs):
    targets = get_targets()
    click.secho("{} targets found".format(len(targets)), bold=True)

    for target in targets:
        click.secho("  {0:3} {1:<15} {2}".format(target.order, target.label, target.url))
    click.echo("")


@cli.command()
@click.argument('target', nargs=1)
@click.pass_context
def clear(ctx, target):
    try:
        t = _get_target(target)
    except StopIteration:
        ctx.fail("Invalid check '{}'".format(target))

    click.secho("{0:<3} {1:<15} {2}".format(t.order, t.label, t.url))
    stats.zap(t.ts_name)


@cli.command()
@click.argument('target', nargs=1)
@click.option('-f', '--fail', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.pass_context
def check(ctx, target, fail, timeout):
    try:
        t = _get_target(target)
    except StopIteration:
        ctx.fail("Invalid check '{}'".format(target))

    click.secho("Checking {1:<10} {0:>10} {2}".format(t.label, t.__class__.__name__, t.url), nl=False)

    try:
        t.check(timeout=timeout)
        click.secho('Ok', fg='green')
    except Exception as e:
        click.secho('Fail %s' % e, fg='red')


@cli.command()
@click.argument('target', nargs=1)
@click.option('-f', '--fail', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.pass_context
def force(ctx, target, fail, timeout):
    try:
        t = _get_target(target)
    except StopIteration:
        ctx.fail("Invalid check '{}'".format(target))
    ctx.invoke(monitor, t, {'echo': True})
    # click.secho("Checking {1:<10} {0:>10} {2}".format(t.label, t.__class__.__name__, t.url), nl=False)
    #
    # try:
    #     t.check(timeout=timeout)
    #     click.secho('Ok', fg='green')
    #     stats.success(t.ts_name)
    # except Exception as e:
    #     stats.increase(t.ts_name, 1)
    #     click.secho('Fail %s' % e, fg='red')
    #

@cli.command()
@click.option('-q', '--quiet', default=False, is_flag=True)
@click.option('-p', '--processes', default=(os.cpu_count() * 2) or 1)
@click.option('-s', '--sleep', default=Config.POLLING_INTERVAL)
@click.option('-o', '--once', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.pass_context
def run(ctx, sleep, processes, quiet, once, timeout, **kwargs):
    targets = get_targets()
    if not quiet:
        ctx.invoke(list)

    if targets:
        config = {'echo': not quiet,
                  'timeout': timeout}
        params = [(t, config) for t in targets]

        p = Pool(processes=processes, initializer=init_worker)
        while True:
            try:
                p.starmap_async(monitor, params).get(9999999)
                time.sleep(sleep)
            except (KeyboardInterrupt, SystemExit):
                break
            if once:
                break
    else:
        click.secho('ERROR: No urls defined', fg="red")
        click.secho('MONITOR<order>_<label>=<conn_url>', fg="red")
        sys.exit(1)


def main():  # pragma: no cover
    cli(prog_name=birder.NAME, obj={}, max_content_width=100)
