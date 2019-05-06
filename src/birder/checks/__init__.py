import os
import re
from urllib.parse import urlparse

from itertools import count
from redis import Redis as RedisClient
import psycopg2
import requests
from celery.app.control import Control
import socket
from kombu import Connection
from slugify import slugify
from contextlib import closing


def labelize(varname):
    token = varname.replace('MONITOR_', '').replace('_', ' ')
    return token.title()


class Target:
    _ids = count(0)
    icon = ""

    def __init__(self, name, init_string):
        self.name = name
        self.init_string = init_string

        self.order = next(self._ids)
        self.label = labelize(self.name.split('_', 1)[1])
        self.ts_name = slugify(self.name, separator='_', decimal=False)

        self.conn = ""
        self.scheme = ""
        self.path = ""
        self.netloc = ""
        self.params = ""
        self.query = ""
        self.fragment = ""

        self.parse()

    def parse(self):
        self.conn = self.init_string
        o = urlparse(self.conn)
        self.scheme = o.scheme.lower()
        self.path = o.path
        self.netloc = o.netloc
        self.params = o.params
        self.query = o.query
        self.fragment = o.fragment

    @property
    def url(self):
        return "%s://%s" % (self.scheme, self.netloc)

    @property
    def logo(self):
        return self.icon or ("%s.png" % self.scheme)

    @property
    def link(self):
        return ""

    def check(self):
        pass


class Redis(Target):
    def check(self):
        client = RedisClient.from_url(self.conn)
        client.ping()
        return True


class Postgres(Target):
    def check(self):
        conn = psycopg2.connect(self.conn)
        cursor = conn.cursor()
        cursor.execute('select 1')
        return True


PostGis = Postgres


class Http(Target):
    icon = "http.png"
    status_success = [200]

    def check(self):
        res = requests.get(self.conn, timeout=1)
        return res.status_code in self.status_success

    @property
    def link(self):
        return self.url


class Amqp(Target):
    def check(self):
        conn = Connection(self.conn)
        conn.ensure_connection(max_retries=1)
        return True


Rabbit = RabbitMQ = Kombu = Amqp


class Celery(Target):
    def check(self):
        ERROR_KEY = "ERROR"
        try:
            c = Control()
            insp = c.inspect()
            d = insp.stats()
            if not d:
                d = {ERROR_KEY: 'No running Celery workers were found.'}
        except IOError as e:
            from errno import errorcode
            msg = "Error connecting to the backend: " + str(e)
            if len(e.args) > 0 and errorcode.get(e.args[0]) == 'ECONNREFUSED':
                msg += ' Check that the RabbitMQ server is running.'
            d = {ERROR_KEY: msg}
        except ImportError as e:
            d = {ERROR_KEY: str(e)}
        return d


class TCP(Target):
    default_port = 7

    def check(self):
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            socket.setdefaulttimeout(2.0)  # seconds (float)
            result = sock.connect_ex((self.ip, self.port))
            return result == 0

    @property
    def ip(self):
        return self.netloc

    @property
    def port(self):
        return self.default_port


class Factory:
    PROTOCOLS = {'redis': Redis,
                 'postgres': Postgres,
                 'postgis': PostGis,
                 'http': Http,
                 'https': Http,
                 'amqp': Rabbit,
                 'celery': Celery
                 }

    @classmethod
    def from_envvar(cls, varname):
        conn = os.environ[varname]
        o = urlparse(conn.lower())
        return cls.PROTOCOLS[o.scheme](varname, conn)
