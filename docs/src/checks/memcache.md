{% include "../_includes/checks_breadcrumb.md" %}
# Memcached Check

This check monitors the availability of a Memcached server. It attempts to connect to the specified host and port to verify that the server is responsive.

## Configuration

| Field             | Description                                  | Required | Default |
| ----------------- | -------------------------------------------- | -------- | ------- |
| `host`            | The hostname or IP address of the Memcached server. | Yes      |         |
| `port`            | The port number to connect to.               | No       | `11211` |
| `connect_timeout` | Connection timeout in seconds (1-5).         | No       | `2`     |
| `timeout`         | Socket timeout in seconds (1-5).             | No       | `2`     |
