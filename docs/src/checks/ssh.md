{% include "../_includes/checks_breadcrumb.md" %}
# SSH Check

This check monitors the availability of an SSH server. It attempts to connect to the specified host and port, and optionally authenticates with a username and password.

## Configuration

| Field           | Description                                   | Required | Default |
| --------------- | --------------------------------------------- | -------- | ------- |
| `server`        | The hostname or IP address of the SSH server. | Yes      |         |
| `port`          | The port number to connect to.                | No       | `22`    |
| `username`      | The username for authentication.              | No       |         |
| `password`      | The password for authentication.              | No       |         |
| `login_timeout` | Login timeout in seconds.                     | No       | `2`     |
