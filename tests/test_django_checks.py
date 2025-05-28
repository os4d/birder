from unittest.mock import Mock

from birder.check import check_crypt


def test_check_crypt(settings):
    assert not check_crypt(Mock(), [])
    settings.SALT_KEY = []
    assert check_crypt(Mock(), [])

    settings.SECRET_KEY_FALLBACKS = []
    assert check_crypt(Mock(), [])
