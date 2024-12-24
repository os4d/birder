from typing import Any

from django.contrib.auth.views import LoginView as LoginView_
from django.views.generic import TemplateView

from birder.config import settings
from birder.forms import LoginForm


class CommonContextMixin:
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        kwargs["active_view"] = self.__class__.__name__
        kwargs["sso_enabled"] = bool(settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)

        return super().get_context_data(**kwargs)


class Index(CommonContextMixin, TemplateView):
    template_name = "index.html"


class LoginView(CommonContextMixin, LoginView_):
    template_name = "login.html"
    form_class = LoginForm
