import pytest
from channels.testing import WebsocketCommunicator

from birder.config.asgi import application


@pytest.mark.asyncio
async def test_receives_data() -> None:
    communicator = WebsocketCommunicator(application=application, path="/ws/checks/")
    connected, _ = await communicator.connect()
    assert connected
    response = await communicator.receive_json_from()
    assert response == {"type": "connect"}
    await communicator.disconnect()
