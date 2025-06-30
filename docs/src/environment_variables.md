# Environment Variables

Birder uses environment variables for configuration. Below is a list of all recognized environment variables, their expected types, their default values, and a brief description of their usage.

| Variable Name | Type    | Default Value                 | Description                                                                 |
|---------------|---------|-------------------------------|-----------------------------------------------------------------------------|
| ADMIN_EMAIL | str | (empty string) | Email address for the default admin user. Used for initial setup.           |
| ADMIN_PASSWORD | str | (empty string) | Password for the default admin user. Used for initial setup.                |
| ALLOWED_HOSTS | list | [] | A list of strings representing the host/domain names that this Django site can serve. |
| AZURE_CLIENT_KEY | str | (empty string) | Client key for Azure Active Directory authentication.                       |
| AZURE_CLIENT_SECRET | str | (empty string) | Client secret for Azure Active Directory authentication.                    |
| AZURE_TENANT_ID | str | (empty string) | Tenant ID for Azure Active Directory authentication.                        |
| CACHE_URL | str | (empty string) | URL for the cache backend (e.g., Redis).                                    |
| CHANNEL_BROKER | str | (empty string) | URL for the Channels message broker (e.g., Redis or RabbitMQ).              |
| CRYPT_KEYS | list | [] | List of keys used for cryptographic operations.                             |
| CRYPT_SALT_KEYS | list | [] | List of salt keys used for cryptographic operations.                        |
| CSRF_TRUSTED_ORIGINS | list | [] | A list of trusted origins for CSRF protection.                              |
| DATABASE_URL | str | sqlite:///birder.sqlite3 | URL for the database connection.                                            |
| DEBUG | bool | False | Enables or disables Django's debug mode. Set to `True` for development.     |
| ENVIRONMENT | list | [] | Defines the deployment environment (e.g., `production`, `development`).     |
| EXTRA_APPS | list | [] | Additional Django apps to be installed.                                     |
| GOOGLE_CLIENT_ID | str | (empty string) | Client ID for Google OAuth2 authentication.                                 |
| GOOGLE_CLIENT_SECRET | str | (empty string) | Client secret for Google OAuth2 authentication.                             |
| LOG_LEVEL | str | ERROR | Default logging level for the application.                                  |
| REDIS_SERVER | str | redis://redis-server:6379/0 | URL for the Redis server.                                                   |
| SECRET_KEY | str | (empty string) | Django secret key for cryptographic signing. **Crucial for security.**      |
| SECURE_HSTS_SECONDS | int | 0 | The number of seconds the HSTS header should be set for.                    |
| SOCIAL_AUTH_LOGIN_URL | str | /login/ | URL for social authentication login.                                        |
| SOCIAL_AUTH_RAISE_EXCEPTIONS | bool | False | Whether to raise exceptions during social authentication.                   |
| SOCIAL_AUTH_REDIRECT_IS_HTTPS | bool | True | Forces social authentication redirects to use HTTPS.                        |
| SOCIAL_AUTH_WHITELISTED_DOMAINS | list | [] | Whitelisted domains for social authentication.                              |
| SENTRY_DSN | str | (empty string) | Sentry DSN for error tracking.                                              |
| STATIC_ROOT | str | /app/static/ | Absolute path to the directory where `collectstatic` will gather static files. |
| STATIC_URL | str | static/ | URL to use when referring to static files located in `STATIC_ROOT`.         |
| SUPERUSERS | list | [] | List of usernames that should be granted superuser privileges.              |
| TASK_BROKER | str | (empty string) | URL for the task queue broker (e.g., Celery, Dramatiq).                     |
| WORKER_PROCESSES | int | (number of CPU cores) | Number of worker processes to run.                                          |
| WORKER_THREADS | int | 8 | Number of worker threads per process.                                       |
