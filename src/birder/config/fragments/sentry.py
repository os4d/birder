import logging

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

import birder

from .. import env
from . import app

SENTRY_DSN = env("SENTRY_DSN")
sentry_logging = LoggingIntegration(
    level=logging.INFO,  # Capture info and above as breadcrumbs
    event_level=logging.ERROR,  # Send errors as events
)
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment=app.ENVIRONMENT[0],
        integrations=[
            DjangoIntegration(transaction_style="url"),
            sentry_logging,
        ],
        release=birder.VERSION,
        send_default_pii=True,
    )
