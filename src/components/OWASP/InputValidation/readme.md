Properly validate all input data provided by users to stop malicious or invalid input from inducing security vulnerabilities that may lead to attacks like cross-site scripting, injection, buffer overflows, etc. Some strategies that you can use to execute input validation are:

Ensure request & response headers incorporate only ASCII characters.
Validate all data (including HTTP headers, URLs, embedded code, etc.) provided by the client before processing.