import os
from pathlib import Path

from . import env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
PACKAGE_DIR = Path(__file__).resolve().parent.parent  # src/birder
PROJECT_DIR = PACKAGE_DIR.parent.parent  # git project root

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# Application definition

INSTALLED_APPS = [
    "birder.theme",
    "daphne",
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    # "unfold.contrib.inlines",  # optional, if special inlines are needed
    # "unfold.contrib.simple_history",  # optional, if dja
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "admin_extra_buttons",
    "markdown_deux",
    "django_dramatiq",
    "dramatiq_crontab",
    "adminfilters",
    "constance",
    "recurrence",
    "flags",
    "social_django",
    "tailwind",
    "birder",
    "birder.ws",
    *env("EXTRA_APPS"),
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_NAME = "birder_sessionid"

ROOT_URLCONF = "birder.config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "birder.context_processors.birder",
            ],
        },
    },
]

WSGI_APPLICATION = "birder.config.wsgi.application"

ASGI_APPLICATION = "birder.config.asgi.application"
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [env("CHANNEL_BROKER") or env("REDIS_SERVER")],
        },
    },
}

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {"default": env.db("DATABASE_URL")}
CACHE_URL = env("CACHE_URL") or env("REDIS_SERVER")
CACHES = {
    "default": {
        "BACKEND": "redis_lock.django_cache.RedisCache",
        "LOCATION": CACHE_URL,
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators
LOGIN_URL = "/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

AUTH_USER_MODEL = "birder.User"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTHENTICATION_BACKENDS = (
    "social_core.backends.google.GoogleOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ("en", "English"),
    ("it", "Italian"),
    ("fr", "French"),
    ("es", "Spanish"),
    ("ar", "Arabic"),
]

LOCALE_PATHS = [
    PACKAGE_DIR / "locale",
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = env("STATIC_URL")
STATIC_ROOT = env("STATIC_ROOT")

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


def get_log_level_for(app: str) -> str:
    return os.environ.get(f"{app.upper()}_LOG_LEVEL", env("LOG_LEVEL"))


def should_propagate(app: str) -> bool:
    return f"{app.upper()}_LOG_LEVEL" in os.environ


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "null": {
            "class": "logging.NullHandler",
        },
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": get_log_level_for("root"),
    },
    "loggers": {
        "elastic_transport": {
            "handlers": ["null"],
            "level": get_log_level_for("elastic"),
            "propagate": False,
        },
        "django": {
            "handlers": ["null"],
            "level": get_log_level_for("django"),
            "propagate": should_propagate("django"),
        },
        "dramatiq": {
            "handlers": ["null"],
            "level": get_log_level_for("dramatiq"),
            "propagate": False,
        },
        "urllib3": {
            "handlers": ["null"],
            "level": get_log_level_for("urllib3"),
            "propagate": should_propagate("urllib3"),
        },
        "kombu": {
            "handlers": ["null"],
            "level": get_log_level_for("kombu"),
            "propagate": should_propagate("kombu"),
        },
        "redis": {
            "handlers": ["null"],
            "level": get_log_level_for("redis"),
            "propagate": should_propagate("redis"),
        },
        "birder": {
            "handlers": ["console"],
            "level": get_log_level_for("birder"),
            "propagate": False,
        },
    },
}
CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS")
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = env("SECURE_HSTS_SECONDS")

from .fragments.app import *  # noqa
from .fragments.constance import *  # noqa
from .fragments.crypt import *  # noqa

from .fragments.dramatiq import *  # noqa
from .fragments.sentry import *  # noqa
from .fragments.social_auth import *  # noqa
from .fragments.tailwind import *  # noqa
from .fragments.unfold import *  # noqa
