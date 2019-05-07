from flask import session, get_flashed_messages
from slugify import slugify

import birder

from .app import app


@app.template_filter()
def slug(value):
    """Convert a string to all caps."""
    return slugify(value)


@app.template_filter()
def name(value):
    return slugify(value, separator='_', decimal=False, hexadecimal=False, )


@app.context_processor
def globals():
    return dict(
        version=birder.VERSION,
        user=session.get('user'),
        basic_auth=bool(app.config.get('ADMINS')),
        messages=get_flashed_messages(True)
    )
