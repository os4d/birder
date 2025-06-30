from unittest import mock

import pytest
from channels.testing import WebsocketCommunicator

from birder.ws.consumers import CheckConsumer


@pytest.mark.asyncio
async def test_check_consumer_connect():
    communicator = WebsocketCommunicator(CheckConsumer.as_asgi(), "/ws/check/")
    connected, subprotocol = await communicator.connect()
    assert connected

    response = await communicator.receive_json_from()
    assert response == {"type": "connect"}

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_check_consumer_disconnect():
    communicator = WebsocketCommunicator(CheckConsumer.as_asgi(), "/ws/check/")
    await communicator.connect()

    with mock.patch("birder.ws.consumers.async_to_sync") as mock_async_to_sync:
        await communicator.disconnect()
        mock_async_to_sync.assert_called_once()
