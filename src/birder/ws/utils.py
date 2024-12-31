import logging
from typing import Any

import channels.layers
from asgiref.sync import async_to_sync
from django.core.cache import cache
from strategy_field.utils import fqn


from .consumers import GROUP

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from birder.models import Monitor

logger = logging.getLogger(__name__)


def notify_ui(msg: str, *args: Any, **kwargs: Any) -> None:
    if msg == "ping":
        _ping()
    elif msg == "update":
        _update(*args, **kwargs)
    elif msg == "refresh":
        _refresh(**kwargs)


def _refresh(monitor: "Monitor", crud: str) -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {
            "type": "send.json",
            "reason": "update",
            "crud": crud,
        },
    )


def _ping() -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {"type": "send.json", "reason": "ping", "ts": cache.get("system:last_check")},
    )


def _update(monitor: "Monitor") -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {
            "type": "send.json",
            "reason": "status",
            "content": {
                "id": monitor.id,
                "status": monitor.status,
                "name": monitor.name,
                "last_check": monitor.last_check,
                "last_error": monitor.last_error,
                "last_success": monitor.last_success,
                "fqn": fqn(monitor.strategy),
                "icon": monitor.icon,
                "failures": monitor.failures,
            },
        },
    )
