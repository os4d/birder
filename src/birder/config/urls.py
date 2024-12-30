from django.conf import settings
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import include, path

from birder import views

urlpatterns = [
    path("social/", include("social_django.urls", namespace="social")),
    path("admin/", admin.site.urls),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("<int:pk>", views.MonitorDetail.as_view(), name="monitor-detail"),
    path("trigger/<int:pk>/<str:token>/", views.trigger, name="trigger"),
    path("", views.Index.as_view(), name="index"),
]
if "django_browser_reload" in settings.INSTALLED_APPS:  # pragma: no cover
    urlpatterns += [path(r"__reload__/", include("django_browser_reload.urls"))]

admin.autodiscover()
admin.site.site_header = "Birder"
admin.site.site_title = "Birder site admin"
admin.site.index_title = ""
