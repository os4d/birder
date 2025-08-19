from __future__ import annotations

from typing import Any, TypedDict

Json = dict[str, "Json"] | list["Json"] | str | int | float | bool | None

class DebugInfo(TypedDict, total=False):
    exception: Exception | None
    # Allow other arbitrary keys
    __extra_items__: Any
