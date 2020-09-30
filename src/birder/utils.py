from datetime import datetime, timedelta

from pytz import timezone

TIME_ZONE = timezone('utc')


def tz_now():
    # return datetime().replace(tzinfo=TIME_ZONE)
    return datetime.utcnow().replace(tzinfo=TIME_ZONE)


def hour_rounder(t):
    # Rounds to nearest hour by adding a timedelta hour if minute >= 30
    return t.replace(second=0, microsecond=0, minute=0, hour=t.hour) + timedelta(hours=1)


def roundTime(dt=None, roundTo=60):
    """Round a datetime object to any time lapse in seconds
    dt : datetime.datetime object, default now.
    roundTo : Closest number of seconds to round to, default 1 minute.
    Author: Thierry Husson 2012 - Use it as you want but don't blame me.
    """
    if dt is None:
        dt = datetime.now().replace(tzinfo=TIME_ZONE)
    seconds = (dt.replace(tzinfo=None) - dt.min).seconds
    rounding = (seconds + roundTo / 2) // roundTo * roundTo
    return dt + timedelta(0, rounding - seconds, -dt.microsecond)
