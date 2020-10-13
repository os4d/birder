#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020
from redis import Redis as RedisClient

from birder.core.check import BaseCheck


class RedisValue(BaseCheck):
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
