import hashlib
import json
import os
from typing import Any

import sentry_sdk
from celery import Celery, Task, signals
from django.conf import settings
from django.core.cache import cache

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "birder.config.settings")


class LockedTask(Task):
    lock_key = None

    def acquire_lock(self) -> bool:
        return cache.lock(self.lock_key, 60 * 60 * 24)  # 1 day TTL

    def release_lock(self) -> None:
        if self.lock_key:
            cache.delete(self.lock_key)

    def __call__(self, *args: Any, **kwargs: Any) -> Any:
        h = hashlib.new("md5")  # noqa: S324
        h.update(json.dumps(kwargs, sort_keys=True).encode("utf-8"))
        self.lock_key = f"lock:{self.name}:{'-'.join(map(str, args)).encode('utf-8')}:{h.hexdigest()}"
        if self.acquire_lock():
            try:
                return super().__call__(*args, **kwargs)
            finally:
                self.release_lock()
        else:
            return "Task already running"


app = Celery("birder")
app.task_cls = LockedTask
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS, related_name="tasks")


@signals.celeryd_init.connect
def init_sentry(**_kwargs: Any) -> None:
    sentry_sdk.set_tag("celery", True)
