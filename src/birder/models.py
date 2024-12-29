import sys
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


class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username


class Monitor(models.Model):
    class Verbosity(models.IntegerChoices):
        NONE = (0, "None")
        SUCCESS = (1, "ERRROR")
        FAIL = (2, "ERRROR")
        ERROR = (3, "ERRROR")
        FULL = (4, "FULL")

    strategy: "BaseCheck"
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    position = models.PositiveIntegerField(default=0)
    description = models.CharField(max_length=1000)

    strategy = StrategyField(registry=registry)
    configuration = models.JSONField(default=dict)

    data = models.BinaryField(blank=True, null=True, default=None)
    data_file = models.FileField(blank=True, null=True, default=None)
    token = models.UUIDField(default=uuid.uuid4, editable=False)

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

    def trigger(self) -> bool:
        from birder.ws.utils import notify_ui

        try:
            result = self.strategy.check(True)
            if (
                self.verbosity == self.Verbosity.FULL
                or (result and self.verbosity == self.Verbosity.SUCCESS)
                or (not result and self.verbosity == self.Verbosity.FAIL)
            ):
                LogCheck.objects.create(monitor=self, status=result, result="")
        except CheckError as e:
            if self.verbosity in [self.Verbosity.ERROR, self.Verbosity.FULL]:
                t, value, tb = sys.exc_info()
                message = f"""{t}: {value}

{''.join(traceback.format_exception(e))}
"""
                LogCheck.objects.create(monitor=self, status=False, result=message)
            result = False
        cache.set(f"monitor:{self.pk}", result, timeout=86400)
        cache.set(f"monitor:check{self.pk}", timezone.now().strftime("%Y %b %d %H:%M"), timeout=86400)
        notify_ui("update", self)
        return result

    @property
    def status(self) -> bool:
        return cache.get(f"monitor:{self.pk}")

    @property
    def last_check(self) -> bool:
        return cache.get(f"monitor:check{self.pk}")

    def regenerate_token(self, save: bool = True) -> None:
        self.token = uuid.uuid4()
        if save:
            self.save()


class LogCheck(models.Model):
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name="logs")
    status = models.BooleanField(default=None, null=True)
    timestamp = models.DateTimeField(default=timezone.now)
    result = models.TextField(blank=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self) -> str:
        return self.monitor.name
