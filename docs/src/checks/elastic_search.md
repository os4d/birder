# ElasticSearch Check

This check monitors the health of an Elasticsearch cluster. It connects to the specified hosts and verifies that the cluster status is "green".

## Configuration

| Field     | Description                                       | Required | Default |
| --------- | ------------------------------------------------- | -------- | ------- |
| `hosts`   | Comma-separated list of Elasticsearch nodes.      | Yes      |         |
| `api_key` | API key for authentication.                       | No       |         |

## Address Format

The address format for this check is `{host}:{port}`.
