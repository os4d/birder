from typing import TYPE_CHECKING, Any

from django.conf import settings
from django.core import checks

if TYPE_CHECKING:
    from collections.abc import Iterable, Sequence

    from django.apps import AppConfig


def check_crypt(
    app_configs: "Sequence[AppConfig]", databases: "Sequence[str] | None", **kwargs: Any
) -> "Iterable[checks.CheckMessage]":
    errors = []
    if not settings.SALT_KEY:
        errors.append(checks.Error("CRYPT_SALT_KEY env var must be a list of Fernet keys"))
    if not settings.SECRET_KEY_FALLBACKS:
        errors.append(checks.Error("CRYPT_KEYS env var must be a list of Fernet keys"))
    return errors
