# SMTP Check

This check monitors the availability of an SMTP server. It attempts to connect to the specified host and port, and optionally authenticates with a username and password.

## Configuration

| Field      | Description                                  | Required | Default |
| ---------- | -------------------------------------------- | -------- | ------- |
| `host`     | The hostname or IP address of the SMTP server. | Yes      |         |
| `port`     | The port number to connect to.               | No       | `587`   |
| `timeout`  | Connection timeout in seconds (1-5).         | No       | `2`     |
| `username` | The username for authentication.             | No       |         |
| `password` | The password for authentication.             | No       |         |
