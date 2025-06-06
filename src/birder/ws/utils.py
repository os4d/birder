import json
import logging
from datetime import date, datetime, time
from json import JSONEncoder as JSONEncoder_
from typing import TYPE_CHECKING, Any

import channels.layers
from asgiref.sync import async_to_sync
from constance import config
from strategy_field.utils import fqn

from .consumers import GROUP

if TYPE_CHECKING:
    from birder.models import Monitor

logger = logging.getLogger(__name__)


def notify_ui(msg: str, *args: Any, **kwargs: Any) -> None:
    if msg == "ping":
        _ping(kwargs["timestamp"])
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


def _ping(timestamp: str) -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {"type": "send.json", "reason": "ping", "ts": timestamp},
    )


def _update(monitor: "Monitor") -> None:
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        GROUP,
        {"type": "send.json", "reason": "status", "monitor": json.loads(json.dumps(monitor, cls=JSONEncoder))},
    )


class JSONEncoder(JSONEncoder_):
    def default(self, obj: Any) -> Any:
        from birder.models import Monitor

        if isinstance(obj, Monitor):
            return {
                "id": obj.id,
                "project": {
                    "id": obj.project.id,
                    "data": json.loads(json.dumps(obj.project.data, cls=JSONEncoder)),
                    "status": json.loads(json.dumps(obj.project.status, cls=JSONEncoder)),
                },
                "url": obj.get_absolute_url(),
                "status": obj.status,
                "active": obj.active,
                "name": obj.name,
                "last_check": json.loads(json.dumps(obj.last_timestamp_check, cls=JSONEncoder)),
                "last_error": json.loads(json.dumps(obj.last_timestamp_failure, cls=JSONEncoder)),
                "last_success": json.loads(json.dumps(obj.last_timestamp_success, cls=JSONEncoder)),
                "fqn": fqn(obj.strategy),
                "icon": obj.icon,
                "failures": obj.failures,
                "thresholds": [obj.warn_threshold, obj.err_threshold],
            }
        if isinstance(obj, datetime):
            return obj.strftime(config.DATETIME_FORMAT)
        if isinstance(obj, date):
            return obj.strftime(config.DATE_FORMAT)
        if isinstance(obj, time):
            return obj.strftime(config.TIME_FORMAT)
        return json.JSONEncoder.default(self, obj)
