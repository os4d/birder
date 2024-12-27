from functools import cached_property
from typing import TYPE_CHECKING
from urllib.parse import urlparse

from strategy_field.registry import Registry

from .base import BaseCheck

if TYPE_CHECKING:
    from birder.types import Json


class CheckRegistry(Registry):
    def register(self, check: type[BaseCheck]) -> None:
        super().register(check)

    @cached_property
    def protocols(self) -> dict[str, BaseCheck]:
        self._protocols = {}
        for entry in self:
            for p in entry.pragma:
                self._protocols[p.lower()] = entry
        return self._protocols

    def from_conn_string(self, uri: str) -> tuple[BaseCheck, "Json"]:
        o = urlparse(uri.strip())
        try:
            checker: BaseCheck = self.protocols[o.scheme]
        except KeyError as e:
            raise ValueError(f"{uri} - Unknown protocol '{o.scheme}'. Valid protocols are {list(self.protocols.keys())}") from e
        return checker, checker.config_from_uri(uri)


registry = CheckRegistry(BaseCheck)
