import json
from datetime import datetime, timedelta
from typing import Any

from django.contrib.auth.views import LoginView as LoginView_
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.utils.safestring import mark_safe
from django.views.generic import DetailView, TemplateView

from birder.checks.passive import HealthCheck
from birder.config import settings
from birder.forms import LoginForm
from birder.models import Monitor, Project
from birder.utils.dates import format_minutes_as_time, get_start_of_day


class CommonContextMixin:
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["active_view"] = self.__class__.__name__
        kwargs["sso_enabled"] = bool(settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)

        return super().get_context_data(**kwargs)


class Index(CommonContextMixin, TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        filters = {}
        if selected_project := self.kwargs.get("project"):
            kwargs["selected_project"] = selected_project
            filters = {"project": selected_project}
        else:
            selected_project = Project.objects.filter(public=True).order_by("default", "name").first()
        if selected_project:
            kwargs["monitors"] = Monitor.objects.filter(**filters).order_by("position", "name")

        kwargs["projects"] = Project.objects.filter(public=True).order_by("default", "name")
        return super().get_context_data(**kwargs)


class MonitorDetail(CommonContextMixin, DetailView):
    template_name = "monitor.html"
    queryset = Monitor.objects.all()

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        from birder.db import DataStore

        now = get_start_of_day(datetime.now())
        bits = DataStore(self.object).get_all_entries(now)
        group_by = 5
        data = [sum(bits[i : i + group_by]) for i in range(0, len(bits), group_by)]
        kwargs["title"] = "{} - {}".format(
            now.strftime("%H:%M"), (now + timedelta(hours=(len(bits) // 60) - 1)).strftime("%H:%M")
        )
        kwargs["data"] = data
        kwargs["group_by"] = group_by
        kwargs["labels"] = mark_safe(  # noqa: S308
            json.dumps([format_minutes_as_time(i) for i in list(range(1, len(bits) + 1, group_by))])
        )
        return super().get_context_data(**kwargs)


class LoginView(CommonContextMixin, LoginView_):
    template_name = "login.html"
    form_class = LoginForm


def trigger(request: HttpRequest, pk: str, token: str) -> HttpResponse:
    m: Monitor = get_object_or_404(Monitor, pk=pk)
    if m.token != token:
        return HttpResponse("---", status=403)
    if not isinstance(m.strategy, HealthCheck):
        return HttpResponse("Check not enabled for remote call", status=400)
    m.trigger()
    return HttpResponse("Ok")


def error_400(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/400.html", {"error_code": 400, "message": "Bad Request"})


def error_403(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/403.html", {"error_code": 403, "message": "Forbidden"})


def error_404(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/404.html", {"error_code": 404, "message": "Page not found"})


def error_500(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/500.html", {"error_code": 500, "message": "Server Error"})
