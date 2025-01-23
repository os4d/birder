from datetime import datetime
from typing import Any

from django.db.models.base import Model
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from birder.models import Monitor
from birder.signals import monitor_update
from birder.ws.utils import notify_ui


# method for updating
@receiver(post_save, sender=Monitor, dispatch_uid="update_monitor")
def update_monitor(sender: type[Model], instance: Monitor, created: bool, **kwargs: Any) -> None:
    if created:
        notify_ui("refresh", monitor=instance, crud="add")


# method for updating
@receiver(post_delete, sender=Monitor, dispatch_uid="delete_monitor")
def delete_monitor(sender: type[Model], instance: Monitor, **kwargs: Any) -> None:
    notify_ui("refresh", monitor=instance, crud="delete")


# method for updating
@receiver(monitor_update, sender=Monitor, dispatch_uid="monitor_check")
def monitor_check(sender: type[Model], instance: Monitor, result: bool, timestamp: datetime, **kwargs: Any) -> None:
    pass
