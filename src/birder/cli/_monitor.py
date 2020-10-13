import os
import signal
import time
from multiprocessing.pool import Pool

import click
import eventlet

from birder.cli import CheckParam, cli
from birder.config import Config
from birder.core.check import BaseCheck
from birder.core.redis import client
from birder.core.registry import registry
from birder.core.tsdb import stats
from birder.utils import tz_now


def monit(target: BaseCheck, config: dict):
    ts = config['timestamp']
    timeout = config['timeout']
    color = "green"
    extra = "Ok"
    try:
        with eventlet.Timeout(timeout):
            assert target.check(**config)
        stats.success(target.pk, timestamp=ts)
    except KeyboardInterrupt:
        return
    except BaseException as e:
        color = "red"
        extra = str(e)
        # stats.set(target.ts_name, amount=1, timestamp=ts)
        stats.error(target.pk, 1, timestamp=ts)

    if config.get('echo'):
        click.secho(f"{ts.strftime('%H:%M:%S'):<6} "
                    f"#{target.pk:>03} "
                    f"{target.label:<15} "
                    f"{target.url} {extra}", fg=color)


def init_worker():
    signal.signal(signal.SIGINT, signal.SIG_IGN)


@cli.group()
@click.pass_context
def monitor(ctx, **kwargs):
    pass


@monitor.command()
@click.argument('targets', nargs=-1, type=CheckParam)
@click.pass_context
def clear(ctx, targets):
    for t in targets:
        click.secho("{0:<3} {1:<15} {2}".format(t.order, t.label, t.url))
        stats.zap(t.pk)


@monitor.command()
@click.argument('targets', nargs=-1, type=CheckParam)
@click.option('-f', '--fail', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.pass_context
def check(ctx, targets, fail, timeout):
    # t = registry[target]
    try:
        for t in targets:
            click.secho("Checking {0:<10} ({1}) {2} ".format(t.label, t.__class__.__name__, t.url))
            with eventlet.Timeout(timeout):
                t.check(timeout=timeout)
        click.secho(' Ok', fg='green')
    except Exception as e:
        click.secho('Fail %s' % e, fg='red')


@monitor.command()
@click.pass_context
def zap(ctx, **kwargs):
    for key in client.scan_iter("stats:*"):
        client.delete(key)


@monitor.command()
@click.option('-q', '--quiet', default=False, is_flag=True)
@click.option('-p', '--processes', default=(os.cpu_count() * 2) or 1, envvar='BIRDER_PROCESSES')
@click.option('-s', '--sleep', default=Config.POLLING_INTERVAL)
@click.option('-o', '--once', is_flag=True)
@click.option('-t', '--timeout', type=int, default=5)
@click.option('-g', '--group', default=False, is_flag=True)
@click.pass_context
def run(ctx, sleep, processes, quiet, once, timeout, group, **kwargs):
    click.secho('Running %s processes.' % processes)
    p = Pool(processes=processes, initializer=init_worker)
    config = {'echo': not quiet,
              'timestamp': tz_now(),
              'timeout': timeout}

    while True:
        # targets = registry.values()
        from birder.core.queue import read
        message = read()
        if message:
            # TODO: remove me
            print(111, "_monitor.py:109", 11111, message)
        params = [(t, config) for t in registry if t.enabled]
        for param in params:
            param[1]['timestamp'] = tz_now()
        try:
            p.starmap_async(monit, params).get(9999999)
            if not once:
                if group:
                    click.secho('-' * 80)
                time.sleep(sleep)
        except (KeyboardInterrupt, SystemExit):
            break
        if once:
            break
