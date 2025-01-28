from datetime import datetime, timedelta

import pytest
from bitarray import bitarray

from birder.db import DataStore
from birder.models import Monitor


@pytest.fixture
def ds(monitor: Monitor):
    return DataStore(monitor, prefix=datetime.now().strftime("%Y%m%d%H%M%S"))


def test_ds_get_all_entries(ds):
    assert ds.get_all_entries(datetime(2020, 1, 1))


def test_ds_get_hour_entries(ds):
    assert ds.get_hour_entries(datetime(2020, 1, 1))
    assert ds.get_hour_entries(datetime(2020, 1, 1), 14)


def test_ds_store_error(ds):
    assert ds.store_error(datetime(2020, 1, 1, 1, 0, 0, 0)) == 60


def test_ds_flow(ds):
    dt = datetime(2020, 1, 1, 1, 0, 0, 0)
    assert ds.get_all_entries(dt) == bitarray(1440)
    assert ds.store_error(dt) == 60
    assert ds.get_hour_entries(dt)[0] == 1
    ds.archive(dt + timedelta(days=1))
    assert (dl := ds.monitor.datalog.filter(date=dt).first())
    buffer: bitarray = bitarray()
    buffer.frombytes(dl.data)
    assert buffer.count(1) == 1
