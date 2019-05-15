import re
from collections import OrderedDict

import pytz
import redis
from redis_timeseries import TimeSeries, days, hours, minutes


def get_limit(granularity):
    return {'60m': 120}


class TS(TimeSeries):
    def zap(self, key):
        pipe = self.client.pipeline()
        pipe.expire(key, -1)
        pipe.execute()

    def get_errors(self, key, granularity):
        return self.get_buckets(key, granularity, -1)

    def get_buckets(self, key, granularity, count, timestamp=None):
        if count == -1:
            props = self.granularities[granularity]
            count = round((props['ttl'] / props['duration']))
        return super().get_buckets(key, granularity, count, timestamp)

    def success(self, key, timestamp=None, execute=True):
        pipe = self.client.pipeline() if execute else self.chain
        for granularity, props in self.granularities.items():
            hkey = self.get_key(key, timestamp, granularity)
            bucket = self._round_time(timestamp, props['duration'])
            pipe.hsetnx(hkey, bucket, -1)
            pipe.expire(hkey, props['ttl'])

        if execute:
            pipe.execute()
        return pipe

    def increase(self, key, amount, timestamp=None, execute=True):
        super().increase(key, amount, timestamp, execute=False)
        self.chain.execute()

    def hset(self, key, value, timestamp=None, execute=True):
        # type(pipe): Pipeline
        pipe = self.client.pipeline() if execute else self.chain

        for granularity, props in self.granularities.items():
            hkey = self.get_key(key, timestamp, granularity)
            bucket = self._round_time(timestamp, props['duration'])
            pipe.hset(hkey, bucket, value)
            pipe.expire(hkey, props['ttl'])

        if execute:
            pipe.execute()
        return pipe


granularities = OrderedDict([
    ('h', {'duration': minutes(1), 'ttl': minutes(60)}),
    ('d', {'duration': minutes(1), 'ttl': hours(24)}),
    ('w', {'duration': hours(1), 'ttl': days(7)}),
    ('m', {'duration': days(1), 'ttl': days(30)}),
    ('y', {'duration': days(1), 'ttl': days(365)}),
])

client = redis.StrictRedis()
stats = TS(client, base_key='stats', granularities=granularities, timezone=pytz.UTC)
