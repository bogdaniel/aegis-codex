# Code Review Standards
- **Purpose:** Ensure reviews improve code quality, safety, and maintainability without blocking flow unnecessarily.
- **Scope:** Applies to all changes; reviewers enforce, authors comply.

## What to Review
- Correctness: logic, edge cases, error handling, contracts.
- Security: input validation, authZ/authN, secrets handling, dependency risks.
- Tests: coverage for behavior changes, edge cases, and regressions.
- Performance: hot paths, N+1 queries, unbounded work, resource usage.
- Observability: structured logs, metrics, tracing, health/readiness.
- Maintainability: readability, naming, coupling/cohesion, dead code.

## Review Rules
- Block on: correctness issues, security risks, missing tests for new behavior, obvious performance/observability regressions.
- Suggest (non-blocking): style tweaks, minor refactors, naming improvements.
- Prefer specific, actionable comments; include rationale and examples.
- Avoid “drive-by” scope creep; keep feedback focused on the change set.

## Hygiene
- Keep PRs small and focused where possible.
- Ensure CI is green (lint, tests, security checks) before review.
- Resolve conversations explicitly; document deferred follow-ups as tasks.

## Verification
- For each review, ensure at least: tests updated/added, CI green, and no unresolved High/Critical security/performance concerns.
