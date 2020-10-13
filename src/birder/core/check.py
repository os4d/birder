import json
import re
import sys
import traceback
from itertools import count
from urllib import parse
from urllib.parse import urlparse

from werkzeug.utils import cached_property

from birder.utils import fqn, import_by_name


def labelize(varname):
    token = varname.replace('MONITOR_', '').replace('_', ' ')
    return token.title()


def parse_qs(string: str):
    initial = parse.parse_qs(string)
    return {k: v[0] for k, v in initial.items()}


class BaseCheck:
    pks = count(1)
    icon = ""
    conn = None
    default_config = {}

    def __init__(self, name, init_string, timeout=5, enabled=True, env_var=None, **kwargs):
        self.name = name
        self.init_string = init_string
        self.timeout = timeout
        self.order = next(self.pks)
        self.label = labelize(name)
        self.config = dict(self.default_config)
        self.env_var = env_var
        self.pk = ""
        self.ts_name = f"pk-{self.pk}"
        self.system = False
        self.enabled = enabled
        for k, v in kwargs.items():
            setattr(self, k, v)
        try:
            self.parse(self.init_string)
        except Exception as e:
            raise Exception("Error parsing connection string '%s' for '%s': %s " % (init_string, name, e)) from e

    def info(self):
        return """{0.name} {0.label}""".format(self)

    def _assert(self, condition, msg="", *args, **kwargs):
        if not condition:
            if not msg:
                try:
                    raise AssertionError
                except AssertionError:
                    f = sys.exc_info()[2].tb_frame.f_back
                stck = traceback.extract_stack(f)
                msg = str(stck[-1][-1])
            raise Exception(msg)

    # def parse(self, arg):
    #     self.conn = urlparse(arg)
    #     self.query = parse_qs(self.conn.query)

    def parse(self, arg):
        parts = arg.split('|')
        if len(parts) > 1:
            for entry in parts[1:]:
                key, val = entry.split('=')
                handler = getattr(self, '_parse_%s' % key, None)
                if handler:
                    handler(val)
                else:
                    self.config[key] = val
        self.conn = urlparse(parts[0])
        self.query = parse_qs(self.conn.query)

    @cached_property
    def url(self):
        address = re.sub('.*@', '******@', self.conn.netloc)
        return "%s://%s" % (self.conn.scheme, address)

    @cached_property
    def logo(self):
        return self.icon or ("%s.png" % self.conn.scheme)

    @cached_property
    def link(self):
        return ""

    def check(self, **config):
        raise NotImplementedError

    def serialize(self):
        return json.dumps({
            "fqn": fqn(self),
            "name": self.name,
            "init_string": self.init_string,
            "timeout": self.timeout,
            "enabled": self.enabled,
            "label": self.label,
            "pk": self.pk,
            "env_var": self.env_var,
            "system": self.system
        })

    @staticmethod
    def deserialize(data):
        config = json.loads(data)
        _class = import_by_name(config.pop('fqn'))
        return _class(**config)
