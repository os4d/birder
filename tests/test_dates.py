from datetime import datetime

import pytest

from birder.utils.dates import format_minutes_as_time, get_start_of_day


def test_get_start_of_day():
    assert get_start_of_day(datetime(2020, 1, 1, 18, 59)) == datetime(2020, 1, 1)


def test_format_minutes_as_time():
    assert format_minutes_as_time(1400) == "23:19"
    assert format_minutes_as_time(1) == "00:00"
    with pytest.raises(ValueError, match=r".*is not a valid minute"):
        format_minutes_as_time(0)
