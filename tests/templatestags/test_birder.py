from datetime import datetime

import freezegun
from constance.test import override_config
from django.template import Context, Template

from birder.templatetags.birder import format_date, number, status


def test_status():
    assert status("ok")
    assert status("ko")
    assert status("")


def test_number():
    assert number("1")
    assert number("99")
    assert number("")


def test_absolute_url(rf):
    req = rf.get("/")
    tpl = Template("{% load birder %}{% absolute_url 'index' %}")
    assert tpl.render(Context({"request": req, "aaa": "/"}))


@override_config(DATETIME_FORMAT="%Y %B %d - %H:%M")
def test_format_date(db):
    assert format_date(None) == "-"
    with freezegun.freeze_time("2020-12-31 09:10:05"):
        assert format_date(datetime.now()) == "2020 December 31 - 09:10"
