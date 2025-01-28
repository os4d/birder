import datetime

MINUTE = 1
MINUTES_30 = 30
MINUTES_PER_HOUR = 60
MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR


def get_start_of_day(dt: datetime) -> datetime:
    return dt.replace(hour=0, minute=0, second=0, microsecond=0)


def format_minutes_as_time(minute: int) -> str:
    if minute < 1 or minute > MINUTES_PER_DAY:
        raise ValueError(f"{minute} is not a valid minute")

    hour = (minute - 1) // MINUTES_PER_HOUR
    minute_of_hour = (minute - 1) % MINUTES_PER_HOUR
    return f"{hour:02}:{minute_of_hour:02}"
