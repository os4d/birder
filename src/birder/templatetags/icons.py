from django import template
from django.templatetags.static import static

register = template.Library()


@register.simple_tag()
def icon(image: str) -> str:
    return static(f"images/{image}")
