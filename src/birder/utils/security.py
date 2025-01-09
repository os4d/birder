import secrets


def get_random_token() -> str:
    return secrets.token_urlsafe(255)
