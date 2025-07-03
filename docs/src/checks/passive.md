{% include "../_includes/checks_breadcrumb.md" %}
# Passive Check

This check, also known as a Remote Health Check, is a passive monitoring solution. Unlike active checks that poll a service, this check waits for an external trigger to determine the health status. It provides a unique URL that an external service can use to notify Birder of its status.

## Configuration

This check has no configurable fields. It provides a unique URL that can be used to trigger the check.

## How It Works

When you create a Passive Check, Birder generates a unique URL. You can then configure your external service to send an HTTP request to this URL. When Birder receives a request on this URL, it marks the check as successful.

This is useful for monitoring services that are behind a firewall or do not have a public endpoint. It is also useful for monitoring services that have their own health check system and can be configured to send a webhook.
