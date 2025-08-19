{% include "../_includes/checks_breadcrumb.md" %}
# AMQP Check

The AMQP check is used to monitor the status of an AMQP (Advanced Message Queuing Protocol) server, such as RabbitMQ. It verifies that a connection can be successfully established with the server.

## Configuration

| Field             | Description                               | Required | Default |
| ----------------- | ----------------------------------------- | -------- | ------- |
| `hostname`        | AMQP Server hostname or IP Address.       | Yes      |         |
| `port`            | The port number to connect to.            | No       | `5672`  |
| `ssl`             | Whether to use SSL for the connection.    | No       | `False` |
| `connect_timeout` | Connection timeout in seconds (1-5).      | No       | `2`     |
| `userid`          | Username for authentication.              | No       |         |
| `password`        | Password for authentication.              | No       |         |

## Aliases

This check can also be referred to as:

*   `RabbitCheck`
*   `RabbitMQCheck`
*   `KombuCheck`
