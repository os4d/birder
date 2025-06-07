from datetime import datetime
from typing import TYPE_CHECKING, Any

from constance import config
from django import template
from django.template import Context
from django.templatetags.static import static
from django.urls import reverse

if TYPE_CHECKING:
    from django.http import HttpRequest


register = template.Library()

MAX_ERRORS = 9


@register.simple_tag()
def status(m: str) -> str:
    if m:
        return static(f"images/{m}.svg")
    return static("images/question.svg")


@register.simple_tag()
def number(m: str) -> str:
    try:
        c = int(m)
        if c > MAX_ERRORS:
            return static("images/numbers/#.svg")
        return static(f"images/numbers/{c}.svg")
    except ValueError:
        return static("images/numbers/0.svg")


@register.simple_tag(takes_context=True)
def absolute_url(context: Context, *args: Any, **kwargs: Any) -> str:
    request: HttpRequest = context["request"]
    name = args[0]
    args = args[1:]
    return request.build_absolute_uri(reverse(name, args=args, kwargs=kwargs))


@register.filter()
def format_date(dt: datetime | None) -> str:
    if dt:
        return dt.strftime(config.DATETIME_FORMAT)
    return "-"
