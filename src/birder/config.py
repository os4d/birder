import os

from .logging import logger  # noqa

# from functools import wraps

# from .redis import client


def typed(args):
    pass

#
# def redis_lru(f):
#     def clear_cache():
#         client.set(f"invalid:{f.__name__}", 1)
#
#     f.cache_clear = clear_cache
#     f.cache = []
#
#     f.cache_clear()
#
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         cached_is_invalid = client.get(f"invalid:{f.__name__}")
#         if cached_is_invalid:
#             f.cache = f(*args, **kwargs)
#             client.delete(f"invalid:{f.__name__}")
#
#         return f.cache
#
#     return decorated_function
#
# #
# def populate_registry(ctx=os.environ):
#     names = sorted([k for k, v in ctx.items() if k.startswith('MONITOR_')])
#     for varname in names:
#         Factory.from_envvar(varname)
#
#     dynamic = client.hgetall("monitors")
#     for
#         # existing[m.label] = m.init_string
#         # client.hmset('monitors', existing)


# @redis_lru
# def get_targets(ctx=os.environ) -> [Target]:
    # for hkey, target in registry.items():
    # targets = {}
    # # names = sorted([k for k, v in ctx.items() if k.startswith('MONITOR')])
    # # for varname in names:
    # #     m = Factory.from_envvar(varname)
    # #     targets[m.ts_name] = m
    #
    # existing = client.hgetall("monitors")
    # for k, v in existing.items():
    #     m = Factory.from_conn_string(k.decode(), v.decode())
    #     targets[m.name] = m
    #
    # order = client.lrange("order", 0, client.llen("order"))
    # if order:
    #     ordered = []
    #     for e in order:
    #         try:
    #             ordered.append(targets[e.decode()])
    #         except KeyError:
    #             pass
    #     # ordered = [targets[e.decode()] for e in order]
    #     ordered.extend([targets[x] for x, y in targets.items() if y not in ordered])
    #     return ordered
    # return targets.values()


def parse_bool(value):
    return str(value).lower() in ["1", "t", "true", "y", "yes", "on"]


def parse_int(value, default=0):
    try:
        return int(value)
    except Exception:
        return default


def parse_list(value, default=tuple()):
    try:
        return [x.trim() for x in value.split(",")]
    except Exception:
        return default


def parse_users(value):
    users = {}
    try:
        for entry in value.split(","):
            u, p = entry.split(":")
            users[u] = p
        return users
    except Exception:
        return []


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SITE_TITLE = os.environ.get('SITE_TITLE', 'Birder')
    GRANULARITIES = parse_list(os.environ.get('GRANULARITIES'), ("h", "d", "w", "m", 'y'))
    REFRESH_INTERVAL = parse_int(os.environ.get('REFRESH_INTERVAL'), 60)
    POLLING_INTERVAL = parse_int(os.environ.get('POLLING_INTERVAL'), 60)
    DISPLAY_URLS = parse_bool(os.environ.get('DISPLAY_URLS', True))
    ADMINS = parse_users(os.environ.get('ADMINS'))
    COOKIE_POLICY_MESSAGE = parse_bool(os.environ.get('COOKIE_POLICY_MESSAGE', False))

    BOOTSTRAP_USE_MINIFIED = True
    BOOTSTRAP_SERVE_LOCAL = parse_bool(os.environ.get('BOOTSTRAP_SERVE_LOCAL', True))
    BOOTSTRAP_QUERYSTRING_REVVING = True

    # SESSION_TYPE = "redis"
    SESSION_PERMANENT = parse_bool(os.environ.get('SESSION_PERMANENT', True))
    # PERMANENT_SESSION_LIFETIME = parse_int(os.environ.get('PERMANENT_SESSION_LIFETIME'), 60 * 60)
    #
    SESSION_COOKIE_HTTPONLY = parse_bool(os.environ.get('SESSION_COOKIE_HTTPONLY', True))
    SESSION_COOKIE_SECURE = parse_bool(os.environ.get('SESSION_COOKIE_SECURE', False))
    SESSION_COOKIE_NAME = os.environ.get('SESSION_COOKIE_NAME', 'sesion')
    SESSION_COOKIE_DOMAIN = os.environ.get('SESSION_COOKIE_NAME', None)
    SESSION_COOKIE_PATH = os.environ.get('SESSION_COOKIE_NAME', '/')
    PREFERRED_URL_SCHEME = os.environ.get('PREFERRED_URL_SCHEME', 'http')
    SENTRY_DSN = os.environ.get('SENTRY_DSN', '')
    CORS_ALLOW_ORIGIN = parse_list(os.environ.get('CORS_ALLOW_ORIGIN', '*'))
    CACHE_TYPE = "redis"
    CACHE_KEY_PREFIX = "cache:"
    CACHE_REDIS_URL = "127.0.0.1:6379/2"

    APPLICATION_ROOT = os.environ.get('APPLICATION_ROOT', '')
    URL_PREFIX = os.environ.get('URL_PREFIX', '')
    SITE_HOST = os.environ.get('SITE_HOST', '')
    FORCE_HTTPS = parse_bool(os.environ.get('FORCE_HTTPS', False))


if not Config.SESSION_COOKIE_DOMAIN:
    del Config.SESSION_COOKIE_DOMAIN
