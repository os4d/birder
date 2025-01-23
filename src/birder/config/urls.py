from django.conf import settings
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import include, path

from birder import views

handler400 = views.error_400
handler403 = views.error_403
handler404 = views.error_404
handler500 = views.error_500

urlpatterns = [
    path("errors/400/", handler400, name="errors-400"),
    path("errors/403/", handler403, name="errors-403"),
    path("errors/404/", handler404, name="errors-404"),
    path("errors/500/", handler500, name="errors-500"),
    path("social/", include("social_django.urls", namespace="social")),
    path("admin/", admin.site.urls),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("<int:pk>", views.MonitorDetail.as_view(), name="monitor-detail"),
    path("trigger/<int:pk>/<str:token>/", views.trigger, name="trigger"),
    path("", views.IndexView.as_view(), name="index"),
    path("<int:project>/", views.ProjectView.as_view(), name="project-detail"),
    path("<int:project>/<str:env>/", views.ProjectView.as_view(), name="project-env"),
]
if "django_browser_reload" in settings.INSTALLED_APPS:  # pragma: no cover
    urlpatterns += [path(r"__reload__/", include("django_browser_reload.urls"))]


admin.autodiscover()
admin.site.site_header = "Birder"
admin.site.site_title = "Birder site admin"
admin.site.index_title = ""
