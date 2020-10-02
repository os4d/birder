import json
import logging

from colour import Color
from flask import (Blueprint, flash, g, make_response, redirect,
                   render_template, request, session, url_for)
from flask_cors import CORS, cross_origin

from ..checks import Factory
from ..config import get_targets, get_target
from ..monitor.tsdb import client, stats
from ..utils import has_no_empty_params, hour_rounder, jsonify, tz_now
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


@bp.route('/add/', methods=['POST'])
def add():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    if not session.get("user"):
        return redirect(referrer)
    try:
        label = request.form['label']
        conn = request.form['url']
        t = Factory.from_conn_string(label, conn)
        existing = client.hgetall("monitors")
        existing[t.name] = conn
        client.hmset('monitors', existing)

        get_targets.cache_clear()

        return jsonify({}), 200
    except Exception as e:
        logger.exception(e)
        return jsonify({'error': str(e)}), 400


@bp.route('/logout/')
def logout():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    session['user'] = ""
    flash('You were successfully logged out', 'warning')
    return redirect(referrer)


@bp.route('/')
def home():
    services = []
    for target in get_targets():
        services.append((target, client.get(target.ts_name)))
    r = make_response(render_template('index.html', services=services))
    return r


@bp.route('/about/')
def about():
    r = make_response(render_template('about.html', page="about"))
    return r


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


@bp.route('/data/<hkey>/<granularity>/', methods=['GET', 'OPTIONS'])
@cross_origin(origins=app.config['CORS_ALLOW_ORIGIN'])
def data(hkey, granularity):
    if granularity in app.config['GRANULARITIES']:
        ts = tz_now()
        start_at = hour_rounder(ts)

        errors = stats.get_errors(hkey, granularity)
        pings = stats.get_pings(hkey, granularity)

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

        ret = {'datapoints': len(values),
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
    targets = get_targets()
    if granularity == 'h':
        refresh = app.config['REFRESH_INTERVAL'] * 1000
    else:
        refresh = 0

    if granularity in app.config['GRANULARITIES']:
        r = make_response(render_template('chart.html',
                                          refresh=refresh,
                                          names=json.dumps([t.ts_name for t in targets]),
                                          targets=targets,
                                          granularity=granularity,
                                          colors=[(i, c.hex) for i, c in enumerate(red.range_to(Color("red"), 10), 2)],
                                          page=granularity,
                                          ))
        return r
    return "", 404


@bp.route('/api/add/', methods=['POST'])
@api_authenticate
def api_add():
    try:
        data = request.get_json()
        label = data["label"]
        conn = data['url']
        Factory.from_conn_string(label, conn)

        existing = client.hgetall("monitors")
        existing[label] = conn
        client.hmset('monitors', existing)

        get_targets.cache_clear()

        return jsonify({"message": f"'{label}' added"})
    except Exception as e:
        logger.exception(e)
        return str(e), 400

@bp.route('/api/edit/<hkey>/', methods=['POST'])
@api_authenticate
def api_edit(hkey):
    try:
        data = request.get_json()
        label = data["label"]
        conn = data['url']
        Factory.from_conn_string(label, conn)
        t = get_target(hkey)
        deleted = client.hdel("monitors", hkey)
        get_targets.cache_clear()

        existing = client.hgetall("monitors")
        existing[label] = conn
        client.hmset('monitors', existing)

        get_targets.cache_clear()

        return jsonify({"message": f"'{label}' added"})
    except Exception as e:
        logger.exception(e)
        return str(e), 400

@bp.route('/api/sort/', methods=['POST'])
@api_authenticate
def api_sort():
    try:
        data = request.get_json()
        order = data['order']
        order.reverse()
        p = client.pipeline()
        p.delete("order")
        p.lpush("order", *order)
        p.execute()
        order1 = client.lrange("order", 0, client.llen("order"))
        get_targets.cache_clear()
        return jsonify({"order": list(map(lambda s: s.decode(), order1))})
    except BaseException as e:
        return str(e), 400


@bp.route('/api/del/<name>/', methods=['DELETE'])
@api_authenticate
def api_del(name):
    try:
        deleted = client.hdel("monitors", name)
        get_targets.cache_clear()
        return jsonify({"message": f"{deleted} entries deleted",

                        })
    except Exception as e:
        return str(e), 400


@bp.route('/api/inspect/', methods=['GET'])
@api_authenticate
def api_inspect():
    try:
        ret = {}
        existing = client.hgetall("monitors")
        for k, v in existing.items():
            ret[k.decode()] = v.decode()
        return jsonify({"monitors": ret})
    except Exception as e:
        return str(e), 400


@bp.route('/api/list/', methods=['GET'])
@api_authenticate
def api_list():
    try:
        ret = {}
        for target in get_targets():
            ret[target.ts_name] = [target.name, target.url]
        return jsonify({"monitors": ret})
    except Exception as e:
        return str(e), 400


@bp.route('/api/env/', methods=['GET'])
@api_authenticate
def api_env():
    """returns endpoints as environment varialbles list """
    try:
        ret = []
        for i, target in enumerate(get_targets()):
            ret.append(f"MONITORo{i}_{target.name}={target.url}")
        return "\n".join(ret)
    except Exception as e:
        return str(e), 400
