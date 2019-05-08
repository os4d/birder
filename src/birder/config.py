import os
from functools import lru_cache

from .checks import Factory, Target
from .logging import logger


@lru_cache(1)
def get_targets(ctx=os.environ) -> [Target]:
    targets = []
    names = sorted([k for k, v in ctx.items() if k.startswith('MONITOR')])
    for varname in names:
        m = Factory.from_envvar(varname)
        targets.append(m)
    return targets


def parse_bool(value):
    return str(value).lower() in ["1", "t", "true", "y", "yes", "on"]


def parse_int(value, default=0):
    try:
        return int(value)
    except Exception:
        return default


def parse_list(value, default=tuple()):
    try:
        return value.split(",")
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
    GRANULARITIES = parse_list(os.environ.get('GRANULARITIES'), ("60m", "24h", "7d", "30d"))
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

    CACHE_TYPE = "redis"
    CACHE_KEY_PREFIX = "cache:"
    CACHE_REDIS_URL = "127.0.0.1:6379/2"

    APPLICATION_ROOT = os.environ.get('APPLICATION_ROOT', '')
    URL_PREFIX = os.environ.get('URL_PREFIX', '')


if not Config.SESSION_COOKIE_DOMAIN:
    del Config.SESSION_COOKIE_DOMAIN
