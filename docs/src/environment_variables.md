# Environment Variables

Birder uses environment variables for configuration. Below is a list of all recognized environment variables, their expected types, and their default values.

| Variable Name | Type    | Default Value                               |
|---------------|---------|---------------------------------------------|
| ADMIN_EMAIL | str | (empty string) |
| ADMIN_PASSWORD | str | (empty string) |
| ALLOWED_HOSTS | list | [] |
| AZURE_CLIENT_KEY | str | (empty string) |
| AZURE_CLIENT_SECRET | str | (empty string) |
| AZURE_TENANT_ID | str | (empty string) |
| CACHE_URL | str | (empty string) |
| CHANNEL_BROKER | str | (empty string) |
| CRYPT_KEYS | list | [] |
| CRYPT_SALT_KEYS | list | [] |
| CSRF_TRUSTED_ORIGINS | list | [] |
| DATABASE_URL | str | sqlite:///birder.sqlite3 |
| DEBUG | bool | False |
| ENVIRONMENT | list | [] |
| EXTRA_APPS | list | [] |
| GOOGLE_CLIENT_ID | str | (empty string) |
| GOOGLE_CLIENT_SECRET | str | (empty string) |
| LOG_LEVEL | str | ERROR |
| REDIS_SERVER | str | redis://redis-server:6379/0 |
| SECRET_KEY | str | (empty string) |
| SECURE_HSTS_SECONDS | int | 0 |
| SOCIAL_AUTH_LOGIN_URL | str | /login/ |
| SOCIAL_AUTH_RAISE_EXCEPTIONS | bool | False |
| SOCIAL_AUTH_REDIRECT_IS_HTTPS | bool | True |
| SOCIAL_AUTH_WHITELISTED_DOMAINS | list | [] |
| SENTRY_DSN | str | (empty string) |
| STATIC_ROOT | str | /app/static/ |
| STATIC_URL | str | static/ |
| SUPERUSERS | list | [] |
| TASK_BROKER | str | (empty string) |
| WORKER_PROCESSES | int | (number of CPU cores) |
| WORKER_THREADS | int | 8 |
