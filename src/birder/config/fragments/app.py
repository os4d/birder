from .. import env

SUPERUSERS = env("SUPERUSERS")
ENVIRONMENT = env("ENVIRONMENT") or ["develop", "info"]
