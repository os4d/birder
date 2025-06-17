import factory
import pytz
from django.utils import timezone

from birder.models import Deadline

from .base import AutoRegisterModelFactory
from .monitor import MonitorFactory


class DeadlineFactory(AutoRegisterModelFactory):
    monitor = factory.SubFactory(MonitorFactory)
    start = factory.Faker("date_time_between_dates", datetime_start="-1y", datetime_end=timezone.now(), tzinfo=pytz.UTC)
    recurrences = "RRULE:FREQ=YEARLY;BYMONTH=1"

    class Meta:
        model = Deadline
