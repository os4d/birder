# MongoDB Check

This check monitors the availability and connectivity of a MongoDB database instance. It attempts to establish a connection and execute a simple `ping` command to verify the server is responsive.

## Configuration

| Field             | Description                                  | Required | Default |
| ----------------- | -------------------------------------------- | -------- | ------- |
| `host`            | MongoDB host or IP address.                  | Yes      |         |
| `port`            | The port number to connect to.               | No       | `27017` |
| `username`        | Username for authentication.                 | No       |         |
| `password`        | Password for authentication.                 | No       |         |
| `database`        | Database name to connect to (optional). Used as `authSource` if provided. | No       |         |
| `connect_timeout` | Connection timeout in seconds (1-10).        | No       | `5`     |
