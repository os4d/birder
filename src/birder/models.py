import uuid
from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser, Group
from django.core.cache import cache
from django.db import models
from django.db.models.functions.text import Lower
from django_stubs_ext.db.models import TypedModelMeta
from strategy_field.fields import StrategyField

from birder.checks.registry import registry

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
    strategy: "BaseCheck"
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    strategy = StrategyField(registry=registry)
    configuration = models.JSONField(default=dict)

    data = models.BinaryField(blank=True, null=True, default=None)
    data_file = models.FileField(blank=True, null=True, default=None)
    token = models.UUIDField(default=uuid.uuid4, editable=False)

    active = models.BooleanField(default=True)
    grace_period = models.PositiveIntegerField(default=5)

    class Meta(TypedModelMeta):
        constraints = [
            models.UniqueConstraint("project", Lower("name"), name="unique_project_monitor_name"),
        ]

    def __str__(self) -> str:
        return self.name

    def trigger(self) -> bool:
        result = self.strategy.check()
        cache.set(self.pk, result)
        return result

    @property
    def status(self) -> bool:
        return cache.get(self.pk)

    def regenerate_token(self, save: bool = True) -> None:
        self.token = uuid.uuid4()
        if save:
            self.save()
