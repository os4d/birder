from datetime import datetime
from typing import TYPE_CHECKING

from ..db import DataStore, Status
from .dates import format_minutes_as_time, get_start_of_day

if TYPE_CHECKING:
    from ..models import Monitor


def get_data_for_date(
    monitor: "Monitor", date: datetime | None = None, group_by: int = 5
) -> tuple[list[str], list[str]]:
    date = date or datetime.now()
    now = get_start_of_day(date)
    bits = DataStore(monitor).get_all_entries(now)

    data = []
    for i in range(0, len(bits), group_by):
        span = sum([1 for __ in bits[i : i + group_by] if __ == Status.ERROR])
        data.append(span)
    labels = [format_minutes_as_time(i) for i in list(range(1, len(bits) + 1, group_by))]

    return data, labels
