{% include "../_includes/checks_breadcrumb.md" %}
# FTP Check

This check monitors the availability of an FTP server. It attempts to connect to the specified host and port to verify that the server is responsive.

## Configuration

| Field     | Description                                | Required | Default |
| --------- | ------------------------------------------ | -------- | ------- |
| `host`    | The hostname or IP address of the FTP server. | Yes      |         |
| `port`    | The port number to connect to.             | No       | `21`    |
| `timeout` | Connection timeout in seconds (1-5).       | No       | `2`     |
| `user`    | The username for authentication.           | No       |         |
| `passwd`  | The password for authentication.           | No       |         |

## Aliases

This check can also be referred to as:

*   `ftps`
