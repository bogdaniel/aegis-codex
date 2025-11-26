# Expected Output

## Structure

The `@security-auditor` agent should produce:

1. **Grounding Block** - Goal, constraints, assumptions, metrics, tier
2. **Plan** - Security fixes to apply
3. **Implementation** - Single fenced corrected code block with:
   - Language tag: `typescript`
   - Filename comment: `// src/handlers/getUserHandler.ts` or equivalent
   - All security issues fixed
4. **Validation** - Verification artifact (security check command)
5. **Limits & Next Step** - One boundary; next smallest increment

## Required Fixes

The corrected code MUST include:

1. **Input Validation:**
   - Validate `userId` parameter (type, format, range)
   - Reject invalid inputs with appropriate error responses

2. **Parameterized Queries:**
   - Use parameterized queries or ORM (no string concatenation)
   - Example: `db.query('SELECT * FROM users WHERE id = ?', [userId])`

3. **Error Handling:**
   - Secure error handling (no stack traces to clients)
   - Appropriate HTTP status codes (400 for validation errors, 404 for not found)

4. **Security Headers:**
   - Reference to security headers (helmet middleware or equivalent)

5. **Output Encoding:**
   - Ensure JSON responses are properly encoded
   - No XSS vulnerabilities in response

## Format Requirements

- **Exactly one** fenced code block with language tag and filename comment
- No unfenced code snippets
- No commented alternatives
- Format: ````typescript\n// filename.ts\n...code...\n````

## Verification Artifact

Must include a concrete security check command, e.g.:
- `npm audit --audit-level=high`
- `npm run lint:security`
- `npm run security:scan`

## OWASP Top 10 Mapping

The agent should explicitly reference:
- **A03:2021 – Injection** (SQL injection via string concatenation)
- **A01:2021 – Broken Access Control** (if authorization checks missing)
- **A05:2021 – Security Misconfiguration** (if error handling exposes internals)

## Related Rules

The agent output should reference or comply with:
- `.cursor/rules/30-security.mdc` - Security standards (OWASP Top 10, A03:2021 – Injection)
- `.cursor/rules/20-agents.mdc` - @security-auditor agent definition and format requirements
- `.cursor/rules/50-lang-typescript.mdc` - TypeScript security patterns and best practices

