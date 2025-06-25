from .. import env

SUPERUSERS = env("SUPERUSERS")
ENVIRONMENT = env("ENVIRONMENT") or ["production", "warn"]
