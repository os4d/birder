from typing import Any

from django.db.models.base import Model
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from birder.models import Monitor
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
