# Scenario: TS handler without validation or safe DB access

Prompt:
```
Act as the @security-auditor. Review this TypeScript Express handler that reads req.query and builds SQL with string concatenation. Fix all security issues.
```

Expectations (must all be present):
- Input validation/normalization for incoming fields; reject or sanitize unsafe values.
- Parameterized queries/ORM usage; no string-concat SQL.
- Output encoding/escaping where applicable; no untrusted content echoed raw.
- Secure headers/cookies where relevant (e.g., helmet, httpOnly/SameSite/secure if setting cookies).
- No secrets hardcoded; env/secret manager usage encouraged.
- One fenced corrected code block with language tag and filename comment; no unfenced snippets.
- Verification artifact: a concrete security check command (e.g., `npm audit --audit-level=high` or equivalent).
