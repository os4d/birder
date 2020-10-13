import json
import logging

from colour import Color
from flask import (Blueprint, flash, g, make_response, redirect,
                   render_template, request, session, url_for, Response, )
from flask_cors import CORS, cross_origin

from birder.checks import Factory
from birder.core.redis import client
from birder.core.registry import registry
from birder.core.tsdb import stats
from birder.utils import has_no_empty_params, hour_rounder, jsonify, tz_now

from .app import app, basic_auth, template_dir
from .decorators import api_authenticate, login_required

logger = logging.getLogger(__name__)

bp = Blueprint('birder', __name__, template_folder=template_dir)
CORS(bp)


@bp.route('/login/', methods=['POST'])
def login():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    username = request.form['username']
    if username:
        ok = basic_auth.check_credentials(username, request.form['password'])
        # ok = app.config["ADMINS"].get(username) == request.form['password']
        if ok:
            g.user = session['user'] = request.form['username']
            flash('You were successfully logged in', 'success')
        else:
            flash('Authentication failed', 'danger')

    return redirect(referrer)


@bp.route('/logout/')
def logout():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    session['user'] = ""
    flash('You were successfully logged out', 'warning')
    return redirect(referrer)


@bp.route('/')
def home():
    services = []
    for target in registry:
        services.append((target, client.get(target.pk)))
    r = make_response(render_template('index.html', services=services))
    return r


@bp.route('/about/')
def about():
    r = make_response(render_template('about.html', page="about"))
    return r


@bp.route('/api/data/<pk>/<granularity>/', methods=['GET', 'OPTIONS'])
@cross_origin(origins=app.config['CORS_ALLOW_ORIGIN'])
def data(pk, granularity):
    if granularity in app.config['GRANULARITIES']:
        ts = tz_now()
        start_at = hour_rounder(ts)

        errors = stats.get_errors(pk, granularity)
        pings = stats.get_pings(pk, granularity)

        values = []
        for err, ping in zip(errors, pings):
            record = {
                'timestamp': err[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                'date': err[0].timestamp()
            }
            if err[1] > 0:
                record['value'] = err[1]
            elif ping[1] > 0:
                record['value'] = 0
            if 'value' in record:
                values.append(record)
        try:
            t = registry[pk]
        except KeyError:
            ret = {}
        else:
            ret = {'datapoints': len(values),
                   'target': t.name,
                   'url': t.url,
                   # 'errors': [e[1] for e in errors],
                   # 'pings': [e[1] for e in pings],
                   'values': values,
                   'ts': ts,
                   'start': start_at}
        return jsonify(ret)
    return "", 404


@bp.route('/scan/<hkey>/<granularity>/', methods=['GET', 'OPTIONS'])
def scan(hkey, granularity):
    if granularity in app.config['GRANULARITIES']:
        data = stats.scan_keys('24h', 5, '*')
        ret = {'datapoints': len(data),
               'data': data}
        return jsonify(ret)
    return "", 404


@bp.route('/<granularity>/', methods=['GET', 'OPTIONS'])
@cross_origin(origins=app.config['CORS_ALLOW_ORIGIN'])
def chart(granularity):
    red = Color("#ff8a76")
    if granularity == 'h':
        refresh = app.config['REFRESH_INTERVAL'] * 1000
    else:
        refresh = 0

    if granularity in app.config['GRANULARITIES']:
        r = make_response(render_template('chart.html',
                                          refresh=refresh,
                                          names=json.dumps([t.pk for t in registry]),
                                          targets=registry,
                                          disabled=registry.disabled(),
                                          granularity=granularity,
                                          colors=[(i, c.hex) for i, c in enumerate(red.range_to(Color("red"), 10), 2)],
                                          page=granularity,
                                          ))
        return r
    return "", 404


@bp.route('/api/')
@login_required
def api_root():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if url.startswith('/api/'):
                links.append((url, rule.endpoint))

    r = make_response(render_template('api.html', page="API", endpoints=links))
    return r


@bp.route('/api/add/', methods=['POST'])
@api_authenticate
def api_add():
    try:
        data = request.get_json()
        label = data["label"]
        init_string = data['url']

        registry.add_dynamic(label, init_string)
        return jsonify({"message": f"'{label}' added"})
    except Exception as e:
        logger.exception(e)
        return str(e), 400


@bp.route('/api/edit/<hkey>/', methods=['POST'])
@api_authenticate
def api_edit(hkey):
    try:
        existing = registry[hkey]
        data = request.get_json()
        label = data["label"]
        init_string = data['url']
        overrides = {'label': label}
        if init_string != existing.url:
            copy = Factory.from_conn_string(label, init_string)
            copy.check()
            stats.zap(existing.name)
            overrides['init_string'] = init_string

        registry.override(hkey, **overrides)
        return jsonify({"message": f"'{hkey}' updated"})
    except Exception as e:
        logger.exception(e)
        return str(e), 400


@bp.route('/api/sort/', methods=['POST'])
@api_authenticate
def api_sort():
    try:
        data = request.get_json()
        order = data['order']
        registry.sort_by(order)
        return jsonify({"order": registry.order})
    except BaseException as e:
        logger.exception(e)
        return str(e), 400


@bp.route('/api/del/<hkey>/', methods=['DELETE'])
@api_authenticate
def api_del(hkey):
    try:
        registry.remove(hkey)
        return jsonify({"message": f"{hkey} deleted"})
    except Exception as e:
        return f"{type(e).__name__}: {e}", 400


@bp.route('/api/enable/<hkey>/', methods=['GET'])
@api_authenticate
def api_enable(hkey):
    try:
        registry.enable(hkey)
    except Exception as e:
        pass
    return redirect(request.referrer)


@bp.route('/api/inspect/', methods=['GET'])
@api_authenticate
def api_inspect():
    try:
        ret = {}
        values = registry._checks()
        for __, target in values.items():
            ret[target.pk] = [target.label, target.url, target.enabled]
        return jsonify({"monitors": ret,
                        "order": registry.order})
    except Exception as e:
        return str(e), 400


@bp.route('/api/list/', methods=['GET'])
@api_authenticate
def api_list():
    try:
        ret = {}
        for target in registry:
            ret[target.pk] = [target.label, target.url, target.enabled]
        return jsonify({"monitors": ret})
    except Exception as e:
        return str(e), 400

@bp.route('/api/check/', methods=['GET'])
@api_authenticate
def api_check():
    try:
        return jsonify({"timestamp": client.get('timestamp').decode()})
    except Exception as e:
        return str(e), 400
#
#
# @bp.route('/api/env/', methods=['GET'])
# @api_authenticate
# def api_env():
#     """returns endpoints as environment varialbles list """
#     ret = []
#     for c in registry:
#         try:
#             ret.append(f'{c.pk}="{c.label}|{c.init_string}"')
#         except Exception as e:
#             pass
#     return Response("\n".join(ret), mimetype='text/plain')
#
