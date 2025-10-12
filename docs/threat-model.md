# Threat Model (STRIDE)

## Assets
- Source code, artifacts, secrets, user data, build provenance.

## Entry Points
- Public APIs, web UI, CI/CD pipeline, package registry.

## Threats (STRIDE)
- **Spoofing:** Weak auth; mitigations: OIDC, MFA, mTLS internally.
- **Tampering:** Supply-chain injection; mitigations: SBOM, SLSA, signed artifacts.
- **Repudiation:** Missing audit logs; mitigations: immutable logs.
- **Information Disclosure:** Secrets in logs; mitigations: redaction, vault.
- **Denial of Service:** Unbounded concurrency; mitigations: rate limits, timeouts, quotas.
- **Elevation of Privilege:** Overbroad roles; mitigations: least privilege, scoped tokens.

## Validation
- Revisit this document for each major feature; update tests accordingly.
