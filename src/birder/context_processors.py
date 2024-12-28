from typing import Any

from django.core.cache import cache
from django.http.request import HttpRequest


def birder(request: HttpRequest) -> dict[str, Any]:
    return {"system": {"last_check": cache.get("system:last_check")}}
