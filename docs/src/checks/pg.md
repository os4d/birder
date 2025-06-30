# PostgreSQL Check

This check monitors the availability of a PostgreSQL database server. It attempts to connect to the specified host and execute a simple query to verify that the server is responsive and accessible.

## Configuration

| Field             | Description                                     | Required | Default |
| ----------------- | ----------------------------------------------- | -------- | ------- |
| `host`            | The hostname or IP address of the PostgreSQL server. | Yes      |         |
| `port`            | The port number to connect to.                  | No       | `5432`  |
| `database`        | The name of the database to connect to.         | No       |         |
| `user`            | The username for authentication.                | No       |         |
| `password`        | The password for authentication.                | No       |         |
| `connect_timeout` | Connection timeout in seconds.                  | No       | `2`     |

## Aliases

This check can also be referred to as:

*   `postgres`
*   `postgis`
