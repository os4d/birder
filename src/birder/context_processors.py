from django.core.cache import cache


def birder(request):
    return {"system": {"last_check": cache.get(f"system:last_check")}}
