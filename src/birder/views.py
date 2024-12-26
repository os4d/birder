from typing import Any

from django.contrib.auth.views import LoginView as LoginView_
from django.views.generic import DetailView, TemplateView

from birder.config import settings
from birder.forms import LoginForm
from birder.models import Monitor


class CommonContextMixin:
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["active_view"] = self.__class__.__name__
        kwargs["sso_enabled"] = bool(settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)

        return super().get_context_data(**kwargs)


class Index(CommonContextMixin, TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["monitors"] = Monitor.objects.all()
        return super().get_context_data(**kwargs)


class MonitorDetail(CommonContextMixin, DetailView):
    template_name = "monitor.html"
    queryset = Monitor.objects.all()


class LoginView(CommonContextMixin, LoginView_):
    template_name = "login.html"
    form_class = LoginForm
