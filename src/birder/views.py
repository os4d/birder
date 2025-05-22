import json
from datetime import datetime, timedelta
from typing import Any

from django.contrib.auth.views import LoginView as LoginView_
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.utils.safestring import mark_safe
from django.views.generic import DetailView, TemplateView

from birder.checks import BaseCheck
from birder.config import settings
from birder.forms import LoginForm
from birder.models import Monitor, Project
from birder.utils.dates import format_minutes_as_time, get_start_of_day
from birder.ws.utils import notify_ui


class CommonContextMixin:
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["active_view"] = self.__class__.__name__
        kwargs["sso_enabled"] = bool(settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)

        return super().get_context_data(**kwargs)


class IndexView(CommonContextMixin, TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["projects"] = Project.objects.filter(public=True)
        return super().get_context_data(**kwargs)


class ProjectView(CommonContextMixin, TemplateView):
    template_name = "project.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        project = Project.objects.get(pk=self.kwargs.get("project"))
        if selection := self.kwargs.get("env"):
            env = project.environments.get(name=selection)
        else:
            env = project.environments.first()

        kwargs["selected_env"] = env
        filters = {"environment": env}
        kwargs["project"] = project
        monitors = Monitor.objects.filter(**filters).order_by("position", "name")
        kwargs["monitors"] = monitors
        kwargs["environments"] = project.environments.order_by("name")
        for monitor in monitors:
            notify_ui("update", monitor=monitor)
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
        return HttpResponse("Invalid Token", status=403)
    if m.strategy.mode != BaseCheck.REMOTE_INVOCATION:
        return HttpResponse("Check not enabled for remote call", status=400)
    m.get()
    return HttpResponse("Ok")


def error_400(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/400.html", {"error_code": 400, "message": "Bad Request"}, status=400)


def error_403(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/403.html", {"error_code": 403, "message": "Forbidden"}, status=403)


def error_404(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/404.html", {"error_code": 404, "message": "Page not found"}, status=404)


def error_500(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/500.html", {"error_code": 500, "message": "Server Error"}, status=500)
