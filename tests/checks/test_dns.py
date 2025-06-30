from unittest import mock

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


@pytest.mark.parametrize(
    ("check_config", "expected_result", "raise_error", "expected_exception"),
    [
        ({"domain": "test.com", "query_type": "A", "expected_value": "1.2.3.4"}, False, True, Exception),
        ({"domain": "test.com", "query_type": "A", "expected_value": "1.2.3.4"}, False, False, None),
    ],
)
def test_dns_check_exception_handling(check_config, expected_result, raise_error, expected_exception):
    check = DnsCheck(configuration=check_config)
    with mock.patch("dns.resolver.Resolver.resolve") as mock_resolve:
        mock_resolve.side_effect = Exception("Test exception")
        if expected_exception:
            with pytest.raises(expected_exception):
                check.check(raise_error=raise_error)
        else:
            assert check.check(raise_error=raise_error) is expected_result
