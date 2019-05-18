import psycopg2
import pymysql
from redis import Redis as RedisClient
from werkzeug.utils import cached_property

from .base import Target


class Redis(Target):
    default_port = 6379
    default_host = '127.0.0.1'

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)
        client = RedisClient(host=self.conn.hostname or self.default_host,
                             port=self.conn.port or self.default_port,
                             password=self.conn.password,
                             db=self.conn.path.replace('/', ''),
                             socket_connect_timeout=timeout,
                             socket_timeout=timeout)
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
    config = {'sql': 'SELECT 1 FROM DUAL;'}

    def check(self, **config):
        conn = pymysql.connect(**self.conn_kwargs,
                               cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()
        cursor.execute(self.config['sql'])
        return True


class Postgres(DbConnParser, Target):
    default_port = 5432
    config = {'sql': 'SELECT 1;'}

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)

        conn = psycopg2.connect(**self.conn_kwargs,
                                connect_timeout=timeout)
        cursor = conn.cursor()
        cursor.execute(self.config['sql'])
        return True


PostGis = Postgres
