# Testing Standards
- **Purpose:** Ensure deterministic, meaningful tests guard behavior changes. Default target: 80%+ coverage with emphasis on critical paths and error handling. Tests precede or accompany behavior changes (see TDD/ATDD/BDD rules).
- **Scope:** Applies to unit, integration, and E2E tests across all languages/stacks in this repo.

## Principles
- Tests precede or accompany behavior changes (TDD bias); every behavior change requires tests or explicit evidence of existing coverage.
- Make tests deterministic and hermetic: no network/clock randomness; use fakes/mocks; freeze time.
- Arrange-Act-Assert structure; descriptive names stating intent and expectation.
- Cover happy path, edge cases, and failure modes; add regression tests for all fixed bugs.
- Keep fixtures small and explicit; avoid global state; ensure tests run in parallel safely.

## Types
- Unit: pure logic with dependencies mocked; fast and isolated.
- Integration: real collaborations (DB, HTTP) via test containers/fakes; seed known data; clean up.
- End-to-End: minimal critical paths; avoid flakiness; run behind flags; keep execution time bounded.

## Tooling & Commands
- Use language-specific runners/lints from docs/language-guides; prefer default commands:
  - JavaScript/TypeScript: `npm test` (vitest/jest)
  - Python: `pytest -q`
  - Go: `go test ./...`
  - Rust: `cargo test --all`
  - PHP: `./vendor/bin/phpunit`
  - Dart/Flutter: `dart test` / `flutter test`
- Static analysis and security checks must run with tests where available.

## Quality Gates
- Fail on flaky tests; mark-and-fix, do not skip silently; reject order-dependent or stateful tests.
- No `sleep`-based synchronization; use awaits, events, or polling with timeouts.
- No `forceExit`/process termination in tests; ensure graceful teardown.
- No real secrets or external credentials in tests; use generated placeholders.

## Data & Isolation
- Use ephemeral databases/containers for integration; auto-migrate and tear down.
- Reset state between tests; run with randomized order when feasible to detect interdependencies.
- Limit parallelism for shared resources; bound resource usage to avoid exhaustion.

## Reporting
- Surface coverage reports; flag drops in critical modules.
- Log assertions with context; prefer structured assertions over snapshot overuse.

## Alignment with Methodologies
- ATDD/BDD: express acceptance in domain language; keep acceptance/E2E suites small, stable, and focused on business outcomes.
- TDD: write failing tests first, implement minimal code, then refactor with tests green; tests encode contracts and edge cases.
- FDD/DDD: ensure slices/aggregates have corresponding tests for behavior and invariants; update tests when acceptance/domain rules change before code changes.
