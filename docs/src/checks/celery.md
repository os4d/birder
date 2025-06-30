# Celery Check

This document outlines the configuration for two types of Celery checks: `CeleryCheck` and `CeleryQueueCheck`.

## CeleryCheck

`CeleryCheck` monitors the health of Celery workers. It ensures that a minimum number of workers are active and responsive.

### Configuration

| Field         | Description                        | Required | Default |
| ------------- | ---------------------------------- | -------- | ------- |
| `broker`      | The message broker to use.         | Yes      |         |
| `hostname`    | The hostname of the broker.        | Yes      |         |
| `port`        | The port of the broker.            | Yes      |         |
| `extra`       | Extra broker-specific information. | No       |         |
| `min_workers` | Minimum number of active workers.  | Yes      | `1`     |
| `timeout`     | Connection timeout in seconds.     | No       | `2`     |

## CeleryQueueCheck

`CeleryQueueCheck` monitors the size of a specific Celery queue. It checks if the number of messages in the queue exceeds a defined threshold.

### Configuration

| Field        | Description                          | Required | Default  |
| ------------ | ------------------------------------ | -------- | -------- |
| `broker`     | The message broker to use.           | Yes      |          |
| `hostname`   | The hostname of the broker.          | Yes      |          |
| `port`       | The port of the broker.              | Yes      |          |
| `extra`      | Extra broker-specific information.   | No       |          |
| `queue_name` | The name of the queue to monitor.    | Yes      | `celery` |
| `max_queued` | Maximum number of messages in queue. | Yes      | `1`      |
| `timeout`    | Connection timeout in seconds.       | No       | `2`      |
