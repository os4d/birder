import os
from urllib.parse import urlparse

from .base import Target
from .db import MySQL, PostGis, Postgres, Redis
from .http import Http
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
    def from_conn_string(cls, name, conn):
        o = urlparse(conn.lower())
        return cls.PROTOCOLS[o.scheme](name, conn)

    @classmethod
    def from_envvar(cls, varname):
        conn = os.environ[varname]
        return cls.from_conn_string(varname.split('_', 1)[1], conn)
