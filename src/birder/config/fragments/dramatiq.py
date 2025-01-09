import dramatiq.brokers.redis
import valkey

from ..settings import env

dramatiq.brokers.redis.redis = valkey

DRAMATIQ_VALKEY_URL = env("VALKEY_URL")
DRAMATIQ_BROKER = {
    "BROKER": "dramatiq.brokers.redis.RedisBroker",
    "OPTIONS": {
        "connection_pool": valkey.ConnectionPool.from_url(DRAMATIQ_VALKEY_URL),
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
