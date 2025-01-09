import json
import logging
from datetime import date, datetime
from json import JSONEncoder as JSONEncoder_
from typing import TYPE_CHECKING, Any

import channels.layers
from asgiref.sync import async_to_sync
from django.core.cache import cache
from django.urls.base import reverse
from strategy_field.utils import fqn

from .consumers import GROUP

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


class JSONEncoder(JSONEncoder_):
    def default(self, obj: Any) -> Any:
        from birder.models import Monitor

        if isinstance(obj, Monitor):
            return {
                "id": obj.id,
                "url": reverse("monitor-detail", args=[obj.pk]),
                "status": obj.status,
                "active": obj.active,
                "name": obj.name,
                "last_check": json.loads(json.dumps(obj.last_check, cls=JSONEncoder)),
                "last_error": json.loads(json.dumps(obj.last_error, cls=JSONEncoder)),
                "last_success": json.loads(json.dumps(obj.last_success, cls=JSONEncoder)),
                "fqn": fqn(obj.strategy),
                "icon": obj.icon,
                "failures": obj.failures,
            }
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, date):
            return obj.strftime("%Y-%m-%d")
        return json.JSONEncoder.default(self, obj)


def _update(monitor: "Monitor") -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {"type": "send.json", "reason": "status", "monitor": json.loads(json.dumps(monitor, cls=JSONEncoder))},
    )
