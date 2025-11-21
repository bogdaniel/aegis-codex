# Compliance Checklist (Evaluation)

Use this as the acceptance bar for agent-produced changes. A change is **mergeable** only if all relevant sections pass.

## 1. Security
- Pass if: inputs are validated; no string-concatenated SQL; no hardcoded secrets; authZ/authN enforced where required; errors don’t leak sensitive data.
- Fail if: any obvious OWASP-style issue, hardcoded secret, or missing auth/validation on non-public endpoints.

## 2. Testing
- Pass if: tests exist/updated for every behavior change; cover happy path, edge cases, and failure modes; tests are deterministic; commands to run tests are provided.
- Fail if: behavior changes without tests; flaky/non-deterministic tests; missing test commands.

## 3. Observability
- Pass if: structured logs (with correlation IDs) exist at key points; basic metrics/signals are emitted; health/readiness checks are present for services.
- Fail if: no logs or only ad-hoc prints; no health/readiness; no way to trace a request across components.

## 4. Performance
- Pass if: hot paths avoid obvious N+1 queries, unbounded loops, or unbounded concurrency; pagination/limits are in place for large responses.
- Fail if: unbounded work per request; clear N+1 patterns or loading entire datasets into memory without bounds.

## 5. Architecture & Design
- Pass if: responsibilities are clearly separated; no god objects; dependencies respect boundaries (domain vs infrastructure); no shared mutable DB across services.
- Fail if: “big ball of mud” growth, god services, or shared DB integration; SOLID violations obvious from the change.

## 6. API Contracts
- Pass if: endpoints use appropriate HTTP methods/status codes; inputs/outputs are validated and well-shaped; pagination and errors are consistent.
- Fail if: breaking response shapes without versioning; unbounded list endpoints; inconsistent or misleading status codes.

## 7. CI/CD & Tooling
- Pass if: lint/type-check/test/security commands are provided or integrated; no reliance on `latest`/unpinned dependencies.
- Fail if: changes cannot be validated via commands; critical checks (lint/tests/security) are omitted.

## 8. Documentation
- Pass if: public-facing APIs or behaviors changed are discoverable (README/ADR/API doc updated as appropriate).
- Fail if: non-trivial new behaviors arrive with no discoverable docs.

