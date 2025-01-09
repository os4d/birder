from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path("checks", consumers.CheckConsumer.as_asgi()),
]
