import json
import logging
from datetime import date, datetime, time
from json import JSONEncoder as JSONEncoder_
from typing import TYPE_CHECKING, Any

import channels.layers
from asgiref.sync import async_to_sync
from constance import config
from strategy_field.utils import fqn

from ..utils.charts import get_data_for_date
from .consumers import GROUP, PUBLIC_GROUP

if TYPE_CHECKING:
    from birder.models import Monitor

logger = logging.getLogger(__name__)


def _broadcast(channel_layer: Any, group: str, message: dict) -> None:
    async_to_sync(channel_layer.group_send)(group, message)


def notify_ui(msg: str, *args: Any, **kwargs: Any) -> None:
    if msg == "ping":
        _ping(kwargs["timestamp"])
    elif msg == "update":
        _update(*args, **kwargs)
    elif msg == "refresh":
        _refresh(**kwargs)


def _refresh(monitor: "Monitor", crud: str) -> None:
    channel_layer = channels.layers.get_channel_layer()
    payload = {"type": "send.json", "reason": "update", "crud": crud}
    _broadcast(channel_layer, GROUP, payload)
    _broadcast(channel_layer, PUBLIC_GROUP, payload)


def _ping(timestamp: str) -> None:
    channel_layer = channels.layers.get_channel_layer()
    payload = {"type": "send.json", "reason": "ping", "ts": timestamp}
    _broadcast(channel_layer, GROUP, payload)
    _broadcast(channel_layer, PUBLIC_GROUP, payload)


def _encode_monitor(monitor: "Monitor", public: bool = False) -> dict[str, Any]:
    data, labels = get_data_for_date(monitor)
    result: dict[str, Any] = {
        "id": monitor.id,
        "project": {
            "id": monitor.project.id,
            "name": monitor.project.name,
            "environment": monitor.environment.name,
        },
        "url": monitor.get_absolute_url(),
        "status": monitor.status,
        "active": monitor.active,
        "name": monitor.name,
        "icon": monitor.icon,
    }
    if not public:
        result["project"]["data"] = json.loads(json.dumps(monitor.project.overview(), cls=JSONEncoder))
        result["project"]["status"] = json.loads(json.dumps(monitor.project.status, cls=JSONEncoder))
        result["last_check"] = json.loads(json.dumps(monitor.last_timestamp_check, cls=JSONEncoder))
        result["last_error"] = json.loads(json.dumps(monitor.last_timestamp_failure, cls=JSONEncoder))
        result["last_success"] = json.loads(json.dumps(monitor.last_timestamp_success, cls=JSONEncoder))
        result["fqn"] = fqn(monitor.strategy)
        result["failures"] = monitor.failures
        result["thresholds"] = [monitor.warn_threshold, monitor.err_threshold]
        result["data"] = data
        result["labels"] = labels
    return result


def _update(monitor: "Monitor") -> None:
    from birder.models import Monitor as MonitorModel

    channel_layer = channels.layers.get_channel_layer()
    if isinstance(monitor, MonitorModel):
        _broadcast(
            channel_layer,
            GROUP,
            {
                "type": "send.json",
                "reason": "status",
                "monitor": _encode_monitor(monitor),
            },
        )
        if monitor.project.public:
            _broadcast(
                channel_layer,
                PUBLIC_GROUP,
                {
                    "type": "send.json",
                    "reason": "status",
                    "monitor": _encode_monitor(monitor, public=True),
                },
            )
    else:
        _broadcast(
            channel_layer,
            GROUP,
            {
                "type": "send.json",
                "reason": "status",
                "monitor": json.loads(json.dumps(monitor, cls=JSONEncoder)),
            },
        )


class JSONEncoder(JSONEncoder_):
    def default(self, obj: Any) -> Any:
        if isinstance(obj, datetime):
            return obj.strftime(config.DATETIME_FORMAT)
        if isinstance(obj, date):
            return obj.strftime(config.DATE_FORMAT)
        if isinstance(obj, time):
            return obj.strftime(config.TIME_FORMAT)
        return json.JSONEncoder.default(self, obj)
