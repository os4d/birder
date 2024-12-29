import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

GROUP = "ALL"


class CheckConsumer(JsonWebsocketConsumer):
    def connect(self) -> None:
        async_to_sync(self.channel_layer.group_add)(GROUP, self.channel_name)
        self.accept()
        self.send(text_data=json.dumps({"connect": "connect"}))

    def disconnect(self, close_code: str) -> None:
        async_to_sync(self.channel_layer.group_discard)(GROUP, self.channel_name)

    def send_ping(self, content: str, close: bool = False) -> None:
        super().send(text_data=self.encode_json(content), close=close)
