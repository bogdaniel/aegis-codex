# Validation Criteria

## Must Pass

- [ ] Agent follows format requirements (single fenced code block with language tag and filename comment)
- [ ] Output matches expected structure (Grounding Block, Plan, Implementation, Validation, Limits)
- [ ] All security issues identified and fixed
- [ ] OWASP Top 10 mapping provided (A03:2021 – Injection at minimum)
- [ ] Verification artifact provided (concrete security check command)

## Security Fixes Validation

- [ ] **Input Validation:**
  - [ ] `userId` parameter validated (type, format, range)
  - [ ] Invalid inputs rejected with appropriate error responses (400 Bad Request)
  - [ ] Validation logic follows TypeScript best practices

- [ ] **SQL Injection Prevention:**
  - [ ] Parameterized queries used (no string concatenation)
  - [ ] ORM or prepared statements used
  - [ ] No raw SQL with user input

- [ ] **Error Handling:**
  - [ ] Secure error handling (no stack traces to clients)
  - [ ] Appropriate HTTP status codes (400, 404, 500)
  - [ ] Error messages don't expose internal details

- [ ] **Security Headers:**
  - [ ] Reference to security headers (helmet or equivalent)
  - [ ] Secure cookies if applicable (HttpOnly, Secure, SameSite)

- [ ] **Output Encoding:**
  - [ ] JSON responses properly encoded
  - [ ] No XSS vulnerabilities in response

## Format Compliance

- [ ] Exactly one fenced code block
- [ ] Language tag present (`typescript`)
- [ ] Filename comment present (`// filename.ts` or equivalent)
- [ ] No unfenced code snippets
- [ ] No commented alternatives

## Rule Compliance

- [ ] References `.cursor/rules/30-security.mdc` (OWASP Top 10)
- [ ] References `.cursor/rules/20-agents.mdc` (@security-auditor format)
- [ ] References `.cursor/rules/50-lang-typescript.mdc` (TypeScript security patterns)
- [ ] Security fixes respect architecture layering (if applicable)

## Verification Artifact

- [ ] Concrete security check command provided
- [ ] Command is runnable (e.g., `npm audit --audit-level=high`)
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
1. **Tighten `.cursor/rules/30-security.mdc`** - Add explicit SQL injection prevention rules
2. **Tighten `.cursor/rules/20-agents.mdc`** - Add explicit format requirements for @security-auditor
3. **Tighten `.cursor/rules/50-lang-typescript.mdc`** - Add TypeScript-specific security patterns
4. Re-run the scenario and verify fixes

## CI Integration

This policy can be validated in CI by:
- Running the prompt in a test environment
- Comparing output against expected-output.md
- Validating against criteria in this file
- Failing the pipeline if validation fails

See `.cursor/rules/34-ci.mdc` for CI integration details.

