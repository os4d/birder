from django.urls import reverse


def test_index(django_app, monitor):
    assert django_app.get("/")


def test_monitor_detail(django_app, monitor):
    assert django_app.get(reverse("monitor-detail", kwargs={"pk": monitor.pk}))
