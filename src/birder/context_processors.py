from typing import Any

from django.core.cache import cache
from django.http.request import HttpRequest

from birder import VERSION


def birder(request: HttpRequest) -> dict[str, Any]:
    return {
        "birder": {
            "system": {
                "last_check": cache.get("system:last_check"),
            },
            "version": VERSION,
        }
    }
