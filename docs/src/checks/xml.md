{% include "../_includes/checks_breadcrumb.md" %}
# XML Check

This check extends the HTTP Check to validate the content of an XML response. It sends an HTTP GET request to the specified URL, parses the XML response, and can optionally validate the content using an XPath expression.

## Configuration

This check inherits all the configuration options from the [HTTP Check](./http.md) with the following additions:

| Field   | Description                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| `xpath` | An [XPath](https://www.w3.org/TR/xpath/) expression to evaluate against the XML response. The check passes if the expression evaluates to a truthy value. |

## Aliases

This check can also be referred to as:

*   `http+xml`
*   `https+xml`
