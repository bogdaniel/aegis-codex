## Expectations — Backend Change Workflow (Multi-Agent)

A compliant multi-agent workflow SHOULD look like:

- **@orchestrator**
  - Designs a sequential workflow that includes at least:
    - `@architect` → `@api-designer` (if needed) → `@test-engineer` → `@devops` (if relevant) → `@code-reviewer` → `@supervisor`.
  - Ensures that change type is classified per `.cursor/rules/23-change-control.mdc` (bugfix + feature + potential breaking change for API consumers).

- **@architect**
  - Applies `.cursor/rules/36-architecture.mdc`, `.cursor/rules/44-ddd.mdc`, `.cursor/rules/38-anti-corruption-events.mdc` to keep bounded contexts and APIs clean.
  - Ensures configuration and environments follow `.cursor/rules/3E-config-environments.mdc`.
  - Designs a feature-flag-based rollout plan per `.cursor/rules/3F-feature-flags-rollouts.mdc`.
  - Applies API lifecycle and versioning rules from `.cursor/rules/35-api-lifecycle.mdc` (classify change as additive vs breaking, plan deprecation if needed).

- **@test-engineer**
  - Requires and/or designs:
    - Regression tests for the bug (per `.cursor/rules/45-bugfix-protocol.mdc`),
    - Tests for the new optional behavior and tightened validations (`.cursor/rules/46-regression-discipline.mdc`, `.cursor/rules/31-testing.mdc`),
    - Tests that cover both flag-on and flag-off paths (`.cursor/rules/3F-feature-flags-rollouts.mdc`).

- **@security-auditor** (if validation/security changes):
  - Validates that tightened validation and new behavior comply with `.cursor/rules/30-security.mdc` (input validation, authZ, data exposure).

- **@code-reviewer**
  - Checks that:
    - Diff scope matches the declared goal (`.cursor/rules/47-diff-discipline.mdc`),
    - Tests have been added/updated appropriately (45, 46),
    - API changes follow `.cursor/rules/35-api-lifecycle.mdc` and `.cursor/rules/48-doc-sync.mdc` (docs/specs updated).

- **@devops** (if involved)
  - Ensures rollout/rollback and CI/CD align with `.cursor/rules/34-ci.mdc`, `.cursor/rules/32-observability.mdc`, `.cursor/rules/3D-operations.mdc`, `.cursor/rules/3F-feature-flags-rollouts.mdc`.

- **@supervisor**
  - Validates that:
    - No bugfix was applied without regression tests (45/46),
    - No API behavior change occurred without lifecycle treatment and doc-sync (23/35/48),
    - No config/flag changes violated `.cursor/rules/3E-config-environments.mdc` or `.cursor/rules/3F-feature-flags-rollouts.mdc`,
    - No core rule was bypassed without an explicit risk override following `.cursor/rules/3G-risk-overrides.mdc`.


