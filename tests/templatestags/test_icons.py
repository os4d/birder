from birder.templatetags.icons import icon, status


def test_status():
    assert status(True)
    assert status(False)


def test_icon():
    assert icon("test")
