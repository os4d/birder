import datetime
import importlib
import json
import types
from datetime import timedelta
from functools import lru_cache
from inspect import isclass
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


@lru_cache(10)
def fqn(o, silent=False, from_module=None):
    """Returns the fully qualified class name of an object or a class

    :param o: object or class
    :return: class name
    """
    parts = []
    if isinstance(o, (str, bytes)):
        return o
    if not hasattr(o, '__module__'):
        if silent:
            return
        raise ValueError('Invalid argument `%s` %s' % (type(o), o))
    parts.append(o.__module__)
    if isclass(o):
        parts.append(o.__name__)
    elif isinstance(o, types.FunctionType):
        parts.append(o.__name__)
    else:
        parts.append(o.__class__.__name__)
    return '.'.join(parts)


class ModulesCache(dict):
    def __missing__(self, name):
        if '.' not in name:
            raise ValueError("Cannot import '{}'".format(name))

        module_path, class_str = name.rsplit(".", 1)
        module = importlib.import_module(module_path)
        try:
            handler = getattr(module, class_str)
            self[name] = handler
            return handler
        except AttributeError:
            raise AttributeError('Unable to import {}. '
                                 '{} does not have {} attribute'.format(name,
                                                                        module,
                                                                        class_str))


_cache = ModulesCache()


def import_by_name(name):
    """dynamically load a class from a string

    es:
        klass = import_by_name('my_package.my_module.my_class')
        some_object = klass()

    :param name:
    :return:

    """
    return _cache[name]
