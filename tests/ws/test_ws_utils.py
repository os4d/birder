from contextlib import nullcontext as does_not_raise
from datetime import datetime, time
from unittest import mock

import pytest

from birder.ws.utils import JSONEncoder, notify_ui


@pytest.mark.parametrize(
    ("obj", "expectation"),
    [
        (datetime.now().date(), does_not_raise()),
        (datetime.now(), does_not_raise()),
        (time(), does_not_raise()),
        (datetime(200, 1, 1, 1, 1, 1), does_not_raise()),
        (1, pytest.raises(TypeError)),
    ],
)
def test_encoder(db, obj, expectation):
    encoder = JSONEncoder()
    with expectation:
        encoder.default(obj)


@pytest.mark.parametrize(
    ("msg", "extra"),
    [
        ("ping", {"timestamp": 1}),
        ("update", {"monitor": 1}),
        ("refresh", {"monitor": 1, "crud": "op"}),
        ("noop", {}),
    ],
)
def test_notify_ui(msg, extra):
    with mock.patch("birder.ws.utils.async_to_sync"):
        notify_ui(msg, **extra)
