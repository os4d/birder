from functools import cached_property
from urllib.parse import urlparse

from strategy_field.registry import Registry

from .base import BaseCheck


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

    def from_conn_string(self, uri: str) -> BaseCheck:
        o = urlparse(uri.strip())
        try:
            t: BaseCheck = self.protocols[o.scheme]
            return t
        except KeyError as e:
            raise ValueError(f"{uri} - Unknown protocol '{o.scheme}': {list(self.protocols.keys())}") from e


registry = CheckRegistry(BaseCheck)
