import datetime
import socket
import ssl
from unittest import mock

import pytest
from freezegun import freeze_time

from birder.checks.ssl import SslCheck
from birder.exceptions import CheckError


@pytest.fixture
def mock_ssl_socket():
    """Fixture to mock the SSL socket and certificate retrieval."""
    with (
        mock.patch("socket.create_connection") as mock_create_conn,
        mock.patch("ssl.create_default_context") as mock_create_context,
    ):
        mock_sock = mock.MagicMock(spec=socket.socket)
        mock_ssock = mock.MagicMock(spec=ssl.SSLSocket)

        # Mock the context manager __enter__ and __exit__
        mock_create_conn.return_value = mock_sock
        mock_sock.__enter__.return_value = mock_sock

        mock_context = mock.MagicMock()
        mock_create_context.return_value = mock_context
        mock_context.wrap_socket.return_value = mock_ssock
        mock_ssock.__enter__.return_value = mock_ssock

        def configure_cert(expiry_days_from_now):
            expiry_date = datetime.datetime.utcnow() + datetime.timedelta(days=expiry_days_from_now)
            mock_ssock.getpeercert.return_value = {
                "notAfter": expiry_date.strftime("%b %d %H:%M:%S %Y GMT"),
                "issuer": ((("countryName", "US"),), (("organizationName", "Let's Encrypt"),)),
            }

        mock_ssock.configure_cert = configure_cert
        yield mock_ssock


@freeze_time("2025-01-01")
def test_ssl_check_ok(mock_ssl_socket):
    """Test a successful SSL check where the certificate is valid for many days."""
    mock_ssl_socket.configure_cert(expiry_days_from_now=90)
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is True
    assert check.status["level"] == "ok"
    assert check.status["days_left"] > 30


@freeze_time("2025-01-01")
def test_ssl_check_warning(mock_ssl_socket):
    """Test an SSL check that falls into the 'amber' warning threshold."""
    mock_ssl_socket.configure_cert(expiry_days_from_now=25)
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is True  # Still returns True, but status is 'warning'
    assert check.status["level"] == "warning"
    assert 10 < check.status["days_left"] <= 30


@freeze_time("2025-01-01")
def test_ssl_check_critical(mock_ssl_socket):
    """Test an SSL check that falls into the 'red' critical threshold."""
    mock_ssl_socket.configure_cert(expiry_days_from_now=5)
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is False
    assert check.status["level"] == "critical"
    assert check.status["days_left"] <= 10


@freeze_time("2025-01-01")
def test_ssl_check_exact_red_threshold(mock_ssl_socket):
    """Test the boundary condition for the critical threshold."""
    mock_ssl_socket.configure_cert(expiry_days_from_now=10)
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is False
    assert check.status["level"] == "critical"
    assert check.status["days_left"] == 10


@freeze_time("2025-01-01")
def test_ssl_check_exact_amber_threshold(mock_ssl_socket):
    """Test the boundary condition for the warning threshold."""
    mock_ssl_socket.configure_cert(expiry_days_from_now=30)
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is True
    assert check.status["level"] == "warning"
    assert check.status["days_left"] == 30


def test_ssl_check_connection_error():
    """Test how the check handles a connection error."""
    with mock.patch("socket.create_connection", side_effect=socket.timeout("Connection timed out")):
        check = SslCheck(
            configuration={
                "url": "https://example.com",
                "amber_days": 30,
                "red_days": 10,
                "timeout": 2,
            }
        )
        assert check.check() is False
        assert "error" in check.status
        assert "timed out" in check.status["error"]

        with pytest.raises(CheckError):
            check.check(raise_error=True)


def test_ssl_check_no_cert(mock_ssl_socket):
    """Test the case where the peer returns no certificate."""
    mock_ssl_socket.getpeercert.return_value = None
    check = SslCheck(
        configuration={
            "url": "https://example.com",
            "amber_days": 30,
            "red_days": 10,
            "timeout": 5,
        }
    )
    assert check.check() is False
    assert "error" in check.status
    assert "Could not retrieve peer certificate" in check.status["error"]
