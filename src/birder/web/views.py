from datetime import datetime as dt
from json import dumps

from flask import Blueprint, make_response, redirect, render_template, request, session

from ..config import targets
from ..monitor.tsdb import client, stats, units
from .app import app, template_dir


def jsonify(**kwargs):
    response = make_response(dumps(kwargs))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['mimetype'] = 'application/json'
    response.last_modified = dt.utcnow()
    response.add_etag()
    return response


bp = Blueprint('birder', __name__, template_folder=template_dir)


@bp.route('/login/', methods=['POST'])
def login():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    username = request.form['username']
    if username:
        ok = app.config["ADMINS"].get(username) == request.form['password']
        if ok:
            session['user'] = request.form['username']

    return redirect(referrer)


@bp.route('/logout/')
def logout():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    session['user'] = ""
    return redirect(referrer)


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
        refresh = 0
        if granularity == '60m':
            refresh = app.config['REFRESH_INTERVAL']
        r = make_response(render_template('chart.html',
                                          urls=targets,
                                          granularity=granularity,
                                          page=granularity,
                                          unit=units[granularity],
                                          refresh=refresh,
                                          ))
        return r
    return "", 404
