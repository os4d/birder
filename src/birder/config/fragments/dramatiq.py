import logging
import logging.config

import dramatiq
from dramatiq import Broker, Worker
from redis import ConnectionPool

from ..settings import LOGGING, env

DRAMATIQ_VALKEY_URL = env("TASK_BROKER") or env("REDIS_SERVER")
DRAMATIQ_BROKER = {
    "BROKER": "dramatiq.brokers.redis.RedisBroker",
    "OPTIONS": {
        "connection_pool": ConnectionPool.from_url(DRAMATIQ_VALKEY_URL),
    },
    "MIDDLEWARE": [
        "birder.config.fragments.dramatiq.BirderLoggingMiddleware",
        "dramatiq.middleware.Prometheus",
        "dramatiq.middleware.AgeLimit",
        "dramatiq.middleware.TimeLimit",
        "dramatiq.middleware.Callbacks",
        "dramatiq.middleware.Retries",
        "django_dramatiq.middleware.DbConnectionsMiddleware",
        "django_dramatiq.middleware.AdminMiddleware",
    ],
}
DRAMATIQ_WORKER_PROCESSES = env("WORKER_PROCESSES")
DRAMATIQ_WORKER_THREADS = env("WORKER_THREADS")

DRAMATIQ_TASKS_DATABASE = "default"


def configure_logger(name: str) -> None:
    log = logging.getLogger(name)
    log.setLevel(logging.ERROR)
    handlers = [h for h in log.handlers if not isinstance(h, logging.StreamHandler)]
    log.handlers = handlers


def configure_logging() -> None:
    for name in ("birder.checks", "kombu", "redis", "celery", "dramatiq", "redis.connection", "kombu.connection"):
        configure_logger(name)


class BirderLoggingMiddleware(dramatiq.Middleware):
    def after_worker_boot(self, broker: Broker, worker: Worker) -> None:
        logging.config.dictConfig(LOGGING)
        configure_logging()
