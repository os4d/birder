from contextlib import nullcontext as does_not_raise
from unittest import mock
from unittest.mock import Mock

import pytest
from django.core.exceptions import ValidationError
from elasticsearch._sync.client import CatClient

from birder.checks.elastic_search import ElasticSearchCheck, ValidateEsHost
from birder.exceptions import CheckError


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("https://localhost:9200", does_not_raise()),
        ("https://localhost", does_not_raise()),
        ("https://localhost:9200,https://localhost:19200", does_not_raise()),
        ("localhost:9200,https://localhost:19200", pytest.raises(ValidationError)),
        ("localhost", pytest.raises(ValidationError)),
        ("ftp://localhost", pytest.raises(ValidationError)),
    ],
)
def test_validator(value, expected):
    with expected:
        ValidateEsHost()(value)


def test_config(mocked_responses):
    c = ElasticSearchCheck(Mock(configuration={"hosts": "https://localhost:9200"}))
    assert c.config == {"hosts": "https://localhost:9200", "api_key": ""}


def test_es_check_success():
    c = ElasticSearchCheck(Mock(configuration={"hosts": "http://localhost:9200"}))
    with mock.patch.object(CatClient, "health") as m1:
        m1.return_value = [{"status": "green"}]
        assert c.check()


def test_es_check_fail(mocked_responses):
    c = ElasticSearchCheck(Mock(configuration={"hosts": "http://localhost:9200"}))
    # with mock.patch("elasticsearch._sync.client.Elasticsearch"):
    with mock.patch("elasticsearch._sync.client.cat.CatClient") as m:
        m.health.side_effect = Exception("test")
        assert not c.check()
        with pytest.raises(CheckError):
            c.check(True)
