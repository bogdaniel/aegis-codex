# Secure Coding Checklists (Reference)

- Purpose: language/framework-specific secure coding reminders. Use alongside binding rules in `rules/topics/30-security.mdc`; architecture/testing mandates remain non-negotiable.

## TypeScript / Node / React
- Auth/session: use signed/HttpOnly/SameSite cookies; rotate tokens; validate issuer/audience.
- Input validation: zod/yup/schema validation at boundaries; strip unexpected fields; enforce types.
- XSS: escape output; avoid `dangerouslySetInnerHTML`; use CSP; sanitize rich text.
- CSRF: enable CSRF protection on state-changing routes; SameSite=strict/lax.
- SSRF: URL allowlists; block internal IPs; use safe fetch clients.
- Secrets: never in code; use env/secret manager; do not log secrets.

## Python / Django / FastAPI
- Auth/session: Django auth middleware; secure cookies; rotate tokens; FastAPI/JWT with issuer/audience checks.
- Input validation: Pydantic models (FastAPI); Django forms/serializers validation.
- XSS/CSRF: Django’s built-in CSRF; escape templates; FastAPI enable CSRF for browser clients where applicable.
- SQLi: ORM parameterization; avoid raw SQL; if raw, use placeholders.
- SSRF: validate URLs; block internal hostnames; requests session with allowlist.

## PHP / Laravel
- Auth/session: Laravel Auth/Sanctum/Passport; HttpOnly/SameSite cookies; rotate tokens.
- Input validation: Laravel validation rules on controllers/requests; deny unknown fields.
- XSS/CSRF: Blade escaping by default; CSRF middleware enabled; avoid `{!! !!}`.
- SQLi: Eloquent/Query Builder parameterization; avoid string concatenation.
- Secrets: `.env`, config caching; never commit keys; mask secrets in logs.

## Java / Spring Boot
- Auth: Spring Security; method-level auth (`@PreAuthorize`); validate JWT issuer/audience.
- Input validation: Bean Validation (`@Valid`, `@NotNull`, etc.); fail-fast.
- XSS/CSRF: Thymeleaf escaping; CSRF for browser clients; content security headers.
- SQLi: JPA/Hibernate parameter binding; avoid string concatenation; use NamedParameterJdbcTemplate.
- SSRF: URL allowlists; block internal hosts; timeouts on outbound HTTP.

## Go
- Auth: middleware for JWT/session; validate claims; short TTL tokens.
- Input validation: struct tags + validators (go-playground/validator).
- SQLi: database/sql with placeholders; use sqlc/ent/gorm parameter binding.
- XSS/CSRF: template escaping; CSRF middleware for browser clients.
- SSRF: validate URLs; deny internal IPs; timeouts + context on HTTP clients.

## C#
- Auth: ASP.NET Core Identity/JWT with audience/issuer validation.
- Input validation: DataAnnotations/FluentValidation; model binding validation.
- XSS/CSRF: Razor encoding; Antiforgery middleware for browser clients.
- SQLi: parameterized queries; Entity Framework parameter binding.
- SSRF: URL allowlists; HttpClient with timeouts; block link-local/internal hosts.

## Frontend (HTML/CSS/JS)
- Avoid inline scripts/styles; use CSP/nonces.
- Escape/encode user input; sanitize rich text.
- Handle tokens in secure cookies; avoid localStorage for sensitive tokens.
- Enforce SameSite + secure cookie flags; CSRF tokens for state-changing requests.

