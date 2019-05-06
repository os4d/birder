import os
import re
from urllib import parse

import socket
from contextlib import closing
from itertools import count
from urllib.parse import urlparse

import psycopg2
import requests
from celery.app.control import Control
from celery import Celery as CeleryApp
from kombu import Connection
from redis import Redis as RedisClient
from slugify import slugify
from werkzeug.utils import cached_property


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
        self.ts_name = slugify(self.init_string, separator='_', decimal=False)

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
        address = re.sub('.*@', '******@', self.netloc)
        return "%s://%s" % (self.scheme, address)

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
        conn = self.conn.replace('postgis://', 'postgres://')
        conn = psycopg2.connect(conn, connect_timeout=1)
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
    def parse(self):
        self.conn = self.init_string
        o = urlparse(self.conn)
        self.scheme = o.scheme.lower()
        self.path = o.path
        self.netloc = o.netloc
        self.params = o.params
        self.query = parse.parse_qs(o.query)
        self.fragment = o.fragment

    @property
    def url(self):
        address = re.sub('.*@', '******@', self.netloc)
        return "%s://%s%s" % (self.query['broker'][0], address, self.path)

    @cached_property
    def broker(self):
        return "%s://%s%s" % (self.query['broker'][0], self.netloc, self.path)

    def check(self):
        app = CeleryApp('birder', loglevel='info', broker=self.broker)
        c = Control(app)
        insp = c.inspect(timeout=1.1)
        d = insp.stats()
        # d = insp.ping()
        return bool(d)


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
