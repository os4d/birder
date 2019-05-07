import os

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_caching import Cache

from ..config import Config

here = os.path.dirname(__file__)

template_dir = os.path.abspath(os.path.join(here, 'templates'))
static_dir = os.path.abspath(os.path.join(here, 'static'))
app = Flask("birder", template_folder=template_dir, static_folder=static_dir,
            static_url_path="%s/static" % Config.URL_PREFIX)

app.config.from_object('birder.config.Config')

bootstrap = Bootstrap(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

from . import views  # isort:skip
from . import template_utils  # noqa isort:skip

app.register_blueprint(views.bp, url_prefix=app.config['URL_PREFIX'])
