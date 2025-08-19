{% include "../_includes/checks_breadcrumb.md" %}
# TCP Check

This check monitors the availability of a TCP port on a specified host. It attempts to establish a TCP connection to the given host and port to verify that the service is listening.

## Configuration

| Field      | Description                               | Required | Default |
| ---------- | ----------------------------------------- | -------- | ------- |
| `hostname` | The hostname or IP address to check.      | Yes      |         |
| `port`     | The TCP port to connect to.               | Yes      | `7`     |
| `timeout`  | Connection timeout in seconds (1-5).      | No       | `2`     |
