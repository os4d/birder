import re
from collections import OrderedDict

import pytz
import redis
from redis_timeseries import TimeSeries, days, hours, minutes


class TS(TimeSeries):
    def get_data(self, key, granularity):
        count  = int(re.sub('[a-z]*', '', granularity))
        successs = self.get_buckets("%s:s" % key, granularity, count)
        failures = self.get_buckets("%s:f" % key, granularity, count)
        return [successs, failures]

    def get_buckets(self, key, granularity, count, timestamp=None):
        if count == -1:
            props = self.granularities[granularity]
            count = round((props['ttl'] / props['duration']))
        return super().get_buckets(key, granularity, count, timestamp)

    def success(self, key):
        pipe = self.hset("%s:s" % key, 1, execute=False)
        pipe.delete(key)
        pipe.execute()

    def failure(self, key):
        pipe =self.hset("%s:f" % key, 1, execute=False)
        pipe.set(key, 1)
        pipe.execute()


    def hset(self, key, value, timestamp=None, execute=True):
        # type(pipe): Pipeline
        pipe = self.client.pipeline() if execute else self.chain

        for granularity, props in self.granularities.items():
            hkey = self.get_key(key, timestamp, granularity)
            bucket = self._round_time(timestamp, props['duration'])

            pipe.hset(hkey, bucket, 1)
            pipe.expire(hkey, props['ttl'])

        if execute:
            pipe.execute()
        return pipe


units = {
    "60m": "minutes",
    "24h": "hour",
    "7d": "day",
    "30d": "day"
}
granularities = OrderedDict([
    ('60m', {'duration': minutes(1), 'ttl': hours(1)}),
    ('24h', {'duration': hours(1), 'ttl': hours(24)}),
    ('7d', {'duration': days(1), 'ttl': days(7)}),
    ('30d', {'duration': days(1), 'ttl': days(30)}),
])

client = redis.StrictRedis()
stats = TS(client, base_key='stats', granularities=granularities, timezone=pytz.UTC)
