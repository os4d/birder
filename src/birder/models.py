import traceback
import uuid
from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser, Group
from django.core.cache import cache
from django.db import models
from django.db.models.functions.text import Lower
from django.utils import timezone
from django_stubs_ext.db.models import TypedModelMeta
from strategy_field.fields import StrategyField

from birder.checks.registry import registry
from birder.exceptions import CheckError
from birder.utils.security import get_random_token

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
    notes = models.TextField(blank=True, help_text="short description do display in the monitor detail page")

    strategy = StrategyField(registry=registry)
    configuration = models.JSONField(default=dict, help_text="Checker configuration")

    data = models.BinaryField(blank=True, null=True, default=None)
    data_file = models.FileField(blank=True, null=True, default=None)

    token = models.CharField(default=get_random_token,
                             null=True,
                             blank=True,
                             max_length=255,
                             editable=False, help_text="Token to use for external API invocation")

    active = models.BooleanField(default=True)
    grace_period = models.PositiveIntegerField(default=5)
    verbosity = models.IntegerField(choices=Verbosity.choices, default=Verbosity.NONE)

    class Meta(TypedModelMeta):
        ordering = ("name",)
        constraints = [
            models.UniqueConstraint("project", Lower("name"), name="unique_project_monitor_name"),
        ]

    def __str__(self) -> str:
        return self.name

    def count(self, result: bool) -> None:
        cache.set(f"monitor:{self.pk}", result, timeout=86400)
        cache.set(f"monitor:check{self.pk}", timezone.now().strftime("%Y %b %d %H:%M"), timeout=86400)

    def log(self, status: bool, exc: Exception | None = None) -> None:
        if exc:
            message = f"""{exc.__class__.__name__}: {exc}

            {''.join(traceback.format_tb(exc.__traceback__))}
            """
            LogCheck.objects.create(monitor=self, status=status, payload=message)
        else:
            LogCheck.objects.create(monitor=self, status=status)

    def trigger(self) -> bool:
        from birder.ws.utils import notify_ui

        try:
            result = self.strategy.check(True)
            if (
                self.verbosity == self.Verbosity.FULL
                or (result and self.verbosity == self.Verbosity.SUCCESS)
                or (not result and self.verbosity == self.Verbosity.FAIL)
            ):
                self.log(True)
        except CheckError as e:
            if self.verbosity in [self.Verbosity.ERROR, self.Verbosity.FULL]:
                self.log(False, e)
            result = False

        notify_ui("update", self)
        self.count(result)
        return result

    @property
    def status(self) -> bool:
        return cache.get(f"monitor:{self.pk}")

    @property
    def last_check(self) -> bool:
        return cache.get(f"monitor:check{self.pk}")

    def regenerate_token(self, save: bool = True) -> None:
        self.token = get_random_token()
        if save:
            self.save()


class LogCheck(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="logs")
    status = models.BooleanField(default=None, null=True)
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
