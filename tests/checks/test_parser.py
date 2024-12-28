import pytest

from birder.checks import parser


@pytest.mark.parametrize(
    "url",
    [
        "amqp://localhost:21121",
        "celery://user:password@localhost:2221?broker=redis",
        "ftp://user:password@localhost:2221",
        "https+json://google.com",
        "https+json://json.org:28000",
        "https+xml://google.com",
        "https://google.com",
        "memcache://localhost:21121",
        "mysql://root:password@localhost:23306",
        "postgres://postgres:@localhost/postgres",
        "rabbitmq://localhost:21121",
        "redis://localhost:26379",
        "ssh://user:password@localhost:2222",
    ],
)
def test_parser(url):
    checker, config = parser(url)
    assert checker.config_class(config).is_valid()
