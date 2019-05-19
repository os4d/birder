import os
import random
import signal
import sys
import time
from datetime import timedelta
from multiprocessing.pool import Pool


import click
from redis_timeseries import tz_now

import birder
from birder.checks import Factory

from ..config import Config, Target, get_targets
from .tsdb import stats


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
    ts = config['timestamp']
    color = "green"
    extra = "Ok"
    try:
        assert target.check(**config)
        stats.success(target.ts_name, timestamp=ts)
    except KeyboardInterrupt:
        return
    except BaseException as e:
        color = "red"
        extra = str(e)
        stats.increase(target.ts_name, 1, timestamp=ts)
    if config.get('echo'):
        click.secho("{0:<6} {1:<15} {2} {3}".format(ts.strftime('%H:%M:%S'),
                                                    target.label,
                                                    target.url, extra), fg=color)


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
    start = end - delta
    incr = timedelta(minutes=1)
    for t in targets:
        moment = start
        click.echo("%s %s" % (t.ts_name, moment))
        while moment < end:
            value = int(random.getrandbits(1))
            stats.increase(t.ts_name, value, moment)
            moment = moment + incr
            click.echo("%s %s" % (moment, value))


@cli.command()
def list(**kwargs):
    targets = get_targets()
    click.secho("{} targets found".format(len(targets)), bold=True)

    for i, target in enumerate(targets):
        click.secho("  {0:3} {1:<15} {2}".format(i, target.label, target.url))
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

    click.secho("Checking {0:<10} ({1}) {2} ".format(t.label, t.__class__.__name__, t.url), nl=False)

    try:
        t.check(timeout=timeout)
        click.secho(' Ok', fg='green')
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


@cli.command()
@click.option('-q', '--quiet', default=False, is_flag=True)
@click.option('-p', '--processes', default=(os.cpu_count() * 2) or 1, envvar='BIRDER_PROCESSES')
@click.option('-s', '--sleep', default=Config.POLLING_INTERVAL)
@click.option('-o', '--once', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.pass_context
def run(ctx, sleep, processes, quiet, once, timeout, **kwargs):
    targets = get_targets()
    if not quiet:
        ctx.invoke(list)
        click.secho('Running %s processes.' % processes)
    if targets:
        config = {'echo': not quiet,
                  'timestamp': tz_now(),
                  'timeout': timeout}
        params = [(t, config) for t in targets]

        p = Pool(processes=processes, initializer=init_worker)
        while True:
            for param in params:
                param[1]['timestamp'] = tz_now()
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
