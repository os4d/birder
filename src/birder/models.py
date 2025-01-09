import traceback
from datetime import datetime
from functools import cached_property

from django.contrib.auth.models import AbstractUser, Group
from django.core.cache import cache
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.functions.text import Lower
from django.templatetags.static import static
from django.utils import timezone
from django_stubs_ext.db.models import TypedModelMeta
from strategy_field.fields import StrategyField
from timezone_field import TimeZoneField

from birder.checks.base import BaseCheck
from birder.checks.registry import registry
from birder.exceptions import CheckError
from birder.utils.security import get_random_token
from birder.ws.utils import notify_ui

KEY_ERROR_COUNT = "monitor:{0.pk}:count"
KEY_STATUS = "monitor:{0.pk}:status"
KEY_LAST_CHECK = "monitor:{0.pk}:last_check"
KEY_LAST_SUCCESS = "monitor:{0.pk}:last_success"
KEY_LAST_FAILURE = "monitor:{0.pk}:last_failure"


class User(AbstractUser):
    time_zone = TimeZoneField(default="UTC")


class Project(models.Model):
    name = models.CharField(max_length=255, unique=True)
    bitcaster_url = models.URLField(blank=True, help_text="The URL to the Bitcaster notification endpoint.")

    class Meta:
        constraints = [
            models.UniqueConstraint(Lower("name"), name="unique_program_name"),
        ]

    def __str__(self) -> str:
        return self.name


class Environment(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
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


class Monitor(models.Model):
    SUCCESS = "ok"
    WARN = "warn"
    FAIL = "ko"

    class Verbosity(models.IntegerChoices):
        NONE = (0, "None")
        SUCCESS = (1, "Success")
        FAIL = (2, "Failure")
        ERROR = (3, "Error")
        FULL = (4, "Full")

    strategy: "BaseCheck"
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    env = models.ForeignKey(Environment, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255, unique=True)
    position = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, help_text="short description  do display in the monitor detail page")
    notes = models.TextField(blank=True, help_text="Notes about the monitor. Only visible to Staff")
    custom_icon = models.CharField(blank=True, default="", max_length=255)

    strategy = StrategyField(registry=registry)
    configuration = models.JSONField(default=dict, help_text="Checker configuration")

    data = models.BinaryField(blank=True, null=True, default=None)
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
    verbosity = models.IntegerField(choices=Verbosity.choices, default=Verbosity.NONE)

    class Meta(TypedModelMeta):
        ordering = ("name",)
        constraints = [
            models.UniqueConstraint("project", Lower("name"), name="unique_project_monitor_name"),
        ]

    def __str__(self) -> str:
        return self.name

    @cached_property
    def icon(self) -> str:
        if self.custom_icon and self.custom_icon.startswith("http"):
            return self.custom_icon
        if self.custom_icon:
            return static(f"images/icons/{self.custom_icon}")
        return static(f"images/icons/{self.strategy.icon}")

    def store_ping(self, timestamp: datetime) -> None:
        """Set corresponding minute of the day's bit."""
        from .db import DataStore

        ds = DataStore(self)
        ds.store_value(timestamp)

    def process(self, result: bool) -> None:
        if self.strategy.mode == BaseCheck.MODE_ACTIVE:
            self.process_active(result)
        else:
            self.process_passive()

    def get_current_errors(self) -> int:
        return cache.get(KEY_ERROR_COUNT.format(self)) or 0

    def reset_current_errors(self) -> int:
        cache.set(KEY_ERROR_COUNT.format(self), 0)
        return 0

    def incr_current_errors(self) -> int:
        try:
            cache.incr(KEY_ERROR_COUNT.format(self), 1)
        except ValueError:
            cache.set(KEY_ERROR_COUNT.format(self), 1)
        return self.get_current_errors()

    def check_status(self, error_count: int | None = None) -> str:
        if error_count is None:
            error_count = self.get_current_errors()
        if error_count >= self.err_threshold:
            st = Monitor.FAIL
        elif error_count >= self.warn_threshold:
            st = Monitor.WARN
        else:
            st = Monitor.SUCCESS
        cache.set(KEY_STATUS.format(self), st, timeout=86400)
        return st

    def process_passive(self) -> None:
        timestamp = datetime.now()
        self.reset_current_errors()
        self.store_ping(timestamp)
        self.mark_ts_success()
        self.mark_ts_check()
        self.check_status(0)
        notify_ui("update", self)

    def process_active(self, result: bool) -> None:
        timestamp = datetime.now()
        self.mark_ts_check()

        if result:
            current = self.reset_current_errors()
            self.mark_ts_success()
        else:
            self.mark_ts_failure()
            self.store_ping(timestamp)
            current = self.incr_current_errors()
        self.check_status(current)
        notify_ui("update", self)

    def log(self, status: str, exc: Exception | None = None) -> None:
        if exc:
            message = f"""{exc.__class__.__name__}: {exc}

            {"".join(traceback.format_tb(exc.__traceback__))}
            """
            LogCheck.objects.create(monitor=self, status=status, payload=message)
        else:
            LogCheck.objects.create(monitor=self, status=status)

    def trigger(self) -> bool:
        try:
            result = self.strategy.check(True)
            if (
                self.verbosity == self.Verbosity.FULL
                or (result and self.verbosity == self.Verbosity.SUCCESS)
                or (not result and self.verbosity == self.Verbosity.FAIL)
            ):
                self.log(Monitor.SUCCESS)
        except CheckError as e:
            if self.verbosity in [self.Verbosity.ERROR, self.Verbosity.FULL]:
                self.log(Monitor.FAIL, e)
            result = False

        self.process(result)
        return result

    @property
    def status(self) -> bool:
        return cache.get(KEY_STATUS.format(self))

    @property
    def failures(self) -> bool:
        return cache.get(KEY_ERROR_COUNT.format(self)) or 0

    def mark_ts_check(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime("%Y %b %d %H:%M")
        return cache.set(KEY_LAST_CHECK.format(self), ts, timeout=86400)

    def mark_ts_failure(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime("%Y %b %d %H:%M")
        return cache.set(KEY_LAST_FAILURE.format(self), ts, timeout=86400)

    def mark_ts_success(self) -> None:
        timestamp = datetime.now()
        ts = timestamp.strftime("%Y %b %d %H:%M")
        return cache.set(KEY_LAST_SUCCESS.format(self), ts, timeout=86400)

    @property
    def last_check(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(KEY_LAST_CHECK.format(self)), "%Y %b %d %H:%M")
        except (ValueError, TypeError):
            return None

    @property
    def last_success(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(KEY_LAST_SUCCESS.format(self)), "%Y %b %d %H:%M")
        except (ValueError, TypeError):
            return None

    @property
    def last_error(self) -> datetime | None:
        try:
            return datetime.strptime(cache.get(KEY_LAST_FAILURE.format(self)), "%Y %b %d %H:%M")
        except (ValueError, TypeError):
            return None

    def regenerate_token(self, save: bool = True) -> None:
        self.token = get_random_token()
        if save:
            self.save()


class DataHistory(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="datalog")
    date = models.DateField(auto_now_add=True)
    data = models.BinaryField(default=None, null=True)

    class Meta:
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
