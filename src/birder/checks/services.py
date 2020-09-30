import re
import socket
from contextlib import closing

from celery import Celery as CeleryApp
from celery.app.control import Control
from kombu import Connection as KombuConnection
from werkzeug.utils import cached_property

from .base import Target


class Amqp(Target):
    def check(self, **config):
        conn = KombuConnection(self.conn)
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
        d = insp.stats()
        # d = insp.ping()
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
