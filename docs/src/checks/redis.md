{% include "../_includes/checks_breadcrumb.md" %}
# Redis Check

This check monitors the availability of a Redis server. It attempts to connect to the specified host and execute a `PING` command to verify that the server is responsive.

## Configuration

| Field                    | Description                               | Required | Default |
| ------------------------ | ----------------------------------------- | -------- | ------- |
| `host`                   | The hostname or IP address of the Redis server. | Yes      |         |
| `port`                   | The port number to connect to.            | No       | `6379`  |
| `socket_timeout`         | Socket timeout in seconds (1-5).          | No       | `2`     |
| `socket_connect_timeout` | Socket connection timeout in seconds (1-5). | No       | `2`     |
| `password`               | The password for authentication.          | No       |         |
