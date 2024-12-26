from .http import HttpCheck
from .redis import RedisCheck
from .registry import registry

registry.register(HttpCheck)
registry.register(RedisCheck)
