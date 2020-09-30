import os
import random
import signal
import sys
import time
from datetime import datetime, timedelta
from multiprocessing.pool import Pool

import birder
import click
import eventlet
from birder.checks import Factory

from ..config import Config, Target, get_targets
from ..utils import tz_now
from .tsdb import client, granularities, stats


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
    timeout = config['timeout']
    color = "green"
    extra = "Ok"
    try:
        with eventlet.Timeout(timeout):
            assert target.check(**config)
        stats.success(target.ts_name, timestamp=ts)
    except KeyboardInterrupt:
        return
    except BaseException as e:
        color = "red"
        extra = str(e)
        # stats.set(target.ts_name, amount=1, timestamp=ts)
        stats.error(target.ts_name, 1, timestamp=ts)

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
@click.option('-c', '--check', multiple=True)
def show(check, **kwargs):
    if check:
        targets = [_get_target(c) for c in check]
    else:
        targets = get_targets()
        click.secho("{} targets found".format(len(targets)), bold=True)

    for i, target in enumerate(targets):
        click.secho("{0:3} {1:<15} {2}".format(i, target.label, target.url))
        for g in granularities:
            hits = stats.get_total(target.ts_name, g)
            click.echo("   {0} {1}".format(g, hits))
    click.echo("")


@cli.command()
def list(**kwargs):
    targets = get_targets()
    click.secho("{} targets found".format(len(targets)), bold=True)

    for i, target in enumerate(targets):
        click.secho("  {0:3} {1:<15} {2}".format(i, target.label, target.url))
    click.echo("")


@cli.command()
@click.argument('target', nargs=-1)
@click.option('--all', '_all', is_flag=True)
@click.pass_context
def clear(ctx, target, _all):
    if not (target or _all):
        ctx.fail("Invalid check '{}'".format(target))
    if target:
        try:
            t = _get_target(target)
        except StopIteration:
            ctx.fail("Invalid check '{}'".format(target))

        click.secho("{0:<3} {1:<15} {2}".format(t.order, t.label, t.url))
        stats.zap(t.ts_name)
    else:
        targets = get_targets()
        for t in targets:
            click.secho("{0.order:<3} {0.label:<15} {0.url} {0.ts_name}".format(t))
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
        with eventlet.Timeout(timeout):
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
    ctx.invoke(monitor, t, {'echo': True,
                            'timestamp': datetime.now(),
                            'timeout': timeout})


@cli.command()
@click.pass_context
def zap(ctx, **kwargs):
    r = client
    for key in r.scan_iter("stats:*"):
        r.delete(key)


@cli.command()
@click.option('-q', '--quiet', default=False, is_flag=True)
@click.option('-p', '--processes', default=(os.cpu_count() * 2) or 1, envvar='BIRDER_PROCESSES')
@click.option('-s', '--sleep', default=Config.POLLING_INTERVAL)
@click.option('-o', '--once', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.option('-c', '--check', multiple=True)
@click.pass_context
def run(ctx, sleep, processes, quiet, once, timeout, check, **kwargs):
    if check:
        targets = [_get_target(c) for c in check]
    else:
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
                # param[1]['timestamp'] = tz_now()
                param[1]['timestamp'] = tz_now()
            try:
                p.starmap_async(monitor, params).get(9999999)
                if not once:
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
