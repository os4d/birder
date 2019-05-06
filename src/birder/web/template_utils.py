from flask import session
from markupsafe import Markup

import birder
from ..checks import Target
from .app import app
from slugify import slugify


@app.template_filter()
def slug(value):
    """Convert a string to all caps."""
    return slugify(value)


@app.template_filter()
def icon(target: Target):
    """Convert a string to all caps."""
    return ""


@app.template_filter()
def name(value):
    """Convert a string to all caps."""
    return slugify(value, separator='_', decimal=False, hexadecimal=False, )


@app.context_processor
def globals():
    return dict(
                # title=app.config['SITE_TITLE'],
                # refresh=app.config['REFRESH_INTERVAL'],
                # display_urls=app.config['DISPLAY_URLS'],
                version=birder.VERSION,
                user=session.get('user'),
                basic_auth=bool(app.config.get('ADMINS'))
                )
