from functools import wraps

from flask import session
from flask_basicauth import BasicAuth

from birder.logging import logger


class Auth(BasicAuth):
    def check_credentials(self, username, password):
        ok = self.app.config["ADMINS"].get(username) == password
        if ok:
            logger.info("User '%s' logged in" % username)
            session['user'] = username
        return ok

    def logout(self, view_func):
        @wraps(view_func)
        def wrapper(*args, **kwargs):
            logger.info("User '%s' logged out" % session['user'])
            session['user'] = ""
            return self.challenge()
        return wrapper
