#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020

from collections import OrderedDict

from redis_timeseries import (TimeSeries, days, hours,
                              minutes, round_time_with_tz,)

from birder.utils import TIME_ZONE

from .redis import client


class TS(TimeSeries):
    def zap(self, key):
        pipe = self.client.pipeline()
        pipe.expire(key, -1)
        pipe.delete(key)
        pipe.execute()

    def get_errors(self, key, granularity, timestamp=None):
        return self.get_buckets(f"{key}:errs", granularity, -1, timestamp=timestamp)

    def get_pings(self, key, granularity, timestamp=None):
        return self.get_buckets(f"{key}:ping", granularity, -1, timestamp=timestamp)

    def error(self, key, amount, timestamp=None, execute=True):
        super().increase(f"{key}:errs", amount, timestamp, execute)

    def success(self, key, amount=1, timestamp=None, execute=True):
        self.set(f"{key}:ping", amount, timestamp, execute)

    def get_buckets(self, key, granularity, count=-1, timestamp=None):
        if count == -1:
            props = self.granularities[granularity]
            count = round((props['ttl'] / props['duration']))
        return super().get_buckets(key, granularity, count, timestamp)

    get_hits = get_buckets

    def set(self, key, amount, timestamp=None, execute=True):
        pipe = self.client.pipeline() if execute else self.chain

        for granularity, props in self.granularities.items():
            hkey = self.get_key(key, timestamp, granularity)
            bucket = round_time_with_tz(timestamp, props['duration'], self.timezone)

            _incr = pipe.set if self.use_float else pipe.hincrby
            _incr(hkey, bucket, amount)

            pipe.expire(hkey, props['ttl'])

        if execute:
            pipe.execute()


granularities = OrderedDict([
    ('h', {'duration': minutes(1), 'ttl': minutes(120)}),
    ('d', {'duration': hours(1), 'ttl': hours(24)}),
    ('w', {'duration': hours(1), 'ttl': days(7)}),
    ('m', {'duration': days(1), 'ttl': days(30)}),
    ('y', {'duration': days(1), 'ttl': days(365)}),
])

stats: TS = TS(client, base_key='stats', granularities=granularities, timezone=TIME_ZONE)
