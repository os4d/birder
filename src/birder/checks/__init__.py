import os
import re
import socket
from contextlib import closing
from itertools import count
from urllib import parse
from urllib.parse import urlparse

import psycopg2
import pymysql
import requests
from celery import Celery as CeleryApp
from celery.app.control import Control
from kombu import Connection
from redis import Redis as RedisClient
from slugify import slugify
from werkzeug.utils import cached_property


def labelize(varname):
    token = varname.replace('MONITOR_', '').replace('_', ' ')
    return token.title()


def parse_qs(string: str):
    initial = parse.parse_qs(string)
    return {k: v[0] for k, v in initial.items()}


class Target:
    _ids = count(0)
    icon = ""

    def __init__(self, name, init_string):
        self.name = name
        self.init_string = init_string

        self.order = next(self._ids)
        self.label = labelize(self.name.split('_', 1)[1])
        self.ts_name = slugify(self.init_string, separator='_', decimal=False)
        self.parse()

    def parse(self):
        self.conn = urlparse(self.init_string)
        self.query = parse_qs(self.conn.query)

    @cached_property
    def url(self):
        address = re.sub('.*@', '******@', self.conn.netloc)
        return "%s://%s" % (self.conn.scheme, address)

    @cached_property
    def logo(self):
        return self.icon or ("%s.png" % self.conn.scheme)

    @cached_property
    def link(self):
        return ""


class Redis(Target):
    def check(self):
        client = RedisClient.from_url(self.init_string)
        client.ping()
        return True


class DbConnParser:
    default_port = 0
    default_host = '127.0.0.1'

    @cached_property
    def conn_kwargs(self):
        kwargs = dict(host=self.conn.hostname or self.default_host,
                      port=self.conn.port or self.default_port,
                      user=self.conn.username,
                      password=self.conn.password,
                      database=self.conn.path.replace('/', ''))
        kwargs.update(**self.query)
        return kwargs


class MySQL(DbConnParser, Target):
    default_port = 3306

    def check(self):
        conn = pymysql.connect(**self.conn_kwargs,
                               cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()
        cursor.execute('SELECT 1 FROM DUAL;')
        return True


class Postgres(DbConnParser, Target):
    default_port = 5432

    def check(self):
        conn = psycopg2.connect(**self.conn_kwargs,
                                connect_timeout=1)
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        return True


PostGis = Postgres


class Http(Target):
    icon = "http.png"
    status_success = [200]

    def check(self):
        address = "%s://%s" % (self.conn.scheme, self.conn.netloc)
        res = requests.get(address, timeout=1)
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
    # def parse(self):
    #     self.conn = self.init_string
    #     o = urlparse(self.conn)
    #     self.scheme = o.scheme.lower()
    #     self.path = o.path
    #     self.netloc = o.netloc
    #     self.params = o.params
    #     self.query = parse_qs(o.query)
    #     self.fragment = o.fragment

    @property
    def url(self):
        address = re.sub('.*@', '******@', self.conn.netloc)
        return "%s://%s/%s" % (self.query['broker'], address, self.conn.path.replace('/', ''))

    @cached_property
    def broker(self):
        return "%s://%s/%s" % (self.query['broker'], self.conn.netloc, self.conn.path.replace('/', ''))

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
            ip, port = self.conn.netloc.split(':')
            result = sock.connect_ex((ip, int(port)))
            return result == 0

    @property
    def ip(self):
        return self.conn.netloc

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
                 'celery': Celery,
                 'mysql': MySQL,
                 'tcp': TCP
                 }

    @classmethod
    def from_envvar(cls, varname):
        conn = os.environ[varname]
        o = urlparse(conn.lower())
        return cls.PROTOCOLS[o.scheme](varname, conn)
