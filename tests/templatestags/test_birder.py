from birder.templatetags.birder import status


def test_status():
    assert status("ok")
    assert status("ko")
