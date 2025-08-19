from unittest.mock import MagicMock, Mock, patch

import pytest

from birder.checks.ssl_cert import SslCertCheck
from birder.exceptions import CheckError


@patch("birder.checks.ssl_cert.ssl.create_default_context")
@patch("birder.checks.ssl_cert.socket.create_connection")
def test_ssl_cert_check_success(mock_create_connection, mock_create_default_context):
    """
    Test that the SSL certificate check is successful when the certificate is valid and not expiring soon.
    """
    # Mock the certificate expiry date to be far in the future
    mock_cert = {"notAfter": "Aug 19 23:59:59 2035 GMT"}
    mock_ssock = MagicMock()
    mock_ssock.__enter__.return_value.getpeercert.return_value = mock_cert
    mock_context = MagicMock()
    mock_context.wrap_socket.return_value = mock_ssock
    mock_create_default_context.return_value = mock_context

    check = SslCertCheck(Mock(configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert check.check() is True


@patch("birder.checks.ssl_cert.ssl.create_default_context")
@patch("birder.checks.ssl_cert.socket.create_connection")
def test_ssl_cert_check_expiring_soon(mock_create_connection, mock_create_default_context):
    """
    Test that the SSL certificate check fails when the certificate is expiring soon.
    """
    # Mock the certificate expiry date to be in the near future
    mock_cert = {"notAfter": "Aug 20 23:59:59 2025 GMT"}
    mock_ssock = MagicMock()
    mock_ssock.__enter__.return_value.getpeercert.return_value = mock_cert
    mock_context = MagicMock()
    mock_context.wrap_socket.return_value = mock_ssock
    mock_create_default_context.return_value = mock_context

    check = SslCertCheck(Mock(configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert check.check() is False


@patch("birder.checks.ssl_cert.ssl.create_default_context")
@patch("birder.checks.ssl_cert.socket.create_connection")
def test_ssl_cert_check_expired(mock_create_connection, mock_create_default_context):
    """
    Test that the SSL certificate check fails when the certificate has expired.
    """
    # Mock the certificate expiry date to be in the past
    mock_cert = {"notAfter": "Aug 18 23:59:59 2025 GMT"}
    mock_ssock = MagicMock()
    mock_ssock.__enter__.return_value.getpeercert.return_value = mock_cert
    mock_context = MagicMock()
    mock_context.wrap_socket.return_value = mock_ssock
    mock_create_default_context.return_value = mock_context

    check = SslCertCheck(Mock(configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert check.check() is False


@patch("birder.checks.ssl_cert.ssl.create_default_context")
def test_ssl_cert_check_ssl_error(mock_create_default_context):
    """
    Test that the SSL certificate check fails when an SSLCertVerificationError is raised.
    """
    import ssl

    mock_context = Mock()
    mock_context.wrap_socket.side_effect = ssl.SSLCertVerificationError("certificate has expired")
    mock_create_default_context.return_value = mock_context

    check = SslCertCheck(Mock(configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert check.check() is False

    with pytest.raises(CheckError, match="certificate has expired"):
        check.check(True)


@patch("birder.checks.ssl_cert.socket.create_connection")
def test_ssl_cert_check_connection_error(mock_create_connection):
    """
    Test that the SSL certificate check fails when a connection error occurs.
    """
    import socket

    mock_create_connection.side_effect = socket.gaierror("getaddrinfo failed")

    check = SslCertCheck(Mock(configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert check.check() is False
    with pytest.raises(CheckError, match="getaddrinfo failed"):
        check.check(True)


def test_address():
    c = SslCertCheck(Mock(pk=1, configuration={"hostname": "example.com", "port": 443, "alert_days": 7}))
    assert c.address == "example.com"


def test_ssl_cert_config():
    """
    Test that the SslCertConfig form is valid with correct data.
    """
    config = SslCertCheck.config_class({"hostname": "example.com", "port": 443, "alert_days": 7})
    assert config.is_valid()


def test_ssl_cert_config_error():
    """
    Test that the SslCertConfig form is invalid with incorrect data.
    """
    config = SslCertCheck.config_class({"hostname": "example.com", "port": 443, "alert_days": 0})
    assert not config.is_valid()
    assert config.errors == {"alert_days": ["Ensure this value is greater than or equal to 1."]}
