from typing import TYPE_CHECKING, Any
from urllib.parse import parse_qsl, urlparse

from django import forms
from django.forms.forms import DeclarativeFieldsMetaclass
from django.utils.functional import SimpleLazyObject

if TYPE_CHECKING:
    from birder.models import Monitor
    from birder.types import Json


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

    def __init__(self, owner: "Monitor|None" = None, configuration: "Json | None" = None) -> None:
        if owner:
            self._configuration = SimpleLazyObject(lambda: owner.configuration)
        elif configuration:
            self._configuration = configuration
        else:
            raise ValueError("Must specify a configuration")  # pragma: no cover
        self.monitor: Monitor = owner

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

    @property
    def config(self) -> dict[str, Any]:
        cfg = {**self.config_class.DEFAULTS, **self._configuration}

        frm = self.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        raise forms.ValidationError(frm.errors)

    def check(self, raise_error: bool = False) -> bool:
        """Perform the check."""
