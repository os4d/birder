import os

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from birder.ws.consumers import CheckConsumer


@pytest.fixture
def user(db):
    return get_user_model().objects.create_user("test@example.com", "test@example.com", "password")


@pytest.mark.skipif(os.environ.get("CI") != "true", reason="Requires running Redis")
@pytest.mark.asyncio
async def test_authenticated_joins_full_group(user):
    communicator = WebsocketCommunicator(CheckConsumer.as_asgi(), "/ws/check/")
    communicator.scope["user"] = user
    connected, _subprotocol = await communicator.connect()
    assert connected
    await communicator.disconnect()


@pytest.mark.skipif(os.environ.get("CI") != "true", reason="Requires running Redis")
@pytest.mark.asyncio
async def test_anonymous_joins_public_group(db):
    communicator = WebsocketCommunicator(CheckConsumer.as_asgi(), "/ws/check/")
    connected, _subprotocol = await communicator.connect()
    assert connected
    await communicator.disconnect()


@pytest.mark.skipif(os.environ.get("CI") != "true", reason="Requires running Redis")
@pytest.mark.asyncio
async def test_check_consumer_connect(user):
    communicator = WebsocketCommunicator(CheckConsumer.as_asgi(), "/ws/check/")
    communicator.scope["user"] = user
    connected, subprotocol = await communicator.connect()
    assert connected

    response = await communicator.receive_json_from()
    assert response == {"type": "connect"}

    await communicator.disconnect()
