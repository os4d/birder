# HTTP Check

This check monitors the availability and response of an HTTP or HTTPS endpoint. It sends an HTTP GET request to the specified URL and validates the response.

## Configuration

| Field          | Description                                                                 | Required | Default |
| -------------- | --------------------------------------------------------------------------- | -------- | ------- |
| `url`          | The URL to check.                                                           | Yes      |         |
| `timeout`      | Connection timeout in seconds (1-10).                                       | No       | `2`     |
| `status_success` | A comma-separated list of successful HTTP status codes.                     | Yes      | `200`   |
| `username`     | The username for authentication.                                            | No       |         |
| `password`     | The password for authentication.                                            | No       |         |
| `auth_type`    | The authentication type. Can be `basic`, `digest`, or `token`.              | No       | `None`  |
| `match`        | A string to match in the response body. If provided, the check will only pass if the string is found. | No       |         |

## Aliases

This check can also be referred to as:

*   `https`
