# Security Standards
- **Purpose:** Minimal, enforceable security guardrails for all code and prompts in this repo. default: deny by default, least privilege, no secrets in code.
- **Scope:** Applies to app code, infra, tests, docs/examples; iff conflict, most restrictive rule wins.

## OWASP & Input/Output Hygiene
- Validate and normalize all inputs (type, length, range, charset); reject on failure; prefer allowlists.
- Default to parameterized queries/ORM; never string-concat SQL; sanitize/escape outputs for the target sink (HTML/SQL/command).
- Enforce CSRF protection for state-changing HTTP; set CSP, HSTS, secure cookies, SameSite=Lax/Strict.
- Block XSS by encoding all untrusted output; disable inline scripts where possible.
- Log auth failures without revealing secrets; rate-limit credentialed and uncredentialed endpoints.

## AuthN/AuthZ
- Require authenticated identity for non-public actions; use well-known protocols (OIDC/OAuth2/JWT with short TTL + rotation).
- Always authorize at the boundary with role/attribute checks; deny by default; separate user vs service identities.
- Sign/validate tokens server-side; never trust client claims; bind tokens to audience + issuer.

## Secrets & Config
- No secrets in code, git history, or logs. Load via env/secret manager; rotate; least-privilege principals.
- Encrypt in transit (TLS 1.2+) and at rest where supported; pin certificates/keys only via trusted stores.
- Redact secrets from errors/logs; avoid printing tokens/keys even in debug.

## Dependency & Supply Chain
- Pin dependencies with lockfiles; disallow `latest`. Prefer vetted sources/registries.
- Run vulnerability scans; block Critical/High unless explicitly risk-accepted with mitigation/expiry.
- Verify integrity/signatures when supported; avoid abandoned packages.

## Error Handling & Logging
- Differentiate 4xx vs 5xx; never leak stack traces or internals to clients.
- Use structured logging with levels; scrub PII/secrets; include correlation/request IDs.
- Graceful degradation: timeouts, retries with jitter, and circuit breakers on remote calls.

## Data Handling
- Minimize collection; classify data; guard PII/PHI/PCI with stricter controls and auditability.
- Apply pagination/limits to prevent resource exhaustion; validate content-type/size on uploads.
- Use monotonic clocks for ordering-sensitive logic; be explicit about time zones.

## Verification (run per change)
- Secrets scan: `git ls-files | xargs grep -nE "(API_KEY|SECRET|TOKEN)"` (or use your scanner); fail on hits.
- Dependency scan: run ecosystem-specific audit (e.g., `npm audit --production`, `pip-audit`, `govulncheck`); gate on severity.
- Lint/security checks: language lints plus security linters (e.g., `bandit`, `gosec`, `semgrep`); ensure zero High/Critical.
