from django.urls import reverse


def test_index(django_app, monitor):
    assert django_app.get("/")


def test_monitor_detail(django_app, monitor):
    assert django_app.get(reverse("monitor-detail", kwargs={"pk": monitor.pk}))


def test_monitor_api(django_app, monitor):
    url = reverse("trigger", args=[monitor.pk, monitor.token])
    assert django_app.get(url)
