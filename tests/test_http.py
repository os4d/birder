from unittest.mock import Mock
from urllib.parse import ParseResult

import pytest

from birder.checks.http import HttpCheck


def test_http():
    c = HttpCheck(Mock(configuration={"url": 'http://www.google.com/?a=1'}))
    assert c.conn == ParseResult(scheme='http',
                                 netloc='www.google.com',
                                 path='/',
                                 params='',
                                 query='a=1',
                                 fragment='')
    assert c.query == {'a': ['1']}
    assert c.status_success == [200]
    with pytest.raises(Exception):
        assert not c.check()
