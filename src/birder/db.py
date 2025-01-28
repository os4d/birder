from datetime import datetime, timedelta

from bitarray._bitarray import bitarray
from django.core.cache import cache

from birder.models import DataHistory, Monitor


def init_bitaarray(initial_value: int = 0) -> bitarray:
    bt = bitarray(1440)
    bt.setall(initial_value)
    return bt


class DataStore:
    def __init__(self, monitor: Monitor, prefix: str = "ds") -> None:
        self.monitor: Monitor = monitor
        self.prefix: str = prefix

    def get_all_entries(self, timestamp: datetime) -> bitarray:
        return self._get_store_for_date(timestamp.strftime("%Y-%m-%d"))

    def get_hour_entries(self, timestamp: datetime, hour: int = None) -> bitarray:
        data = self._get_store_for_date(timestamp.strftime("%Y-%m-%d"))
        if not hour:
            hour = timestamp.hour
        start_index = hour * 60
        end_index = start_index + 60
        return data[start_index:end_index]

    def _get_store_for_date(self, sig: str) -> bitarray:
        stored = cache.get(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}")
        if stored:
            data = bitarray()
            data.frombytes(stored)
        else:
            data = init_bitaarray(0)
        return data

    def store_error(self, timestamp: datetime) -> int:
        sig = timestamp.strftime("%Y-%m-%d")
        data = self._get_store_for_date(sig)
        absolute_minute = timestamp.hour * 60 + timestamp.minute
        data[absolute_minute] = 1
        cache.set(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}", data.tobytes(), timeout=86400)
        return absolute_minute

    def archive(self, timestamp: datetime) -> None:
        for i in range(1, 8):
            day = timestamp - timedelta(days=i)
            sig = day.strftime("%Y-%m-%d")
            stored = self._get_store_for_date(sig)
            if stored:
                DataHistory.objects.update_or_create(monitor=self.monitor, date=day, defaults={"data": stored})
                cache.delete(f"{self.prefix}:monitor:{self.monitor.pk}:data:{sig}")
