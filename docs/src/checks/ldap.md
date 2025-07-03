{% include "../_includes/checks_breadcrumb.md" %}
# LDAP Check

This check monitors the availability of an LDAP server. It attempts to bind to the server using the provided credentials to verify that the server is responsive and accessible.

## Configuration

| Field     | Description                          | Required | Default |
| --------- | ------------------------------------ | -------- | ------- |
| `host`    | The hostname or IP address of the LDAP server. | Yes      |         |
| `port`    | The port number to connect to.       | No       | `389`   |
| `version` | The LDAP version to use (1-3).       | No       | `3`     |
| `user`    | The username for authentication.     | Yes      |         |
| `password`| The password for authentication.     | Yes      |         |
