from django import template
from django.templatetags.static import static

register = template.Library()


@register.simple_tag()
def icon(image: str) -> str:
    return static(f"images/{image}")


@register.simple_tag()
def status(m: bool) -> str:
    if m:
        return static("images/ok.svg")
    return static("images/ko.svg")
