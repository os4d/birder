import logging
from typing import Any

from constance import config
from django.core.exceptions import ValidationError
from django.forms import CharField, ChoiceField, HiddenInput, TextInput, Textarea
from django.template import Context, Template
from django.utils.safestring import SafeString, mark_safe
from durations_nlp.duration import Duration, Scale
from durations_nlp.exceptions import InvalidTokenError, ScaleFormatError

logger = logging.getLogger(__name__)


class ObfuscatedInput(HiddenInput):
    def render(
        self,
        name: str,
        value: Any,
        attrs: dict[str, str] | None = None,
        renderer: Any | None = None,
    ) -> "SafeString":
        context = self.get_context(name, value, attrs)
        context["value"] = str(value)
        context["label"] = "Set" if value else "Not Set"

        tpl = Template('<input type="hidden" name="{{ widget.name }}" value="{{ value }}">{{ label }}')
        return mark_safe(tpl.render(Context(context)))  # noqa: S308


class WriteOnlyWidget:
    def format_value(self, value: Any) -> str:
        return super().format_value("***")

    def value_from_datadict(self, data: dict[str, Any], files: Any, name: str) -> Any:
        value = data.get(name)
        if value == "***":
            return getattr(config, name)
        return value


class WriteOnlyTextarea(WriteOnlyWidget, Textarea):
    pass


class WriteOnlyInput(WriteOnlyWidget, TextInput):
    pass


def format_duration(d: Duration) -> str:
    entry: tuple[float, Scale]
    ret = []
    for entry in d.parsed_durations:
        num = int(entry[0])
        a = entry[1].representation.long_singular
        if num > 1:
            a = entry[1].representation.long_plural
        ret.append(f"{num} {a}")

    return " ".join(ret)


class DurationField(CharField):
    def clean(self, value: str) -> str:
        try:
            d: Duration = Duration(value)
            if d.to_minutes() < 5:  # noqa: PLR2004
                raise ValidationError("Must be more than 5 minutes")
        except (InvalidTokenError, ValidationError, ScaleFormatError) as e:
            raise ValidationError("Invalid duration") from e
        return format_duration(d)


class GroupChoiceField(ChoiceField):
    def __init__(self, **kwargs: Any) -> None:
        from django.contrib.auth.models import Group

        ret: list[tuple[str | int, str]] = [(c["name"], c["name"]) for c in Group.objects.values("pk", "name")]
        kwargs["choices"] = ret
        super().__init__(**kwargs)
