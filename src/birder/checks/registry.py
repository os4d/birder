from functools import cached_property
from urllib.parse import urlparse

from strategy_field.registry import Registry

from .base import BaseCheck


class CheckRegistry(Registry):
    def register(self, check: type[BaseCheck]) -> None:
        super().register(check)

    @cached_property
    def protocols(self) -> dict[str, type[BaseCheck]]:
        self._protocols = {}
        for entry in self:
            for p in entry.pragma:
                self._protocols[p.lower()] = entry
        return self._protocols

    def checker_from_url(self, uri: str) -> type[BaseCheck]:
        o = urlparse(uri.strip())
        try:
            checker: type[BaseCheck] = self.protocols[o.scheme]
        except KeyError as e:
            raise ValueError(
                f"{uri} - Unknown protocol '{o.scheme}'. Valid protocols are {list(self.protocols.keys())}"
            ) from e
        return checker


registry = CheckRegistry(BaseCheck)
