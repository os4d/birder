# JSON Check

This check extends the HTTP Check to validate the content of a JSON response. It sends an HTTP GET request to the specified URL, parses the JSON response, and can optionally validate the content using a JMESPath expression.

## Configuration

This check inherits all the configuration options from the [HTTP Check](./http.md) with the following additions:

| Field   | Description                                                                                                | Required | Default |
| ------- | ---------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `match` | A [JMESPath](https://jmespath.org/) expression to evaluate against the JSON response. The check passes if the expression evaluates to a truthy value. | No       |         |

## Aliases

This check can also be referred to as:

*   `http+json`
*   `https+json`
