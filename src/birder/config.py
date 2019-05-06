import os
import re

from .checks import Target, Factory


def get_targets(ctx=os.environ) -> [Target]:
    targets = []
    for k, v in ctx.items():
        m = re.match("^MONITOR(?P<order>[0-9]*)_", k)
        if m:
            targets.append(Factory.from_envvar(k))
    return sorted(targets, key=lambda i: i.order)


targets = get_targets()


def parse_bool(value):
    return str(value).lower() in ["1", "t", "true", "y", "yes"]


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
    SITE_TITLE = os.environ.get('SITE_TITLE', 'Birder')
    GRANULARITIES = parse_list(os.environ.get('GRANULARITIES'), ("60m", "24h", "7d", "30d"))
    REFRESH_INTERVAL = parse_int(os.environ.get('REFRESH_INTERVAL'), 60)
    POLLING_INTERVAL = parse_int(os.environ.get('POLLING_INTERVAL'), 60)
    DISPLAY_URLS = parse_bool(os.environ.get('DISPLAY_URLS', True))
    ADMINS = parse_users(os.environ.get('ADMINS'))

    BOOTSTRAP_USE_MINIFIED = True
    BOOTSTRAP_SERVE_LOCAL = True
    BOOTSTRAP_QUERYSTRING_REVVING = True

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False

    CACHE_TYPE = "redis"
    CACHE_KEY_PREFIX = "cache:"
    CACHE_REDIS_URL = "127.0.0.1:6379/2"

    APPLICATION_ROOT = os.environ.get('APPLICATION_ROOT', '')
    URL_PREFIX = os.environ.get('URL_PREFIX', '')
