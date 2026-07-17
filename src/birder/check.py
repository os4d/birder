from typing import TYPE_CHECKING, Any

from django.conf import settings
from django.core import checks

if TYPE_CHECKING:
    from collections.abc import Iterable, Sequence

    from django.apps import AppConfig


WEAK_SECRETS = {"sensitive-secret-key", ""}


def check_crypt(
    app_configs: "Sequence[AppConfig]", databases: "Sequence[str] | None", **kwargs: Any
) -> "Iterable[checks.CheckMessage]":
    errors: list[checks.CheckMessage] = []
    if not settings.SALT_KEY:
        errors.append(checks.Error("CRYPT_SALT_KEY env var must be a list of Fernet keys"))
    if not settings.SECRET_KEY_FALLBACKS:
        errors.append(checks.Error("CRYPT_KEYS env var must be a list of Fernet keys"))
    if settings.SECRET_KEY in WEAK_SECRETS:
        errors.append(checks.Critical("SECRET_KEY is empty or set to a known weak default value"))
    return errors


MIN_HSTS_SECONDS = 31_536_000  # 1 year


def check_hsts(
    app_configs: "Sequence[AppConfig]", databases: "Sequence[str] | None", **kwargs: Any
) -> "Iterable[checks.CheckMessage]":
    errors: list[checks.CheckMessage] = []
    hsts = settings.SECURE_HSTS_SECONDS
    if hsts is None:
        return errors
    if hsts == 0:
        errors.append(checks.Warning("SECURE_HSTS_SECONDS is 0. HSTS is effectively disabled."))
    elif 0 < hsts < MIN_HSTS_SECONDS:
        errors.append(
            checks.Warning(
                f"SECURE_HSTS_SECONDS is set to {hsts} seconds "
                f"(less than 1 year). Browsers will only remember HTTPS for this short period."
            )
        )
    return errors
