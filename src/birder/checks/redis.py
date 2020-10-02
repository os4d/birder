from redis import Redis as RedisClient

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
