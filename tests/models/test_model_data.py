from testutils.factories.monitor import DataHistoryFactory


def test_str(db):
    assert str(DataHistoryFactory())
