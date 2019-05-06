import time
from collections import OrderedDict
from functools import wraps

from time import strftime, strptime

from flask import make_response, render_template, request, redirect, session, Blueprint

from ..config import targets
from ..monitor.tsdb import stats, client, units
from .app import app, basic_auth, cache, template_dir
from datetime import datetime as dt, timedelta, datetime
from json import dumps


def jsonify(**kwargs):
    response = make_response(dumps(kwargs))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['mimetype'] = 'application/json'
    response.last_modified = dt.utcnow()
    response.add_etag()
    return response


bp = Blueprint('birder', __name__, template_folder=template_dir)


@bp.route('/login/')
@basic_auth.required
def login():
    return redirect("/")


@bp.route('/logout/')
@basic_auth.logout
def logout():
    session['user'] = ""
    return "", 401


@bp.route('/')
def home():
    services = []
    for target in targets:
        services.append((target, client.get(target.ts_name)))
    r = make_response(render_template('index.html', services=services))
    return r


@bp.route('/about/')
def about():
    r = make_response(render_template('about.html', page="about"))
    return r


@bp.route('/data/<hkey>/<granularity>/')
def data(hkey, granularity):
    if granularity in app.config['GRANULARITIES']:
        data = stats.get_data(hkey, granularity)
        ret = {"ok": [{"t": i[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ'), "y": i[1]} for i in data[0]],
               "fails": [{"t": i[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ'), "y": i[1]} for i in data[1]]}
        return jsonify(**ret)
    return "", 404


@bp.route('/<granularity>/')
def chart(granularity):
    if granularity in app.config['GRANULARITIES']:
        r = make_response(render_template('chart.html',
                                          urls=targets,
                                          granularity=granularity,
                                          page=granularity,
                                          unit=units[granularity],
                                          refresh=0,
                                          ))
        return r
    return "", 404
