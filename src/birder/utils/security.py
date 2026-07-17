import ipaddress
import secrets
import socket
from urllib.parse import urlparse


def get_random_token() -> str:
    from constance import config

    return secrets.token_urlsafe(config.TOKEN_LENGTH)


def validate_url_not_private(url: str) -> None:
    """Reject URLs that resolve to private or reserved IP addresses (SSRF guard)."""
    hostname = urlparse(url).hostname
    if not hostname:
        return
    try:
        addrs = socket.getaddrinfo(hostname, None)
    except OSError:
        return
    for family, _type, _proto, _cname, sockaddr in addrs:
        if family == socket.AF_INET6:
            continue
        try:
            ip = ipaddress.ip_address(sockaddr[0])
        except ValueError:
            continue
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved:
            raise ValueError(f"Refusing to connect to private IP: {sockaddr[0]}")
