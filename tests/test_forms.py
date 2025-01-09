from bs4 import BeautifulSoup
from django import forms

from birder.checks.base import ConfigForm, WriteOnlyField


class SampleForm(ConfigForm):
    token = WriteOnlyField()
    flag = forms.CharField(required=True)


def test_write_onlyinput():
    frm = SampleForm()
    soup = BeautifulSoup(str(frm.as_p()), "html.parser")
    assert soup.p.input["value"] == WriteOnlyField.MASK

    frm = SampleForm(initial={"token": "PASSWORD"})
    soup = BeautifulSoup(str(frm.as_p()), "html.parser")
    assert soup.p.input["value"] == WriteOnlyField.MASK

    frm = SampleForm({"token": "123", "flag": "1"}, initial={"token": "PASSWORD", "flag": "1"})
    assert frm.is_valid(), frm.errors
    assert frm.changed_data == ["token"]
    assert frm.cleaned_data == {"token": "123", "flag": "1"}

    frm = SampleForm({"token": WriteOnlyField.MASK, "flag": "1"}, initial={"token": "123", "flag": "1"})
    assert frm.is_valid(), frm.errors
    assert frm.changed_data == []
    assert frm.cleaned_data == {"token": "123", "flag": "1"}

    frm = SampleForm({"token": WriteOnlyField.MASK}, initial={"token": "123"})
    assert not frm.is_valid()
    assert frm.changed_data == []
    assert frm.cleaned_data == {"token": "123"}
    soup = BeautifulSoup(str(frm.as_p()), "html.parser")
    assert soup.p.input["value"] == WriteOnlyField.MASK
