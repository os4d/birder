import "d3/d3.js";
// import "moment/moment.js"

import "cal-heatmap/cal-heatmap.css";
// import "calendar-heatmap-graph/src/calendar-heatmap.css";
// import "calendar-heatmap-graph/src/calendar-heatmap.js";
import "./css/charts.scss";

import "bootstrap-toggle/css/bootstrap-toggle.css";
import "bootstrap-toggle/js/bootstrap-toggle.js";


window.d3 = require('d3');
window.moment = require('moment');
// window.calendarHeatmap = calendarHeatmap;

window.chart_config = {
    '60m': {
        refresh: 0,
        domain: 'hour',
        subDomain: 'min',
        datapoints: 60,
        domainGutter:4,
        colLimit: 6,
    },
    '24h': {
        'refresh': 0,
        'domain': 'day',
        'subDomain': 'hour',
        'datapoints': 24,
        range: 1,
        colLimit: 24
    },
    '7d': {
        'refresh': 0,
        'domain': 'week',
        'subDomain': 'day',
        range: 7,
        // colLimit: 24

    },
    '30d': {
        'refresh': 0,
        'domain': 'day',
        'subDomain': 'hour',
        range: 30,
        colLimit: 24

    },
};
