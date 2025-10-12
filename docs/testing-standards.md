# Testing & QA Standards

## Coverage Targets
- Default: ≥ 90% lines & branches.
- Critical libraries/security-sensitive code: ≥ 95%.
- Applications/services: ≥ 85–90% minimum with justification.

## Test Pyramid
- Unit tests fast and isolated; no network or clock leaks.
- Integration tests using fakes/containers.
- E2E tests for core flows; synthetic data only.

## Determinism
- Control time, RNG, and IO in tests.
- Use property-based testing for core invariants.

## CI Gates
- Lint → Unit → Integration → Coverage threshold → SAST → SBOM.
- Fail on flakiness or non-deterministic tests.

## Test Docs
- Each test file names the behavior under test and the oracle condition.
