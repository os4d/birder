from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from birder.models import Monitor


class Database:
    def __init__(self, owner: "Monitor") -> None:
        self.monitor = owner

    def store(self, index: Any, value: bool) -> None:
        pass
