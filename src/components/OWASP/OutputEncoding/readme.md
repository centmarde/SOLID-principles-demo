Decipher (translate) user input so that it cannot be executed as code when displayed in a browser, thus mitigating XSS attacks. Some strategies pointed out by OWASP are:

Utilize Operating System (OS) commands to sanitize untrusted data.
Encode every character except for those considered safe for the target interpreter.