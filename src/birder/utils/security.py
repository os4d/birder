import secrets


def get_random_token() -> str:
    from constance import config

    return secrets.token_urlsafe(config.TOKEN_LENGTH)
