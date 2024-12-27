import pytest

from birder.checks import parser


@pytest.mark.parametrize(
    "url",
    [
        "ftp://user:password@localhost:2221",
        "https+json://json.org:28000",
        "https://google.com",
        "memcache://localhost:21121",
        "mysql://root:password@localhost:23306",
        "postgres://postgres:@localhost/postgres",
        "redis://localhost:26379",
        "ssh://user:password@localhost:2222",
    ],
)
def test_parser(url):
    checker, config = parser(url)
    assert checker.config_class(config).is_valid()
