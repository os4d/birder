from functools import cached_property
from typing import TYPE_CHECKING, Any

from django import forms
from django.forms.forms import DeclarativeFieldsMetaclass
from django.template.base import Template
from django.template.context import Context
from django.utils.functional import SimpleLazyObject
from django.utils.safestring import mark_safe
from markdown_deux import markdown
from unfold.widgets import BASE_INPUT_CLASSES

if TYPE_CHECKING:
    from birder.models import Monitor
    from birder.types import Json


class DefaultsMetaclass(DeclarativeFieldsMetaclass):
    def __new__(cls, name: str, bases: tuple[type, ...], attrs: Any) -> type:
        new_class = super().__new__(cls, name, bases, attrs)
        initial_values = {}
        # if not hasattr(new_class, "DEFAULTS"):
        for field_name, field in new_class.declared_fields.items():
            initial_values[field_name] = field.initial
        new_class.DEFAULTS = initial_values
        return new_class


class WriteOnlyWidget(forms.TextInput):
    def __init__(self, attrs: dict[str, Any] | None = None, render_value: bool = False) -> None:
        super().__init__(attrs)
        self.render_value = render_value

    def get_context(self, name: str, value: Any, attrs: Any) -> dict[str, Any]:
        if not self.render_value:
            value = WriteOnlyField.MASK
        return super().get_context(name, value, attrs)


class WriteOnlyField(forms.CharField):
    widget = WriteOnlyWidget
    MASK = "***"


class ConfigForm(forms.Form, metaclass=DefaultsMetaclass):
    help_text = ""
    initial = {}

    def __init__(
        self,
        *args: Any,
        **kwargs: Any,
    ) -> None:
        super().__init__(*args, **kwargs)
        for f in self.fields.values():
            f.widget.attrs["class"] = " ".join(BASE_INPUT_CLASSES)

    def render_help(self, context: dict[str, Any], **extra_context: Any) -> str:
        return mark_safe(  # noqa: S308
            markdown(
                Template("{%% load birder %%}%s" % self.help_text)  # noqa: UP031
                .render(Context({**context, **extra_context}))
                .strip()
            )
        )

    @property
    def media(self) -> forms.Media:
        media = super().media
        media += forms.Media(
            js=[
                "admin/js/vendor/jquery/jquery.js",
                "admin/js/jquery.init.js",
                "change-icon.js",
            ],
            css={"screen": ["birder-admin.css"]},
        )
        return media

    @cached_property
    def changed_data(self) -> list[str]:
        return [
            name for name, bf in self._bound_items() if not isinstance(bf.field, WriteOnlyField) and bf._has_changed()
        ] + [
            name
            for name, bf in self._bound_items()
            if isinstance(bf.field, WriteOnlyField) and self.cleaned_data[name] != self.initial[name]
        ]

    def full_clean(self) -> None:
        super().full_clean()
        if self.is_bound:  # Stop further processing.
            for k, v in self.cleaned_data.items():
                if isinstance(self.fields[k], WriteOnlyField) and v == WriteOnlyField.MASK:
                    self.cleaned_data[k] = self.initial.get(k)


class BaseCheck:
    LOCAL_TRIGGER = 1
    REMOTE_INVOCATION = 2

    icon: str
    pragma: list[str]
    config_class: type[ConfigForm]
    mode = LOCAL_TRIGGER
    address_format: str = ""
    verbose_name = None

    def __init__(self, owner: "Monitor|None" = None, configuration: "Json | None" = None) -> None:
        if owner:
            self._configuration = SimpleLazyObject(lambda: owner.configuration)
        elif configuration is not None:
            self._configuration = SimpleLazyObject(lambda: configuration)
        else:
            raise ValueError("Must specify a configuration")  # pragma: no cover
        self.monitor: Monitor = owner
        self.status = {}

    @classmethod
    def clean_config(cls, cfg: dict[str, Any]) -> dict[str, Any]:
        return cfg

    @cached_property
    def config(self) -> dict[str, Any]:
        cfg = {**self.config_class.DEFAULTS, **dict(self._configuration)}
        frm = self.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        return self.config_class.DEFAULTS

    @property
    def address(self) -> str:
        try:
            return self.address_format.format(**self.config)
        except (ValueError, KeyError, TypeError):
            return ""

    def check(self, raise_error: bool = False) -> bool:
        """Perform the check."""
