import os
from typing import TYPE_CHECKING

import pytest

from birder.config.celery import init_sentry
from birder.tasks import execute

if TYPE_CHECKING:
    from celery import Celery
    from pytest_celery.api.worker import CeleryTestWorker

    from birder.models import Monitor


@pytest.fixture(scope="session")
def celery_config():
    return {"broker_url": os.environ["CELERY_BROKER_URL"], "result_backend": os.environ["CELERY_BROKER_URL"]}


@pytest.fixture(scope="session")
def celery_worker_parameters():
    return {
        "shutdown_timeout": 60,
    }


def test_celery_app(celery_app) -> None:
    celery_app.autodiscover_tasks()
    assert True


def test_celery_init_sentry() -> None:
    init_sentry()
    assert True


def test_tasks_success(
    transactional_db, celery_app: "Celery", celery_worker: "CeleryTestWorker", monitor: "Monitor"
) -> None:
    res = execute.delay(monitor.pk)
    assert res
