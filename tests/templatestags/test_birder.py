from birder.templatetags.birder import number, status


def test_status():
    assert status("ok")
    assert status("ko")
    assert status("")


def test_number():
    assert number("1")
    assert number("99")
    assert number("")
