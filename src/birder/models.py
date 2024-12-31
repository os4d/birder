import traceback
from functools import cached_property
from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser, Group
from django.core.cache import cache
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.functions.text import Lower
from django.templatetags.static import static
from django.utils import timezone
from django_stubs_ext.db.models import TypedModelMeta
from strategy_field.fields import StrategyField

from birder.checks.registry import registry
from birder.exceptions import CheckError
from birder.utils.security import get_random_token
from birder.ws.utils import notify_ui

if TYPE_CHECKING:
    from birder.checks.base import BaseCheck


class User(AbstractUser):
    pass


class Project(models.Model):
    name = models.CharField(max_length=255, unique=True)

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
    env = models.ForeignKey(Environment, on_delete=models.SET_NULL, null=True)
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
    warn_threshold = models.PositiveIntegerField(default=1,
                                                 validators=[MinValueValidator(0), MaxValueValidator(9)],
                                                 help_text="how many consecutive failures produce an error")
    err_threshold = models.PositiveIntegerField(default=5,
                                                validators=[MinValueValidator(0), MaxValueValidator(9)],
                                                help_text="how many consecutive failures produce an error")
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

    def process(self, result: bool) -> None:
        key = f"monitor:{self.pk}:count"
        ts = timezone.now().strftime("%Y %b %d %H:%M")
        cache.set(f"monitor:{self.pk}:last_check", ts, timeout=86400)

        if result:
            cache.set(key, 0)
            current = 0
            cache.set(f"monitor:{self.pk}:last_success", ts, timeout=86400)
        else:
            cache.set(f"monitor:{self.pk}:last_error", ts, timeout=86400)
            try:
                cache.incr(key, 1)
                current = cache.get(key)
            except ValueError:
                cache.set(key, 1)
                current = 1
        if current > self.err_threshold:
            st = Monitor.FAIL
        elif current > self.warn_threshold:
            st = Monitor.WARN
        else:
            st = Monitor.SUCCESS
        cache.set(f"monitor:{self.pk}", st, timeout=86400)
        cache.set(key, current  , timeout=86400)

        notify_ui("update", self)


    def log(self, status: str, exc: Exception | None = None) -> None:
        if exc:
            message = f"""{exc.__class__.__name__}: {exc}

            {''.join(traceback.format_tb(exc.__traceback__))}
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
        return cache.get(f"monitor:{self.pk}")

    @property
    def failures(self) -> bool:
        return cache.get(f"monitor:{self.pk}:count") or ""

    @property
    def last_check(self) -> bool:
        return cache.get(f"monitor:{self.pk}:last_check") or ""

    @property
    def last_success(self) -> bool:
        return cache.get(f"monitor:{self.pk}:last_success") or ""

    @property
    def last_error(self) -> bool:
        return cache.get(f"monitor:{self.pk}:last_error") or ""

    def regenerate_token(self, save: bool = True) -> None:
        self.token = get_random_token()
        if save:
            self.save()


class LogCheck(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="logs")
    status = models.CharField(default="", null=True)
    timestamp = models.DateTimeField(default=timezone.now)
    payload = models.TextField(blank=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self) -> str:
        return self.monitor.name


class Counter(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="counters")
    day = models.DateField()
    errors = models.PositiveIntegerField(default=0)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-day"]

    def __str__(self) -> str:
        return self.monitor.name
