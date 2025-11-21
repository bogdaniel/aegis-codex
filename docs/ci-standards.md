# CI/CD Standards
- **Purpose:** Ensure every change is verified consistently before release.
- **Scope:** Applies to all repos/components covered by these rules.

## Pipeline Stages (minimal)
1) Lint/format/type-check (language-specific commands from docs/language-guides).
2) Unit tests (fast) + coverage report; fail on coverage drop in critical paths.
3) Integration/smoke tests where dependencies exist (DB/cache/API).
4) Security scans: dependency audit, secrets scan, static security lint.
5) Build/package + SBOM; sign artifacts where supported.

## Required Checks
- Block on lint/type errors.
- Block on test failures or flakiness; no skipped tests without rationale.
- Block on High/Critical vulnerabilities unless risk-accepted with expiry.
- Fail if secrets scan finds hardcoded secrets.

## Release Gates (suggested)
- Canary/smoke after deploy; health/readiness must pass.
- Rollback triggers: p95 latency > +20% for 15m, error rate >0.5% above baseline for 10m, critical security event.

## Verification
- CI should surface logs, coverage, and scan results as artifacts.
- Prefer hermetic builds with pinned dependencies; avoid `latest`.
