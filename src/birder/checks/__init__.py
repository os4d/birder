from typing import Any
from urllib.parse import parse_qsl, urlparse

from .amqp import AmqpCheck
from .base import BaseCheck
from .celery import CeleryCheck, CeleryQueueCheck
from .dns import DnsCheck
from .elastic_search import ElasticSearchCheck
from .ftp import FtpCheck
from .http import HttpCheck
from .json import JsonCheck
from .ldap import LDAPCheck
from .memcache import MemCacheCheck
from .mysql import MySQLCheck
from .passive import HealthCheck
from .pg import PostgresCheck
from .redis import RedisCheck
from .registry import registry
from .s3 import S3Check
from .smtp import SMTPCheck
from .ssh import SSHCheck
from .tcp import TCPCheck
from .xml import XMLCheck

registry.register(AmqpCheck)
registry.register(CeleryCheck)
registry.register(CeleryQueueCheck)
registry.register(DnsCheck)
registry.register(FtpCheck)
registry.register(HealthCheck)
registry.register(HttpCheck)
registry.register(JsonCheck)
registry.register(LDAPCheck)
registry.register(MemCacheCheck)
registry.register(MySQLCheck)
registry.register(PostgresCheck)
registry.register(RedisCheck)
registry.register(S3Check)
registry.register(SMTPCheck)
registry.register(SSHCheck)
registry.register(TCPCheck)
registry.register(XMLCheck)
registry.register(ElasticSearchCheck)


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
