import logging
import os

import sentry_sdk
from flask import Flask, g, session
from flask.logging import default_handler
from flask_basicauth import BasicAuth
from flask_bootstrap import Bootstrap
from flask_caching import Cache
from flask_cors import CORS
from sentry_sdk.integrations.flask import FlaskIntegration
from werkzeug.middleware.proxy_fix import ProxyFix

from ..config import Config, init_monitor_storage

logger = logging.getLogger(__name__)

here = os.path.dirname(__file__)

if Config.SENTRY_DSN:
    sentry_sdk.init(
        dsn=Config.SENTRY_DSN,
        integrations=[FlaskIntegration()]
    )


class BirderBasicAuth(BasicAuth):

    def check_credentials(self, username, password):
        return app.config["ADMINS"].get(username) == password


template_dir = os.path.abspath(os.path.join(here, 'templates'))
static_dir = os.path.abspath(os.path.join(here, 'static'))
app = Flask("birder", template_folder=template_dir, static_folder=static_dir,
            static_url_path="%s/static" % Config.URL_PREFIX)

app.config.from_object('birder.config.Config')

bootstrap = Bootstrap(app)
basic_auth = BirderBasicAuth(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})
CORS(app, supports_credentials=True, origins=app.config['CORS_ALLOW_ORIGIN'])
app.wsgi_app = ProxyFix(app.wsgi_app)

from . import views  # isort:skip
from . import template_utils  # noqa isort:skip

app.register_blueprint(views.bp, url_prefix=app.config['URL_PREFIX'])
app.logger.removeHandler(default_handler)


@app.before_request
def before_request():
    g.user = session.get('user', None)

init_monitor_storage()
