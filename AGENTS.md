# Birder — Agent Guide

## Project

Django 5.2 app for service uptime monitoring. Python 3.12 only. Package: `os4d-birder`.

- **Package/build**: `hatch-vcs` + `hatchling`; version derived from git tags
- **Deps**: `uv` (lockfile: `uv.lock`); no pip/poetry
- **Config**: `src/birder/config/settings.py` + fragments in `src/birder/config/fragments/*.py` imported via `from .fragments.app import *`

## Key Commands

```bash
uv sync                       # install all deps (including dev)
uv run tox                    # run full CI: lint → tests → mypy → docs → pkg_meta
uv run tox -e tests           # run test suite
uv run tox -e lint            # pre-commit (ruff + format + other hooks)
uv run tox -e mypy            # type check
uv run pytest tests/path      # single test file
uv run pytest -k test_name    # single test
uv run python manage.py runserver   # dev server
uv run python manage.py upgrade     # migrate + collectstatic + seed
uv run python manage.py demo        # create demo project with sample monitors
```

## Architecture

- **Entrypoints**:
  - CLI: `birder` command (click), bootstraps Django via `birder.cli.main`
  - Web: Django WSGI/ASGI via `birder.config.wsgi` / `birder.config.asgi`
  - Workers: `birder bg worker` (dramatiq)
  - Cron: `birder bg crontab` (dramatiq-crontab scheduler)
- **Two admin UIs**: `/settings/` (Django admin, full superuser) and `/console/` (Unfold admin, requires `can_access_console` permission)
- **Public routes**: `/` (index), `/trigger/<pk>/<token>/` (remote healthcheck push)
- **WebSocket**: `/checks` — unauthenticated, broadcasts monitor status updates to all clients
- **Checkers**: registered in `src/birder/checks/__init__.py` → `registry.py`. Each extends `BaseCheck`, uses a `ConfigForm` subclass for configuration. The strategy field determines which checker runs.
- **Monitor configs** are encrypted at rest via `EncryptedJSONField` (Fernet, keys from `CRYPT_KEYS`/`CRYPT_SALT_KEYS` env vars)

## Style & Tooling

- **Lint**: `ruff` (config in `ruff.toml`), line-length 120, double quotes
- **Types**: `mypy` (config in `mypy.ini`), strict mode for `birder.*` but most subpackages have `ignore_errors = true`
- **Format**: `ruff format --check` in CI
- **pre-commit**: runs ruff, djade (Django template formatter), tox-ini-fmt, pyproject-fmt, check-missed-migrations
- **Order**: CI runs `lint → tests → mypy → pkg_meta` (via tox). Run `lint && mypy && tests` before committing.

## Testing

- **Framework**: pytest with `django-webtest`, `factory_boy`, `responses`
- **Fixtures in**: `tests/conftest.py` — provides `app`, `mocked_responses`, `monitor`, `project`, `environment`, etc.
- **Factories in**: `tests/extras/testutils/factories/` (auto-added to `sys.path` via conftest)
- **Run**: `uv run pytest tests -x --create-db` (creates test DB)
- **Markers**: `selenium`, `smoke`, `integration`, `admin`, `skip_models`, `skip_buttons`
- **pytest.ini**: `django_find_project = false`, `--dist loadgroup`, `asyncio_default_fixture_loop_scope = function`
- `conftest.py` sets env vars `SECRET_KEY`, `STATIC_URL`, `DATABASE_URL`. Tests need `CRYPT_KEYS` and `CRYPT_SALT_KEYS` set (provided by tox).

## Important Conventions

- `SECRET_KEY`, `CRYPT_KEYS`, `CRYPT_SALT_KEYS` are required env vars
- `CACHE_URL` / `REDIS_SERVER` needed for caching and channels
- `AUTH_USER_MODEL = "birder.User"` — custom user model with timezone field
- Settings are loaded via `django-environ` from env vars; no `.env` file loading
- `compose.yml` is a sample file for local dev only — not for production
- Check config forms may include `WriteOnlyField` (masks values as `***` in UI) — respect this when serializing/debugging config
- Model `Monitor.token` is auto-generated and used for the remote trigger endpoint — this is not a config form field
- Monitor configurations are encrypted with Fernet — never log raw `configuration` in production
- The `trigger` endpoint (`/trigger/<pk>/<token>/`) is CSRF-exempt by design (uses token auth)
- Email is used as username (`USERNAME_FIELD` derived from social auth config; login form expects email)
- `birder` CLI auto-calls `django.setup()` so it works outside manage.py

## File Layout

```
src/birder/
├── checks/         # Checker implementations (HTTP, DB, SSH, etc.), registry
├── cli/            # Click CLI commands (bg, check, deadlines, env, monitor, upgrade)
├── config/         # Django settings + fragments
│   └── fragments/  # crypt.py, sentry.py, social_auth.py, dramatiq.py, etc.
├── console/        # Operator admin site (Unfold, limited permissions)
├── management/
│   └── commands/   # manage.py commands (demo, upgrade, etc.)
├── utils/          # security.py, pipeline.py, dates.py, charts.py, constance.py
├── ws/             # WebSocket consumer, routing, notify_ui helper
├── models.py       # Monitor, Project, Environment, User, DataHistory, LogCheck, Deadline
├── views.py        # Public views
├── forms.py        # Django forms (LoginForm, MonitorForm, ProjectForm, etc.)
├── admin.py        # Django admin configs
├── tasks.py        # Dramatiq tasks (queue_trigger, process, clean_log, store_history)
├── handlers.py     # Signal handlers
└── signals.py      # Custom signals
tests/
├── checks/         # Per-checker tests
├── models/         # Model tests
├── admin/          # Admin tests
├── browser/        # Selenium browser tests
├── cli/            # CLI tests
└── extras/
    └── testutils/
        └── factories/  # Factory boy factories
```
