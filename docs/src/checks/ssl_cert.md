{% include "../_includes/checks_breadcrumb.md" %}
# SSL Certificate Check

This check monitors the expiration date of an SSL certificate. It connects to the specified hostname and port and checks the validity of the SSL certificate.

## Configuration

| Field          | Description                                                                 | Required | Default |
| -------------- | --------------------------------------------------------------------------- | -------- | ------- |
| `hostname`     | The hostname to check.                                                      | Yes      |         |
| `port`         | The port to check.                                                          | No       | `443`   |
| `alert_days`   | The number of days before the expiration date to produce an alert.          | No       | `7`     |

## Aliases

This check can also be referred to as:

*   `ssl`
