from functools import cached_property
from urllib.parse import urlparse

from strategy_field.registry import Registry
from strategy_field.utils import fqn

from .base import BaseCheck


class CheckRegistry(Registry):
    def get_name(self, entry: "BaseCheck") -> str:
        return entry.verbose_name or entry.__name__

    def register(self, check: type[BaseCheck]) -> None:
        super().register(check)

    def as_choices(self) -> list[tuple[str, str]]:
        if not self._choices:
            self._choices = sorted([(fqn(klass), self.get_name(klass)) for klass in self], key=lambda x: x[1])
        return self._choices

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
