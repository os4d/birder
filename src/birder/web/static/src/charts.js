/**
 * chart.js
 */

// import "d3/d3.js";

import "cal-heatmap/cal-heatmap.css";
import "./css/charts.scss";

import "bootstrap-toggle/css/bootstrap-toggle.css";
import "bootstrap-toggle/js/bootstrap-toggle.js";


window.d3 = require('d3');
window.moment = require('moment');

var today = moment();
var lastHour = today.clone().startOf('hour');
var yesterday = today.clone().subtract(1, 'days');
var lastMonth = today.clone().subtract(1, 'months');
var thisWeek = today.clone().startOf('week');
var thisYear = today.clone().startOf('year');

var granularityConfig = {
    'h': {
        cellSize: 32,
        colLimit: 2,
        displayErrors: function () {
            return '!'
        },
        domain: 'hour',
        range: 1,
        start: lastHour.toDate(),
        subDomain: 'x_min',
        verticalOrientation: true,
        domainLabelFormat: "%H:%M",
        subDomainDateFormat: "%H:%M",

    },
    'd': {
        cellSize: 43,
        colLimit: 1,
        domain: 'day',
        domainGutter: 10,
        range: 1,
        start: today.toDate(),
        subDomain: 'x_hour',
        domainLabelFormat: "%a, %d %B",
        subDomainDateFormat: "%H:%M",
    },
    'w': {
        cellSize: 30,
        colLimit: 6,
        domain: 'day',
        domainGutter: 15,
        range: 7,
        start: thisWeek.toDate(),
        subDomain: 'x_hour',
        domainLabelFormat: "%a, %d %B",
        subDomainDateFormat: "%H:%M",
    },
    'm': {
        cellSize: 20,
        domain: 'day',
        subDomain: 'hour',
        start: today.clone().startOf('month').toDate(),
        verticalOrientation: true,
        range: 31,
        rowLimit: 1,
        label: {
            position: "left",
            offset: {
                x: 20,
                y: 12
            },
            width: 110
        },
        legendHorizontalPosition: "right",
        domainLabelFormat: "%a, %d %B",
        subDomainDateFormat: "%H:%M",
        noData: ''
    },
    'y': {
        cellSize: 15,
        domain: 'month',
        legendHorizontalPosition: "right",
        maxDate: thisYear.toDate(),
        minDate: thisYear.toDate(),
        start: thisYear.toDate(),
        subDomain: 'day',
        success: '',
        noData: '',
        displayErrors: function (value) {
            return ''
        },

    },
};


var noop = function () {
};

var commonConfig = {
    cellSize: 12,
    cellPadding: 2,
    cellRadius: 2,
    maxDate: today.toDate(),
    itemName: ['error', 'errors'],
    noData: 'n/a',
    success: 'ok',
    displayErrors: function (value) {
        return value
    },
    subDomainTextFormat: function (date, value) {
        if (value === undefined) {
            return
        }
        if (value === null) {
            return this.noData
        }
        if (value === 0) {
            return this.success
        }
        return this.displayErrors(value)
    },
    label: {
        position: "top"
    },
    afterLoadData: function (data) {
        var stats = {};
        if (data) {
            for (var d in data.values) {
                if (d) {
                    stats[data.values[d].date] = data.values[d].value;
                }
            }
        }
        return stats;
    },
    tooltip: true,
    displayLegend: false,
    legend: [0, 1, 5, 10, 20],
};

var getChart = function (name, granularity, urlPrefix) {
    var cal = new CalHeatMap();
    var localCfg = $.extend({}, calCfg, {
        itemSelector: "#chart-" + name,
        itemNamespace: name,
        data: urlPrefix + "/data/" + name + "/" + granularity,
        nextSelector: "#next" + name,
        previousSelector: "#previous" + name

    });
    cal._data = localCfg.data;
    cal.graphDim.height = 0;
    cal.init(localCfg);
    return cal
};
var initChartPage = function () {
    $.extend($.scrollTo.defaults, {
        axis: 'y',
        duration: 0
    });
    $(".menu-item").click(function (e) {
        e.preventDefault();
        var linkId = $(this).attr('href');
        $.scrollTo($(linkId).offset().top - 65);
        return false;
    });

};

window.chartConfig = {
    granularity: granularityConfig,
    common: commonConfig,
    getChart: getChart,
    initChartPage: initChartPage

};
