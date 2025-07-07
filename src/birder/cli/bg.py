import importlib
import os
import signal
import sys
from typing import Any

import click
from apscheduler.triggers.interval import IntervalTrigger

from ..config import env
from . import cli

tasks_modules = ["django_dramatiq.setup", "dramatiq_crontab.tasks", "birder.tasks"]


def resolve_executable(exec_name: str) -> str:
    bin_dir = os.path.dirname(sys.executable)
    if bin_dir:
        for d in [bin_dir, os.path.join(bin_dir, "Scripts")]:
            exec_path = os.path.join(d, exec_name)
            if os.path.isfile(exec_path):
                return exec_path
    return exec_name


@cli.group()
def bg(**kwargs: Any) -> None:
    """Background system management."""


@bg.command()
@click.option("-w", "--watch", is_flag=True, default=False)
@click.option("-p", "--processes", type=int, default=env("WORKER_PROCESSES"), help="The number of processes to run")
@click.option(
    "-t", "--threads", type=int, default=env("WORKER_THREADS"), help="The number of threads per process to use"
)
@click.option("-v", "--verbosity", type=int, default=1, help="Verbosity level")
@click.option("--pid", type=str, default=None, help="Write the PID of the master process to this file")
@click.option(
    "--worker-shutdown-timeout", type=int, default=600000, help="Timeout for worker shutdown, in milliseconds"
)
def worker(  # noqa PLR0913
    watch: bool, processes: int, threads: int, worker_shutdown_timeout: int, verbosity: int, pid: str, **kwargs: Any
) -> None:
    """Run background workers."""
    executable_name = "dramatiq"
    executable_path = resolve_executable(executable_name)
    watch_args = ["--watch", "src/"] if watch else []
    verbosity_args = ["-v"] * (verbosity - 1)

    process_args = [
        executable_name,
        "--processes",
        str(processes),
        "--threads",
        str(threads),
        "--worker-shutdown-timeout",
        str(worker_shutdown_timeout),
        "--skip-logging",
        *watch_args,
        *verbosity_args,
        *tasks_modules,
    ]
    if pid:
        process_args.extend(["--pid-file", pid])
    if verbosity > 0:
        click.secho(f"{' '.join(process_args)}\n\n", fg="green")

    os.execvp(executable_path, process_args)  # noqa S606


@bg.command()
def crontab(**kwargs: Any) -> None:
    """Run background scheduler."""
    from dramatiq_crontab import conf, scheduler, utils
    from dramatiq_crontab.management.commands.crontab import kill_softly

    importlib.import_module("dramatiq_crontab.tasks")
    for module in tasks_modules:
        importlib.import_module(module)

    with utils.lock:
        try:
            if not isinstance(utils.lock, utils.FakeLock):
                click.echo("Acquiring lock…")
            with utils.lock:
                signal.signal(signal.SIGHUP, kill_softly)
                signal.signal(signal.SIGTERM, kill_softly)
                signal.signal(signal.SIGINT, kill_softly)
                click.secho("Scheduler started…", fg="green")
                scheduler.add_job(
                    utils.lock.extend,
                    IntervalTrigger(seconds=conf.get_settings().LOCK_REFRESH_INTERVAL),
                    args=(conf.get_settings().LOCK_TIMEOUT, True),
                    name="dramatiq_crontab.utils.lock.extend",
                )
                try:
                    scheduler.start()
                except KeyboardInterrupt as e:
                    click.secho(str(e), fg="orange")
                    click.secho("Shutting down scheduler…", fg="orange")
                    scheduler.shutdown()

        except utils.LockError:
            click.secho("Another scheduler is already running.", fg="red")
