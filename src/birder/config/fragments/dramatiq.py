from redis import ConnectionPool

from ..settings import env

DRAMATIQ_VALKEY_URL = env("TASK_BROKER") or env("REDIS_SERVER")
DRAMATIQ_BROKER = {
    "BROKER": "dramatiq.brokers.redis.RedisBroker",
    "OPTIONS": {
        "connection_pool": ConnectionPool.from_url(DRAMATIQ_VALKEY_URL),
    },
    "MIDDLEWARE": [
        # "dramatiq.middleware.Prometheus",
        "dramatiq.middleware.AgeLimit",
        "dramatiq.middleware.TimeLimit",
        "dramatiq.middleware.Callbacks",
        "dramatiq.middleware.Retries",
        "django_dramatiq.middleware.DbConnectionsMiddleware",
        "django_dramatiq.middleware.AdminMiddleware",
    ],
}

DRAMATIQ_TASKS_DATABASE = "default"
DRAMATIQ_AUTODISCOVER_MODULES = ["tasks"]
