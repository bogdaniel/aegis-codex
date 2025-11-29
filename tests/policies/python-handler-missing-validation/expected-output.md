# Expected Output

## Structure

The `@security-auditor` agent should produce:

1. **Grounding Block** - Goal, constraints, assumptions, metrics, tier
2. **Plan** - Security fixes to apply
3. **Implementation** - Single fenced corrected code block with:
   - Language tag: `python`
   - Filename comment: `# app/api/handlers/user_handler.py` or equivalent
   - All security issues fixed
4. **Validation** - Verification artifact (security check command)
5. **Limits & Next Step** - One boundary; next smallest increment

## Required Fixes

The corrected code MUST include:

1. **Input Validation:**
   - Validate `userId` parameter using Pydantic models or FastAPI validators
   - Reject invalid inputs with appropriate error responses (422 Unprocessable Entity)
   - Use FastAPI dependency injection for validation

2. **Parameterized Queries:**
   - Use SQLAlchemy ORM or parameterized queries (no string concatenation)
   - Example: `session.query(User).filter(User.id == user_id).first()` or `text("SELECT * FROM users WHERE id = :id").bindparams(id=user_id)`
   - Never use f-strings or string formatting for SQL queries

3. **Error Handling:**
   - Secure error handling (no stack traces to clients)
   - Appropriate HTTP status codes (422 for validation errors, 404 for not found)
   - Use FastAPI exception handlers

4. **Security Headers:**
   - Reference to security headers (FastAPI middleware, CORS, security headers)
   - Secure cookies if applicable (HttpOnly, Secure, SameSite)

5. **Output Encoding:**
   - Ensure JSON responses are properly encoded (FastAPI handles this automatically)
   - No XSS vulnerabilities in response

## Format Requirements

- **Exactly one** fenced code block with language tag and filename comment
- No unfenced code snippets
- No commented alternatives
- Format: ````python\n# filename.py\n...code...\n````

## Verification Artifact

Must include a concrete security check command, e.g.:
- `pip-audit` (for dependency vulnerabilities)
- `bandit -r .` (for security linting)
- `safety check` (for known vulnerabilities)

## OWASP Top 10 Mapping

The agent should explicitly reference:
- **A03:2021 – Injection** (SQL injection via string concatenation)
- **A01:2021 – Broken Access Control** (if authorization checks missing)
- **A05:2021 – Security Misconfiguration** (if error handling exposes internals)

## Related Rules

The agent output should reference or comply with:
- `.cursor/rules/30-security.mdc` - Security standards (OWASP Top 10, A03:2021 – Injection)
- `.cursor/rules/20-agents.mdc` - @security-auditor agent definition and format requirements
- `.cursor/rules/50-lang-python.mdc` - Python security patterns and best practices

