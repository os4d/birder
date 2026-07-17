import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

GROUP = "ALL"
PUBLIC_GROUP = "PUBLIC"


class CheckConsumer(JsonWebsocketConsumer):
    def connect(self) -> None:
        group = GROUP if self.scope["user"].is_authenticated else PUBLIC_GROUP
        async_to_sync(self.channel_layer.group_add)(group, self.channel_name)
        self.accept()
        self.send(text_data=json.dumps({"type": "connect"}))

    def disconnect(self, close_code: str) -> None:
        async_to_sync(self.channel_layer.group_discard)(GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_discard)(PUBLIC_GROUP, self.channel_name)
