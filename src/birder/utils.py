import datetime
import json
from datetime import timedelta
from urllib.parse import parse_qs, urlparse

from flask import make_response
from pytz import timezone
from redis import Redis

TIME_ZONE = timezone('utc')


def tz_now():
    # return datetime().replace(tzinfo=TIME_ZONE)
    return datetime.datetime.utcnow().replace(tzinfo=TIME_ZONE)


def hour_rounder(t):
    # Rounds to nearest hour by adding a timedelta hour if minute >= 30
    return t.replace(second=0, microsecond=0, minute=0, hour=t.hour) + timedelta(hours=1)


class SmartRedis(Redis):
    @classmethod
    def from_url(cls, url, db=None, **kwargs):
        parts = urlparse(url)
        opts = parse_qs(parts.query)
        opts.pop('key_prefix', '')
        opts.update(kwargs)
        if ':' in parts.netloc:
            host, port = parts.netloc.split(':')
        else:
            host, port = parts.netloc, 6379

        return super().from_url('{0}://{1}:{2}'.format(parts.scheme, host, port), db, **opts)


class Encoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        return json.JSONEncoder.default(self, obj)


def jsonify(*args):
    response = make_response(json.dumps(*args, cls=Encoder))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['mimetype'] = 'application/json'
    response.last_modified = datetime.datetime.utcnow()
    response.add_etag()
    return response


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)
