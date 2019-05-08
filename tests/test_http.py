from urllib.parse import ParseResult

import pytest

from birder.checks import Http


def test_http():
    c = Http('http', 'http://www.google.com/?a=1|status=200,302|match=pippo')
    assert c.conn == ParseResult(scheme='http',
                                 netloc='www.google.com',
                                 path='/',
                                 params='',
                                 query='a=1',
                                 fragment='')
    assert c.query == {'a': '1'}
    assert c.status_success == [200, 302]
    assert c.match == "pippo"
    with pytest.raises(Exception):
        assert not c.check()


def test_issue1():
    c = Http('http', 'https://demo.bitcaster.io/login/|status=200,302')
    assert c.conn == ParseResult(scheme='http',
                                 netloc='www.google.com',
                                 path='/',
                                 params='',
                                 query='a=1',
                                 fragment='')
    assert c.query == {'a': '1'}
    assert c.status_success == [200, 302]
    assert c.match == "pippo"
    with pytest.raises(Exception):
        assert not c.check()


