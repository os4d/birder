from django.template import Context, Template

from birder.templatetags.birder import number, status


def test_status():
    assert status("ok")
    assert status("ko")
    assert status("")


def test_number():
    assert number("1")
    assert number("99")
    assert number("")


def test_absolute_url(rf):
    """load birder {% absolute_url aaa %}"""
    req = rf.get("/")
    tpl = Template("{% load birder %}{% absolute_url 'index' %}")
    assert tpl.render(Context({"request": req, "aaa": "/"}))
