#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020

from functools import wraps
from flask import session, redirect, request, url_for, g

from birder.utils import jsonify
from birder.web.app import basic_auth


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('user'):
            return redirect('/')
        return f(*args, **kwargs)

    return decorated_function


def api_authenticate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get("user"):
            if not basic_auth.authenticate():
                return jsonify({}), 403
        return f(*args, **kwargs)

    return decorated_function
