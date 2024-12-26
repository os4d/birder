from typing import TYPE_CHECKING, Any
from urllib.parse import parse_qsl, urlparse

from django import forms
from django.forms.forms import DeclarativeFieldsMetaclass

if TYPE_CHECKING:
    from birder.models import Monitor

    Json: type = dict[str, "Json"] | list["Json"] | str | int | float | bool | None


class DefaultsMetaclass(DeclarativeFieldsMetaclass):
    def __new__(cls, name: str, bases: tuple[type, ...], attrs: Any) -> type:
        new_class = super().__new__(cls, name, bases, attrs)
        initial_values = {}
        for field_name, field in new_class.declared_fields.items():
            initial_values[field_name] = field.initial
        new_class.DEFAULTS = initial_values
        return new_class


class ConfigForm(forms.Form, metaclass=DefaultsMetaclass):
    pass


class BaseCheck:
    pragma: list[str]
    config_class: type[ConfigForm]

    def __init__(self, owner: "Monitor") -> None:
        self.monitor: Monitor = owner
        if owner.pk:
            self.ready()

    @classmethod
    def parse_uri(cls, uri: str) -> dict[str, str | Any]:
        o = urlparse(uri)
        cfg = {
            **cls.config_class.DEFAULTS,
            **dict(parse_qsl(o.query)),
            "host": o.hostname,
            "scheme": o.scheme,
            "username": o.username,
            "password": o.password,
            "address": f"{o.scheme}://{o.hostname}{o.path}",
        }
        if o.port:
            cfg.setdefault("port", o.port)
        return cfg

    @classmethod
    def config_from_uri(cls, uri: str) -> dict[str, Any]:
        cfg = cls.parse_uri(uri)
        frm = cls.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        raise forms.ValidationError(frm.errors)

    def ready(self) -> None:
        """Post initialization hook."""

    @property
    def config(self) -> dict[str, Any]:
        cfg = {}
        cfg.update(self.monitor.configuration)
        frm = self.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        return {}

    def check(self) -> bool:
        """Perform the check."""
