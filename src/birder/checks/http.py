from functools import cached_property

import requests

from birder.core.check import BaseCheck


class Http(BaseCheck):
    icon = "http.png"
    status_success = [200]
    match = None

    def _parse_status_success(self, value):
        self.status_success = list(map(int, value.split(',')))

    def _parse_match(self, value):
        self.match = value

    @cached_property
    def target_url(self):
        return self.raw_url

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)
        # address = "%s://%s%s?%s" % (self.conn.scheme, self.conn.netloc, self.conn.path, self.conn.query)
        # address = "%s://%s%s" % (self.conn.scheme, self.conn.netloc, self.conn.path)
        res = requests.get(self.target_url, timeout=timeout)
        self._assert(res.status_code in self.status_success, f'Invalid status code: {res.status_code}')
        if self.match:
            self._assert(str(self.match) in str(res.content), 'Cannot find %s' % self.match)
        return True

    @property
    def link(self):
        return self.url

