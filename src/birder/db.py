from datetime import datetime, timedelta
from enum import Enum
from typing import TYPE_CHECKING

import numpy as np
from django.core.cache import cache
from numpy.typing import NDArray

if TYPE_CHECKING:
    from .models import Monitor


class Status(str, Enum):
    UNKNOWN = "U"
    ERROR = "E"
    SUCCESS = "S"


def init_storage(initial_value: Status = Status.UNKNOWN) -> NDArray[np.str_]:
    return np.array([initial_value.value for _ in range(1440)], dtype="U1")


class DataStore:
    def __init__(self, monitor: "Monitor", prefix: str = "ds") -> None:
        self.monitor = monitor
        self.prefix: str = prefix

    def get_all_entries(self, timestamp: datetime) -> list[Status]:
        return self._get_store_for_date(timestamp.strftime("%Y-%m-%d")).tolist()

    def get_hour_entries(self, timestamp: datetime, hour: int = None) -> list[Status]:
        data = self._get_store_for_date(timestamp.strftime("%Y-%m-%d"))
        if not hour:
            hour = timestamp.hour
        start_index = hour * 60
        end_index = start_index + 60
        return data[start_index:end_index].tolist()

    def _get_store_for_date(self, sig: str) -> NDArray[np.str_]:
        stored = cache.get(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}")
        if stored:
            data = np.frombuffer(stored, dtype="U1").copy()
        else:
            data = init_storage(Status.UNKNOWN)
            cache.set(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}", data.tobytes(), timeout=86400)
        return data

    def _store(self, timestamp: datetime, status: Status) -> int:
        sig = timestamp.strftime("%Y-%m-%d")
        data = self._get_store_for_date(sig)
        absolute_minute = timestamp.hour * 60 + timestamp.minute
        data[absolute_minute] = status.value
        cache.set(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}", data.tobytes(), timeout=86400)
        return absolute_minute

    def store_error(self, timestamp: datetime) -> int:
        return self._store(timestamp, Status.ERROR)

    def store_success(self, timestamp: datetime) -> int:
        return self._store(timestamp, Status.SUCCESS)

    def archive(self, timestamp: datetime) -> None:
        from birder.models import DataHistory

        for i in range(1, 8):
            day = timestamp - timedelta(days=i)
            sig = day.strftime("%Y-%m-%d")
            stored = self._get_store_for_date(sig)
            if stored.any():
                DataHistory.objects.update_or_create(monitor=self.monitor, date=day, defaults={"data": stored})
                cache.delete(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}")
