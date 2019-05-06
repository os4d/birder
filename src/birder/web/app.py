import os
from pathlib import Path

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_caching import Cache
from flask_session import Session

from birder.config import Config
from .auth import Auth

here = os.path.dirname(__file__)

template_dir = os.path.abspath(os.path.join(here, 'templates'))
static_dir = os.path.abspath(os.path.join(here, 'static'))
app = Flask("birder", template_folder=template_dir, static_folder=static_dir,
            static_url_path="%s/static" % Config.URL_PREFIX)

app.config.from_object('birder.config.Config')

bootstrap = Bootstrap(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
basic_auth = Auth(app)
session = Session(app)

from . import views
from . import template_utils


app.register_blueprint(views.bp, url_prefix=app.config['URL_PREFIX'])
