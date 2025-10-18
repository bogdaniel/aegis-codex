# Security Standards

## Baselines
- **OWASP ASVS L2/L3** coverage for application controls.
- **NIST SSDF (SP 800-218)** for secure software development lifecycle.
- **SLSA ≥ 3** build provenance; in-toto attestations.
- **SBOM (CycloneDX)** generated and stored with releases.

## Controls
- **AuthN/Z:** Prefer OIDC/OAuth2, short‑lived tokens, refresh rotation, least privilege.
- **Input Validation:** Schemas (JSON Schema/pydantic/zod), server-side checks, fail-closed.
- **Secrets:** Use vault/parameter store; rotate; no secrets in code or logs.
- **Transport:** TLS 1.2+; HSTS; secure cookies; no mixed content.
- **Storage:** Encrypt sensitive data; use KMS/HSM; FIPS 140‑3 validated crypto where required.
- **Headers:** CSP, X-Content-Type-Options, X-Frame-Options/Frame-Ancestors, Referrer-Policy.
- **Logging:** Structured, redacted; audit trails immutable.
- **Error Handling:** Generic user messages; detailed server logs only.
- **Dependency Hygiene:** Pin versions; use SCA (e.g., OWASP Dependency-Check, osv-scanner).

## Supply Chain
- Reproducible builds; lockfiles committed.
- Verify artifacts; sign releases (Sigstore).
- Provenance: build matrix hardening, isolated runners, minimal tokens.

## Threat Modeling
- Maintain `docs/threat-model.md` using STRIDE and attack trees.
