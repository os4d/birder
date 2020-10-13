#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020
import json
import logging
import os

from birder.core.check import BaseCheck
from birder.core.queue import send
from birder.exceptions import ValidationError

from .redis import client

logger = logging.getLogger(__name__)


class Registry:
    def __init__(self, ctx=os.environ):
        self.context = ctx

    def initialize(self):
        pass

    def __len__(self):
        return len(self._checks())

    def __iter__(self):
        checks = self._checks()
        if not self.order:
            self.sort_by()
        return iter([checks[v] for v in self.order if v in checks.keys() and checks[v].enabled])

    def disabled(self):
        checks = self._checks()
        if not self.order:
            self.sort_by()
        return iter([checks[v] for v in self.order if v in checks.keys() and not checks[v].enabled])

    def __getitem__(self, item):
        checks = self._checks()
        return checks[item]

    def _checks(self) -> [BaseCheck]:
        from birder.checks import Factory

        checks = {}
        names = sorted([k for k, v in self.context.items() if k.startswith('MONITOR_')])
        for varname in names:
            try:
                conn = self.context[varname]
                check = Factory.from_conn_string(*conn.split('|', 1), system=True)
                check.pk = varname
                for k, v in self.overriden(varname).items():
                    setattr(check, k, v)
                checks[varname] = check
            except Exception as e:
                logger.exception(e)

        dynamics = self.get_dynamic()
        for label, init_string in dynamics.items():
            try:
                check = Factory.from_conn_string(label.decode(), init_string.decode())
                check.pk = check.name
                override = client.get(f"override:{check.pk}")
                if override:
                    for k, v in json.loads(override).items():
                        setattr(check, k, v)
                checks[check.pk] = check
            except Exception as e:
                logger.exception(e)
        return checks

    @property
    def order(self):
        return [c.decode() for c in client.lrange("order", 0, client.llen("order"))]

    def sort_by(self, sequence=None):
        ordered = list(sequence or [])
        ordered.extend([c.pk for c in self._checks().values() if c.pk not in ordered])
        ordered.reverse()
        p = client.pipeline()
        p.delete("order")
        p.lpush("order", *ordered)
        p.execute()

    def override(self, hkey, **kwargs):
        client.set(f"override:{hkey}", json.dumps(kwargs))

    def overriden(self, hkey):
        return json.loads(client.get(f"override:{hkey}") or "{}")

    def get_dynamic(self):
        return client.hgetall('dynamic')

    def add_dynamic(self, label, init_string):
        data = client.hgetall('dynamic')
        if label in data:
            raise ValueError('--')
        data[label.upper()] = init_string
        client.hmset('dynamic', data)
        self.sort_by()
        send(label)

    def enable(self, hkey):
        kwargs = self.overriden(hkey)
        kwargs['enabled'] = True
        self.override(hkey, **kwargs)
        send(hkey)

    def remove(self, hkey):
        check = self[hkey]
        if check.system:
            kwargs = self.overriden(hkey)
            kwargs['enabled'] = False
            self.override(hkey, **kwargs)
        else:
            client.hdel('dynamic', hkey.encode())
            self.sort_by()

        send(hkey)


registry = Registry()
