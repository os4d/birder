import birder
from flask import get_flashed_messages, session
from slugify import slugify

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
        user=session.get('user', None),
        basic_auth=bool(app.config.get('ADMINS')),
        messages=get_flashed_messages(True)
    )
