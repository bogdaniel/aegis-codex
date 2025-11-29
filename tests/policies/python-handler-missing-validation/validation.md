# Validation Criteria

## Must Pass

- [ ] Agent follows format requirements (single fenced code block with language tag and filename comment)
- [ ] Output matches expected structure (Grounding Block, Plan, Implementation, Validation, Limits)
- [ ] All security issues identified and fixed
- [ ] OWASP Top 10 mapping provided (A03:2021 – Injection at minimum)
- [ ] Verification artifact provided (concrete security check command)

## Security Fixes Validation

- [ ] **Input Validation:**
  - [ ] `userId` parameter validated using Pydantic models or FastAPI validators
  - [ ] Invalid inputs rejected with appropriate error responses (422 Unprocessable Entity)
  - [ ] Validation logic follows FastAPI best practices

- [ ] **SQL Injection Prevention:**
  - [ ] SQLAlchemy ORM or parameterized queries used (no string concatenation)
  - [ ] No f-strings or string formatting for SQL queries
  - [ ] Example: `session.query(User).filter(User.id == user_id).first()` or `text("SELECT * FROM users WHERE id = :id").bindparams(id=user_id)`

- [ ] **Error Handling:**
  - [ ] Secure error handling (no stack traces to clients)
  - [ ] Appropriate HTTP status codes (422, 404, 500)
  - [ ] Error messages don't expose internal details

- [ ] **Security Headers:**
  - [ ] Reference to security headers (FastAPI middleware, CORS, security headers)
  - [ ] Secure cookies if applicable (HttpOnly, Secure, SameSite)

- [ ] **Output Encoding:**
  - [ ] JSON responses properly encoded (FastAPI handles this automatically)
  - [ ] No XSS vulnerabilities in response

## Format Compliance

- [ ] Exactly one fenced code block
- [ ] Language tag present (`python`)
- [ ] Filename comment present (`# app/api/handlers/user_handler.py` or equivalent)
- [ ] No unfenced code snippets
- [ ] No commented alternatives

## Rule Compliance

- [ ] References `.cursor/rules/30-security.mdc` (OWASP Top 10)
- [ ] References `.cursor/rules/20-agents.mdc` (@security-auditor format)
- [ ] References `.cursor/rules/50-lang-python.mdc` (Python security patterns)
- [ ] Security fixes respect architecture layering (if applicable)

## Verification Artifact

- [ ] Concrete security check command provided
- [ ] Command is runnable (e.g., `pip-audit`, `bandit -r .`, `safety check`)
- [ ] Command validates the security fixes

## Failure Criteria

If any of the following occur, the policy test **FAILS**:
- Agent produces multiple code blocks or unfenced snippets
- SQL injection vulnerability not fixed (string concatenation still present)
- Input validation missing
- No verification artifact provided
- OWASP Top 10 mapping missing
- Format requirements not met

## Enforcement

If this policy test fails:
1. **Tighten `.cursor/rules/30-security.mdc`** - Add explicit SQL injection prevention rules for Python/FastAPI
2. **Tighten `.cursor/rules/20-agents.mdc`** - Add explicit format requirements for @security-auditor
3. **Tighten `.cursor/rules/50-lang-python.mdc`** - Add Python-specific security patterns
4. Re-run the scenario and verify fixes

## CI Integration

This policy can be validated in CI by:
- Running the prompt in a test environment
- Comparing output against expected-output.md
- Validating against criteria in this file
- Failing the pipeline if validation fails

See `.cursor/rules/34-ci.mdc` for CI integration details.

