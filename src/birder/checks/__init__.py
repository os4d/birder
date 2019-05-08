import os
import re
import sys
import traceback

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
    _ids = count(1)
    icon = ""
    conn = None

    def __init__(self, name, init_string, timeout=5):
        self.name = name
        self.init_string = init_string
        self.timeout = timeout
        self.order = next(self._ids)
        self.label = labelize(name)
        self.ts_name = slugify(self.init_string, separator='_', decimal=False)
        try:
            self.parse(self.init_string)
        except Exception as e:
            raise Exception("Error parsing connection string '%s' for '%s': %s " % (init_string, name, e)) from e

    def _assert(self, condition, msg="", *args, **kwargs):
        if not condition:
            if not msg:
                try:
                    raise AssertionError
                except AssertionError:
                    f = sys.exc_info()[2].tb_frame.f_back
                stck = traceback.extract_stack(f)
                msg = str(stck[-1][-1])
            raise Exception(msg)

    def parse(self, arg):
        self.conn = urlparse(arg)
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

    def check(self, **config):
        raise NotImplementedError


class Redis(Target):
    def check(self, **config):
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

    def check(self, **config):
        conn = pymysql.connect(**self.conn_kwargs,
                               cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()
        cursor.execute('SELECT 1 FROM DUAL;')
        return True


class Postgres(DbConnParser, Target):
    default_port = 5432

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)

        conn = psycopg2.connect(**self.conn_kwargs,
                                connect_timeout=timeout)
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        return True


PostGis = Postgres


class Http(Target):
    icon = "http.png"
    status_success = [200]
    match = None

    def _parse_status(self, value):
        self.status_success = list(map(int, value.split(',')))

    def _parse_match(self, value):
        self.match = value

    def parse(self, arg):
        parts = arg.split('|')
        if len(parts) > 1:
            for entry in parts:
                key, val = entry.split('=')
                handler = getattr(self, '_parse_%s' % key, None)
                if handler:
                    handler(val)

        super().parse(parts[0])

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)
        address = "%s://%s" % (self.conn.scheme, self.conn.netloc)
        res = requests.get(address, timeout=timeout)
        self._assert(res.status_code in self.status_success, 'Invalid status code')
        if self.match:
            self._assert(str(self.match) in str(res.content), 'Cannot find %s' % self.match)
        return True

    @property
    def link(self):
        return self.url


class Amqp(Target):
    def check(self, **config):
        conn = Connection(self.conn)
        conn.ensure_connection(max_retries=1)
        return True


Rabbit = RabbitMQ = Kombu = Amqp


class Celery(Target):
    @property
    def url(self):
        address = re.sub('.*@', '******@', self.conn.netloc)
        return "%s://%s/%s" % (self.query['broker'], address, self.conn.path.replace('/', ''))

    @cached_property
    def broker(self):
        return "%s://%s/%s" % (self.query['broker'], self.conn.netloc, self.conn.path.replace('/', ''))

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)

        app = CeleryApp('birder', loglevel='info', broker=self.broker)
        c = Control(app)
        insp = c.inspect(timeout=timeout)
        # d = insp.stats()
        d = insp.ping()
        return bool(d)


class TCP(Target):
    default_port = 7

    @cached_property
    def port(self):
        return self.conn.port or self.default_port

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            socket.setdefaulttimeout(timeout)  # seconds (float)
            result = sock.connect_ex((self.conn.hostname, self.port))
            self._assert(result == 0, str(result))


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
    def from_conn_string(cls, name, conn):
        o = urlparse(conn.lower())
        return cls.PROTOCOLS[o.scheme](name, conn)

    @classmethod
    def from_envvar(cls, varname):
        conn = os.environ[varname]
        return cls.from_conn_string(varname.split('_', 1)[1], conn)
