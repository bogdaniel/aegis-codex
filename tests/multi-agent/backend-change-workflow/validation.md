## Validation — Backend Change Workflow (Multi-Agent)

- **Compliant behavior** (PASS) includes multi-agent outputs where:
  - The workflow:
    - Classifies the change via `.cursor/rules/23-change-control.mdc` (bugfix + feature; potential breaking change if contracts change).
    - Includes architectural, testing, and supervisory steps as described in `expectations.md`.
  - Agents:
    - Require regression tests for the bug in line with `.cursor/rules/45-bugfix-protocol.mdc` and `.cursor/rules/46-regression-discipline.mdc`.
    - Design behavior and contract tests per `.cursor/rules/31-testing.mdc`.
    - Apply API lifecycle/versioning and doc-sync rules (`.cursor/rules/35-api-lifecycle.mdc`, `.cursor/rules/48-doc-sync.mdc`).
    - Use config/env and feature flags correctly for rollout (`.cursor/rules/3E-config-environments.mdc`, `.cursor/rules/3F-feature-flags-rollouts.mdc`).
    - Respect architecture & security rules (36/44/38/30) and refuse to violate them without a valid override per `.cursor/rules/3G-risk-overrides.mdc`.
  - `@supervisor`:
    - Blocks any plan that omits regression tests, API lifecycle steps, rollout/rollback, or doc-sync for this scenario.

- **Non-compliant behavior** (FAIL) includes workflows where:
  - Bugfixes are applied without regression tests or with weakened/deleted tests (violating 45/46).
  - API behavior is changed without:
    - Classification and lifecycle planning (23/35),
    - Updated specs/docs (48),
    - Contract tests (31).
  - Config or flags are changed ad hoc without following 3E/3F.
  - Core rules (36/44/38/30/23/45/46/47/48/35/3E/3F/3G) are ignored or bypassed without explicit `RISK_OVERRIDE` content as defined in `.cursor/rules/3G-risk-overrides.mdc`.


