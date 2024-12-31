from django import template
from django.templatetags.static import static

register = template.Library()


@register.simple_tag()
def status(m: str) -> str:
    if m:
        return static(f"images/{m}.svg")
    return ""
    # if m == "ko":
    #     return static("images/ko.svg")
    # elif m == "warn":
    #     return static("images/warn.svg")
    # return static("images/ok.svg")


@register.simple_tag()
def number(m: int) -> str:
    if m > 9:
        return static(f"images/numbers/#.svg")
    return static(f"images/numbers/{m}.svg")
