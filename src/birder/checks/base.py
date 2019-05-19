import os
import re
import socket
import sys
import traceback
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
    default_config = {}
    def __init__(self, name, init_string, timeout=5):
        self.name = name
        self.init_string = init_string
        self.timeout = timeout
        self.order = next(self._ids)
        self.label = labelize(name)
        self.config = dict(self.default_config)
        self.ts_name = slugify(self.init_string, separator='_', decimal=False)
        try:
            self.parse(self.init_string)
        except Exception as e:
            raise Exception("Error parsing connection string '%s' for '%s': %s " % (init_string, name, e)) from e

    def info(self):
        return """{0.name} {0.label}""".format(self)

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

    # def parse(self, arg):
    #     self.conn = urlparse(arg)
    #     self.query = parse_qs(self.conn.query)

    def parse(self, arg):
        parts = arg.split('|')
        if len(parts) > 1:
            for entry in parts[1:]:
                key, val = entry.split('=')
                handler = getattr(self, '_parse_%s' % key, None)
                if handler:
                    handler(val)
                else:
                    self.config[key] = val
        self.conn = urlparse(parts[0])
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
