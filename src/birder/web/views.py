import datetime
import json

from colour import Color
from flask import (Blueprint, flash, make_response, redirect, render_template,
                   request, session)
from flask_cors import CORS, cross_origin

from ..config import get_targets
from ..monitor.tsdb import client, stats
from ..utils import hour_rounder, tz_now
from .app import app, template_dir


class Encoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        return json.JSONEncoder.default(self, obj)


def jsonify(*args):
    response = make_response(json.dumps(*args, cls=Encoder))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['mimetype'] = 'application/json'
    response.last_modified = datetime.datetime.utcnow()
    response.add_etag()
    return response


bp = Blueprint('birder', __name__, template_folder=template_dir)
CORS(bp)


@bp.route('/login/', methods=['POST'])
def login():
    referrer = request.headers.get("Referer", "%s/" % app.config['URL_PREFIX'])
    username = request.form['username']
    if username:
        ok = app.config["ADMINS"].get(username) == request.form['password']
        if ok:
            session['user'] = request.form['username']
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
    for target in get_targets():
        services.append((target, client.get(target.ts_name)))
    r = make_response(render_template('index.html', services=services))
    return r


@bp.route('/about/')
def about():
    r = make_response(render_template('about.html', page="about"))
    return r


@bp.route('/data/<hkey>/<granularity>/', methods=['GET', 'OPTIONS'])
@cross_origin(origins=app.config['CORS_ALLOW_ORIGIN'])
def data(hkey, granularity):
    if granularity in app.config['GRANULARITIES']:
        ts = tz_now()
        start_at = hour_rounder(ts)
        # errors = stats.get_buckets(hkey, granularity, count=-1, timestamp=start_at)

        errors = stats.get_errors(hkey, granularity)
        pings = stats.get_pings(hkey, granularity)

        values = []
        for err, ping in zip(errors, pings):
            # ts = err[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            # dt = err[0].timestamp()
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

        # for error in errors:
        #     if error[1] == 0:
        #         values.append({'timestamp': error[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
        #                        'date': error[0].timestamp(),
        #                        'value': None,
        #                        })
        #     elif error[1] > 0:
        #         values.append({'timestamp': error[0].strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
        #                        'date': error[0].timestamp(),
        #                        'value': error[1],
        #                        })

        ret = {'datapoints': len(values),
               'errors': [e[1] for e in errors],
               'pings': [e[1] for e in pings],
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
                                          names=",".join([t.ts_name for t in targets]),
                                          targets=targets,
                                          granularity=granularity,
                                          colors=[(i, c.hex) for i, c in enumerate(red.range_to(Color("red"), 10), 2)],
                                          page=granularity,
                                          ))
        return r
    return "", 404
