import requests

from .base import Target


class Http(Target):
    icon = "http.png"
    status_success = [200]
    match = None

    def _parse_status(self, value):
        self.status_success = list(map(int, value.split(',')))

    def _parse_match(self, value):
        self.match = value

    def check(self, **config):
        timeout = config.get('timeout', self.timeout)
        address = "%s://%s" % (self.conn.scheme, self.conn.netloc)
        res = requests.get(address, timeout=timeout)
        self._assert(res.status_code in self.status_success, 'Invalid status code')
        if self.match:
            self._assert(str(self.match) in str(res.content), 'Cannot find %s' % self.match)
        return True

    @property
    def link(self):
        return self.url
