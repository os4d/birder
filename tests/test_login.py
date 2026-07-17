from unittest import mock
from uuid import uuid4

import pytest
import responses
from django.conf import settings
from django.test import override_settings
from django.urls import reverse
from testutils.factories import UserFactory

from birder.utils.pipeline import configure_user


@pytest.fixture
def user(db):
    return UserFactory()


@override_settings(
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY="1",
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET="2",
    SESSION_ENGINE="django.contrib.sessions.backends.db",
)
def test_login(db, user, client):
    session = client.session
    session["google-oauth2_state"] = "1"
    session.save()

    res = client.post(reverse("social:begin", kwargs={"backend": "google-oauth2"}))
    assert res.status_code == 302

    with responses.RequestsMock() as rsps:
        rsps.add(
            responses.POST,
            "https://accounts.google.com/o/oauth2/token",
            json={
                "access_token": "123",
                "uid": str(uuid4()),
                "provider": "google-oauth2",
            },
            status=200,
        )
        rsps.add(
            responses.GET,
            "https://www.googleapis.com/oauth2/v3/userinfo",
            json={
                "sub": str(uuid4()),  # Unique user ID
                "name": "Test User",
                "given_name": "Test",
                "family_name": "User",
                "picture": "https://example.com/test.jpg",
                "email": user.email,
                "email_verified": True,
            },
            status=200,
        )

        url = reverse("social:complete", kwargs={"backend": "google-oauth2"})
        url += "?code=2&state=1"
        with mock.patch(
            "django.contrib.sessions.backends.base.SessionBase.set_expiry",
            side_effect=[OverflowError, None],
        ):
            response = client.get(url)
            assert response.status_code == 302
            assert response.url == settings.LOGIN_REDIRECT_URL


def test_pipeline(user, settings):
    settings.SUPERUSERS = [user.email]
    configure_user(user)
    user.refresh_from_db()
    assert user.is_superuser


def test_login_email(app, user):
    url = reverse("login")
    app.set_user(None)
    res = app.get(url)
    res.forms["login-form"]["username"] = user.username
    res.forms["login-form"]["password"] = "password"
    res = res.forms["login-form"].submit()
    assert res.status_code == 302
