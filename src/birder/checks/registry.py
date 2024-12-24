from strategy_field.registry import Registry

from .base import BaseCheck


class CheckRegistry(Registry):
    pass


registry = CheckRegistry(BaseCheck)
