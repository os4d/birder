import json
from datetime import datetime
from typing import Any

from django.conf import settings
from django.contrib.auth.views import LoginView as LoginView_
from django.core.cache import cache
from django.db.models import QuerySet
from django.forms import Media
from django.http.request import HttpRequest
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from django.views.generic.base import ContextMixin, TemplateView, View

from birder.checks import BaseCheck
from birder.forms import LoginForm
from birder.models import Monitor, Project
from birder.utils.charts import get_data_for_date
from birder.utils.dates import get_start_of_day
from birder.ws.utils import notify_ui


class CommonContextMixin(ContextMixin, View):
    js_files = []

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["active_view"] = self.__class__.__name__
        kwargs["sso_enabled"] = bool(settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)
        kwargs["media"] = self.media
        return super().get_context_data(**kwargs)

    @property
    def media(self) -> Media:
        extra = "" if settings.DEBUG else ".min"

        js_files = [
            f"admin/js/vendor/jquery/jquery{extra}.js",
            "admin/js/jquery.init.js",
            f"birder{extra}.js",
            *[f % extra for f in self.js_files],
        ]
        return Media(js=js_files)


class IndexView(CommonContextMixin, TemplateView):
    template_name = "index.html"
    js_files = ["index%s.js"]

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        if self.request.user.is_authenticated:
            qs = Project.objects.all()
        else:
            qs = Project.objects.filter(public=True)
        kwargs["projects"] = qs
        return super().get_context_data(**kwargs)


class ProjectRouterView(CommonContextMixin, DetailView):
    model = Project

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        return HttpResponseRedirect(self.get_object().get_absolute_url())


class ProjectView(CommonContextMixin, DetailView):
    template_name = "project.html"
    model = Project
    js_files = ["project%s.js"]

    def get_queryset(self) -> QuerySet[Project]:
        return super().get_queryset().select_related("default_environment")

    def get_object(self, queryset: QuerySet[Project] = None) -> Project:
        return self.get_queryset().get(pk=self.kwargs.get("project_id"))

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        project = self.get_object()
        env = project.environments.get(name=self.kwargs.get("env"))

        kwargs["selected_env"] = env
        filters = {"environment": env}
        kwargs["project"] = project
        monitors = project.monitors.filter(**filters).order_by("position", "name")
        kwargs["monitors"] = monitors
        kwargs["environments"] = project.environments.order_by("name")
        for monitor in monitors:
            notify_ui("update", monitor=monitor)
        return super().get_context_data(**kwargs)


class MonitorDetail(CommonContextMixin, DetailView):
    template_name = "monitor.html"
    queryset = Monitor.objects.all()
    js_files = ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart%s.js", "monitor%s.js"]

    def get_queryset(self) -> QuerySet[Monitor]:
        return super().get_queryset().select_related("environment", "project")

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        now = get_start_of_day(datetime.now())
        group_by = 5
        data, labels = get_data_for_date(self.object, now, group_by)
        kwargs["data"] = data
        kwargs["group_by"] = group_by
        kwargs["labels"] = mark_safe(json.dumps(labels))  # noqa: S308
        return super().get_context_data(**kwargs)


LOGIN_ATTEMPT_PREFIX = "login:attempt:"
LOGIN_MAX_ATTEMPTS = 5
LOGIN_BLOCK_DURATION = 300


class LoginView(CommonContextMixin, LoginView_):
    template_name = "login.html"
    form_class = LoginForm

    def _client_ip(self) -> str:
        xff = self.request.META.get("HTTP_X_FORWARDED_FOR")
        if xff:
            return xff.split(",")[0].strip()
        return self.request.META.get("REMOTE_ADDR", "")

    def _is_blocked(self) -> bool:
        key = f"{LOGIN_ATTEMPT_PREFIX}{self._client_ip()}"
        return cache.get(key, 0) >= LOGIN_MAX_ATTEMPTS

    def _increment_attempts(self) -> None:
        key = f"{LOGIN_ATTEMPT_PREFIX}{self._client_ip()}"
        attempts = cache.get(key, 0)
        cache.set(key, attempts + 1, timeout=LOGIN_BLOCK_DURATION)

    def _clear_attempts(self) -> None:
        key = f"{LOGIN_ATTEMPT_PREFIX}{self._client_ip()}"
        cache.delete(key)

    def form_invalid(self, form: Any) -> HttpResponse:
        self._increment_attempts()
        return super().form_invalid(form)

    def form_valid(self, form: Any) -> HttpResponse:
        self._clear_attempts()
        return super().form_valid(form)

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        if self._is_blocked():
            return render(request, "errors/429.html", status=429)
        return super().get(request, *args, **kwargs)

    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        if self._is_blocked():
            return render(request, "errors/429.html", status=429)
        return super().post(request, *args, **kwargs)


def trigger(request: HttpRequest, pk: str, token: str) -> HttpResponse:
    m: Monitor = get_object_or_404(Monitor, pk=pk)
    if m.token != token:
        return HttpResponse(_("Invalid Token"), status=403)
    if m.strategy.mode != BaseCheck.REMOTE_INVOCATION:
        return HttpResponse("Check not enabled for remote call", status=400)
    m.get()
    return HttpResponse("Ok")


def error_429(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/429.html", {"error_code": 429, "message": "Too Many Requests"}, status=429)


def error_400(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/400.html", {"error_code": 400, "message": "Bad Request"}, status=400)


def error_403(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/403.html", {"error_code": 403, "message": "Forbidden"}, status=403)


def error_404(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/404.html", {"error_code": 404, "message": "Page not found"}, status=404)


def error_500(request: HttpRequest, exception: Exception = None) -> HttpResponse:
    return render(request, "errors/500.html", {"error_code": 500, "message": "Server Error"}, status=500)
