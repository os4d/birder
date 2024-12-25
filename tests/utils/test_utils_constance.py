from constance.test import override_config

from birder.utils.constance import GroupChoiceField, ObfuscatedInput, WriteOnlyInput, WriteOnlyTextarea


def test_utils_groupchoicefield(db):
    field = GroupChoiceField()
    assert field


# LdapDNField


# ObfuscatedInput
def test_obfuscatedinput():
    field = ObfuscatedInput()
    assert field.render("name", "value") == '<input type="hidden" name="name" value="value">Set'


# WriteOnlyTextarea
def test_writeonlytextarea():
    field = WriteOnlyTextarea()
    assert field.render("name", "value") == '<textarea name="name" cols="40" rows="10">\n***</textarea>'


@override_config(HARD_THRESHOLD="abc")
def test_writeonlyinput(db):
    field = WriteOnlyInput()
    assert field.render("name", "value")
    assert field.value_from_datadict({"HARD_THRESHOLD": "***"}, {}, "HARD_THRESHOLD") == "abc"
    assert field.value_from_datadict({"HARD_THRESHOLD": "123"}, {}, "HARD_THRESHOLD") == "123"
