from collections.abc import Iterable
from datetime import date, datetime
from enum import StrEnum
from functools import cached_property
from typing import TYPE_CHECKING, Any

import recurrence.fields
from constance import config
from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.base import ModelBase
from django.db.models.functions.text import Lower
from django.templatetags.static import static
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext as _
from django_stubs_ext.db.models import TypedModelMeta
from encrypted_fields import EncryptedJSONField
from redis import Redis
from strategy_field.fields import StrategyField
from timezone_field import TimeZoneField

from birder.checks.base import BaseCheck
from birder.checks.registry import registry
from birder.exceptions import CheckError
from birder.signals import monitor_update
from birder.utils.security import get_random_token
from birder.ws.utils import notify_ui

KEY_ERROR_COUNT = "{0}:monitor:{1.pk}:count"
KEY_STATUS = "{0}:monitor:{1.pk}:status"
KEY_LAST_CHECK = "{0}:monitor:{1.pk}:last_check"
KEY_LAST_SUCCESS = "{0}:monitor:{1.pk}:last_success"
KEY_LAST_FAILURE = "{0}:monitor:{1.pk}:last_failure"
KEY_SYSTEM_CHECK = "{0}:system:last_check"
KEY_PROGRAM_STATUS = "{0}:program:{1.pk}:program_status"

KEY_PROGRAM_CHECKS = "{0}:program:{1.pk}:checks"

redis = Redis.from_url(settings.CACHE_URL)

if TYPE_CHECKING:
    from django.db.models.manager import _T


def get_cache_key(pattern: str, *args: Any) -> str:
    return pattern.format(config.CACHE_PREFIX, *args)


class User(AbstractUser):
    time_zone = TimeZoneField(default="UTC")

    class Meta:
        permissions = (("can_access_console", "Can Access Console"),)


class Project(models.Model):
    environments: "models.ManyToManyField[Environment, Environment]"
    name = models.CharField(max_length=255, unique=True)
    public = models.BooleanField(default=False)
    bitcaster_url = models.URLField(blank=True, help_text="The URL to the Bitcaster notification endpoint.")
    environments = models.ManyToManyField("Environment", related_name="projects", blank=False)
    icon = models.CharField(blank=True, default="", max_length=255)
    default_environment = models.ForeignKey("Environment", blank=True, null=True, on_delete=models.PROTECT)  # type: ignore[misc]

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(Lower("name"), name="unique_program_name"),
        ]

    def __str__(self) -> str:
        return self.name

    def save(
        self,
        *,
        force_insert: bool | tuple[ModelBase, ...] = False,
        force_update: bool = False,
        using: str | None = None,
        update_fields: Iterable[str] | None = None,
    ) -> None:
        if self.pk and not self.default_environment:
            self.default_environment = self.environments.first()
        super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)

    def get_absolute_url(self) -> str:
        env = self.default_environment if self.default_environment else self.environments.first()
        return reverse("project-env", kwargs={"project_id": self.pk, "env": env.name})

    def clean(self) -> None:
        if (
            self.pk
            and self.default_environment
            and not self.environments.filter(pk=self.default_environment.pk).exists()
        ):
            raise ValidationError(_("Default environment must be one of selected environment"))
        super().clean()

    @cached_property
    def data(self) -> dict:
        v = redis.hgetall(get_cache_key(KEY_PROGRAM_CHECKS, self))
        return {k.decode("utf-8"): v.decode("utf-8") for k, v in v.items()}

    @cached_property
    def failures(self) -> int:
        return len([k for (k, v) in self.data.items() if v == "ko"])

    @cached_property
    def warnings(self) -> int:
        return len([k for (k, v) in self.data.items() if v == "warn"])

    @cached_property
    def success(self) -> int:
        return len([k for (k, v) in self.data.items() if v == "ok"])

    @property
    def status(self) -> str:
        values = self.data.values()
        if Monitor.Status.FAIL in values:
            return Monitor.Status.FAIL
        if Monitor.Status.WARN in values:
            return Monitor.Status.WARN
        if Monitor.Status.SUCCESS in values:
            return Monitor.Status.SUCCESS
        return Monitor.Status.UNKNOWN


class Environment(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(Lower("name"), name="unique_env_name"),
        ]

    def __str__(self) -> str:
        return self.name


class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username


class MonitorQuerySet(models.query.QuerySet):
    pass


class MonitorManager(models.Manager):
    queryset_class = MonitorQuerySet

    def get_queryset(self) -> "models.QuerySet[_T]":
        return super().get_queryset().select_related("environment", "project")


class Monitor(models.Model):
    class Status(StrEnum):
        SUCCESS = "ok"
        WARN = "warn"
        FAIL = "ko"
        UNKNOWN = "question"

    strategy: "BaseCheck"
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    environment = models.ForeignKey(Environment, on_delete=models.SET_NULL, null=True, blank=False)  # type: ignore[misc]
    name = models.CharField(max_length=255, unique=True)
    position = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, help_text="short description to display in the monitor detail page")
    notes = models.TextField(
        blank=True, help_text="Notes about the monitor. Hidden by default, Requires special permission."
    )
    custom_icon = models.CharField(
        blank=True, default="", max_length=255, help_text="The URL to the custom icon endpoint."
    )
    strategy = StrategyField(registry=registry)
    configuration = EncryptedJSONField(default=dict, help_text="Checker configuration")
    data = models.BinaryField(blank=True, null=True, default=None)  # type: ignore[misc]
    data_file = models.FileField(blank=True, null=True, default=None)

    token = models.CharField(
        default=get_random_token,
        blank=True,
        max_length=1000,
        editable=False,
        help_text="Token to use for external API invocation",
    )

    active = models.BooleanField(default=True)
    warn_threshold = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(0), MaxValueValidator(9)],
        help_text="how many consecutive failures "
        "(or missing notifications in case or remote invocation) produce a warning",
    )
    err_threshold = models.PositiveIntegerField(
        default=5,
        validators=[MinValueValidator(0), MaxValueValidator(9)],
        help_text="how many consecutive failures "
        "(or missing notifications in case or remote invocation) produce an error",
    )

    objects = MonitorManager()

    class Meta(TypedModelMeta):
        ordering = (
            "project__name",
            "name",
        )
        constraints = [
            models.UniqueConstraint("project", Lower("name"), name="unique_project_monitor_name"),
        ]

        permissions = (("can_see_notes", "Can see monitor private notes"),)

    def __str__(self) -> str:
        return f"{self.project.name}/{self.name} ({self.environment.name})"

    def get_absolute_url(self) -> str:
        return reverse(
            "monitor-detail", kwargs={"project_id": self.project.pk, "env": self.environment.name, "pk": self.pk}
        )

    @property
    def icon(self) -> str:
        if self.custom_icon and self.custom_icon.startswith("http"):
            return self.custom_icon
        if self.custom_icon:
            return static(f"images/icons/{self.custom_icon}")
        if self.strategy:
            return static(f"images/icons/{self.strategy.icon}")
        return static("images/question.svg")

    def store_error(self, timestamp: datetime) -> None:
        """Set corresponding minute of the day's bit."""
        from .db import DataStore

        ds = DataStore(self)
        ds.store_error(timestamp)

    def reset_current_errors(self) -> int:
        cache.set(get_cache_key(KEY_ERROR_COUNT, self), 0, timeout=86400)
        return 0

    def incr_current_errors(self) -> int:
        try:
            new_value = cache.incr(get_cache_key(KEY_ERROR_COUNT, self), 1)
        except ValueError:
            new_value = 1
            cache.set(get_cache_key(KEY_ERROR_COUNT, self), new_value, timeout=86400)
        return new_value

    def get(self) -> None:
        self.store_last_timestamp_success()
        self.reset_current_errors()
        timestamp = datetime.now()
        self.store_error(timestamp)

    def _check_remote_status(self, timestamp: datetime) -> bool:
        # check remote system
        try:
            result = self.strategy.check(raise_error=True)
        except CheckError:
            result = False

        if result:
            self.reset_current_errors()
            self.store_last_timestamp_success()
            st = Monitor.Status.SUCCESS
        else:
            self.store_error(timestamp)
            self.store_last_timestamp_failure()
            error_count = self.incr_current_errors()
            if error_count >= self.err_threshold:
                st = Monitor.Status.FAIL
            elif error_count >= self.warn_threshold:
                st = Monitor.Status.WARN
            else:
                st = Monitor.Status.SUCCESS
        cache.set(get_cache_key(KEY_STATUS, self), st, timeout=86400)

        key = get_cache_key(KEY_PROGRAM_CHECKS, self.project)
        redis.hset(key, str(self.pk), st)
        return result

    def _check_remote_trigger(self, timestamp: datetime) -> bool:
        # check last time remote system pinged Birder

        if self.last_timestamp_success:
            time_difference = timestamp - self.last_timestamp_success
            offset = int(time_difference.total_seconds() // 60)
            if offset:
                self.incr_current_errors()
                self.store_last_timestamp_failure()
                result = False
            else:
                self.store_last_timestamp_success()
                result = True
        else:
            self.incr_current_errors()
            self.store_last_timestamp_failure()
            result = False

        return result

    def run(self, timestamp: datetime | None = None) -> bool:
        if not timestamp:
            timestamp = datetime.now()
        self.store_last_timestamp_check()
        if self.strategy.mode == BaseCheck.LOCAL_TRIGGER:
            result = self._check_remote_status(timestamp)
        else:
            result = self._check_remote_trigger(timestamp)

        notify_ui("update", self)
        monitor_update.send(sender=Monitor, instance=self, result=result, timestamp=timestamp)
        return result

    @property
    def counters(self) -> tuple[int, int, int]:
        return self.failures, self.warn_threshold, self.err_threshold

    @property
    def status(self) -> str:
        error_count = self.failures
        if error_count >= self.err_threshold:
            st = Monitor.Status.FAIL
        elif error_count >= self.warn_threshold:
            st = Monitor.Status.WARN
        elif not self.last_timestamp_check:
            st = Monitor.Status.UNKNOWN
        else:
            st = Monitor.Status.SUCCESS
        return st

    @property
    def failures(self) -> int:
        return cache.get(get_cache_key(KEY_ERROR_COUNT, self)) or 0

    def store_last_timestamp_check(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime(config.DATETIME_FORMAT)
        return cache.set(get_cache_key(KEY_LAST_CHECK, self), ts, timeout=86400)

    def store_last_timestamp_failure(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime(config.DATETIME_FORMAT)
        return cache.set(get_cache_key(KEY_LAST_FAILURE, self), ts, timeout=86400)

    def store_last_timestamp_success(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime(config.DATETIME_FORMAT)
        return cache.set(get_cache_key(KEY_LAST_SUCCESS, self), ts, timeout=86400)

    @property
    def last_timestamp_check(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(get_cache_key(KEY_LAST_CHECK, self)), config.DATETIME_FORMAT)
        except (ValueError, TypeError):
            return None

    @property
    def last_timestamp_success(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(get_cache_key(KEY_LAST_SUCCESS, self)), config.DATETIME_FORMAT)
        except (ValueError, TypeError):
            return None

    @property
    def last_timestamp_failure(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(get_cache_key(KEY_LAST_FAILURE, self)), config.DATETIME_FORMAT)
        except (ValueError, TypeError):
            return None

    def regenerate_token(self, save: bool = True) -> None:
        self.token = get_random_token()
        if save:
            self.save()


class DataHistory(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="datalog")
    date = models.DateField(auto_now_add=False)
    data = models.BinaryField(default=None, null=True)  # type: ignore[misc]

    class Meta:
        ordering = ["-date"]
        constraints = [
            models.UniqueConstraint("monitor", "date", name="unique_data_day_monitor"),
        ]

    def __str__(self) -> str:
        return f"{self.pk}"


class LogCheck(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="logs")
    status = models.CharField(max_length=255, default="")
    timestamp = models.DateTimeField(default=timezone.now)
    payload = models.TextField(blank=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self) -> str:
        return self.monitor.name


class Deadline(models.Model):
    title = models.CharField(max_length=100)
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="deadlines")
    description = models.TextField(blank=True)
    start = models.DateField(default=timezone.now, help_text="Start date")
    end = models.DateField(blank=True, null=True)  # type: ignore[misc]
    time = models.TimeField(blank=True, null=True, help_text="The time at which the activity/task happpen")  # type: ignore[misc]

    recurrences = recurrence.fields.RecurrenceField()
    warn_threshold = models.IntegerField(default=7, help_text="How many days before the deadline should warn monitor")
    alarm_threshold = models.IntegerField(default=1, help_text="How many days before the deadline should alarm monitor")

    class Meta:
        ordering = ["-start"]

    def __str__(self) -> str:
        return self.title

    @cached_property
    def next(self) -> date:
        return self.recurrences.after(datetime.today(), inc=True).date()

    @property
    def is_warn(self) -> bool:
        warn_offset = (datetime.today() - relativedelta(days=self.warn_threshold)).date()
        return self.next > warn_offset

    @property
    def is_expiring(self) -> bool:
        alarm_offset = (datetime.today() - relativedelta(days=self.warn_threshold)).date()
        return self.next > alarm_offset
