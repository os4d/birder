import pytest

from birder.checks.dns import DnsCheck


@pytest.mark.parametrize(
    ("check_config", "expected_result"),
    [
        ({"domain": "one.one.one.one", "query_type": "A", "expected_value": "1.1.1.1"}, True),
        ({"domain": "example.com", "query_type": "A", "expected_value": "1.1.1.1"}, False),
        ({"domain": "google.com", "query_type": "MX", "expected_value": "smtp.google.com"}, True),
        ({"domain": "google.com", "query_type": "TXT", "expected_value": "v=spf1 include:_spf.google.com ~all"}, True),
        ({"domain": "blog.github.com", "query_type": "CNAME", "expected_value": "github.github.io"}, True),
        ({"domain": "nonexistent-domain.com", "query_type": "A", "expected_value": ""}, False),
        ({"domain": "example.com", "query_type": "A", "expected_value": ""}, True),
        ({"domain": "one.one.one.one", "query_type": "A", "expected_value": "1.1.1.1", "nameserver": "8.8.8.8"}, True),
    ],
)
def test_dns_check(check_config, expected_result):
    check = DnsCheck(configuration=check_config)
    assert check.check() is expected_result
