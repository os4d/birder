from typing import Any
from urllib.parse import parse_qsl, urlparse

from .amqp import AmqpCheck
from .base import BaseCheck
from .celery import CeleryCheck
from .ftp import FtpCheck
from .http import HttpCheck
from .json import JsonCheck
from .memcache import MemCacheCheck
from .mysql import MySQLCheck
from .pg import PostgresCheck
from .redis import RedisCheck
from .registry import registry
from .ssh import SSHCheck
from .tcp import TCPCheck
from .xml import XMLCheck

registry.register(HttpCheck)
registry.register(RedisCheck)
registry.register(MySQLCheck)
registry.register(PostgresCheck)
registry.register(FtpCheck)
registry.register(JsonCheck)
registry.register(SSHCheck)
registry.register(MemCacheCheck)
registry.register(AmqpCheck)
registry.register(CeleryCheck)
registry.register(TCPCheck)
registry.register(XMLCheck)


def parse_uri(uri: str) -> dict[str, str | Any]:
    o = urlparse(uri)
    cfg = {
        **dict(parse_qsl(o.query)),
        "hostname": o.hostname,
        "host": o.hostname,
        "scheme": o.scheme,
        "username": o.username,
        "password": o.password,
        "address": f"{o.scheme}://{o.hostname}{o.path}",
    }
    if o.port:
        cfg["port"] = o.port
    return cfg


def parser(uri: str) -> tuple[type[BaseCheck], dict[str, str | Any]]:
    checker: type[BaseCheck] = registry.checker_from_url(uri)
    url_config = parse_uri(uri)
    config = checker.clean_config({**checker.config_class.DEFAULTS, **url_config})
    chk = checker(configuration=config)
    return checker, chk.config
