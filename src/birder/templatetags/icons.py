from django import template
from django.templatetags.static import static

from birder.models import Monitor

register = template.Library()


@register.simple_tag()
def icon(image: str) -> str:
    return static(f"images/{image}")


@register.simple_tag()
def icon(image: str) -> str:
    return static(f"images/{image}")


@register.simple_tag()
def status(m: bool) -> str:
    if m:
        return static(f"images/ok.svg")
    else:
        return static(f"images/ko.svg")
