from urllib.parse import urlparse

from birder.core.check import BaseCheck

from .db import MySQL, PostGis, Postgres
from .http import Http
from .redis import Redis
from .services import TCP, Celery, RabbitMQ


class Factory:
    PROTOCOLS = {'redis': Redis,
                 'postgres': Postgres,
                 'postgis': PostGis,
                 'http': Http,
                 'https': Http,
                 'amqp': RabbitMQ,
                 'celery': Celery,
                 'mysql': MySQL,
                 'tcp': TCP
                 }

    @classmethod
    def from_conn_string(cls, name, conn, pk=None, system=False, **kwargs):
        try:
            o = urlparse(conn.lower())
            t = cls.PROTOCOLS[o.scheme](name.upper(), conn, **kwargs)
            t.pk = pk
            t.system = system
            return t
        except KeyError:
            raise Exception(f"{conn} - Unknown protocol '{o.scheme}'")

    @staticmethod
    def deserialize(data):
        return BaseCheck.deserialize(data)
