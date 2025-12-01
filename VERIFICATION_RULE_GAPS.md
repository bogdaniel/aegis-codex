## New Rules Added

- **`rules/3E-config-environments.mdc`**  
  - **Gap closed**: Previously, there was no explicit, centralized rule governing configuration sources, environment strategy, and parity across dev/test/stage/prod. This rule establishes a single-source-of-truth configuration model, enforces layer-appropriate config access (aligned with `.cursor/rules/36-architecture.mdc`), and tightens handling of sensitive configuration in line with `.cursor/rules/30-security.mdc` and `.cursor/rules/3B-data-persistence.mdc`.

- **`rules/3F-feature-flags-rollouts.mdc`**  
  - **Gap closed**: The Codex lacked a dedicated doctrine for feature flags, rollout strategies, and rollback mechanisms. This rule defines when and how to use flags (especially for Tier H/M contexts), ties them to observability and operations (`.cursor/rules/32-observability.mdc`, `.cursor/rules/3D-operations.mdc`), and mandates ownership, hygiene, and cleanup for flags.

- **`rules/35-api-lifecycle.mdc`**  
  - **Gap closed**: The original `rules/35-api.mdc` covered baseline API design but did not fully specify lifecycle, compatibility, and deprecation policy. The new rule preserves all existing constraints, extends them with explicit versioning and lifecycle requirements, and supersedes `rules/35-api.mdc` as the canonical API lifecycle rule while marking the old file as deprecated.

- **`rules/45-bugfix-protocol.mdc`**  
  - **Gap closed**: There was no hard, enforceable protocol for bugfixing that ties reproducing and confirming bugs to tests. This rule mandates a four-step flow (reproduce, confirm, fix, guard), requires regression tests for bugfixes, integrates with `.cursor/rules/42-tdd.mdc`, `.cursor/rules/41-bdd.mdc`, and `.cursor/rules/31-testing.mdc`, and explicitly links bugfixes to scoped diffs (`rules/47-diff-discipline.mdc`) and doc-sync (`rules/48-doc-sync.mdc`) when contracts change.

- **`rules/46-regression-discipline.mdc`**  
  - **Gap closed**: Tests were not formally treated as contracts, leading to ad-hoc deletions or weakening to “make CI green”. This rule establishes tests-as-contracts, forbids silent test removal/weakening without spec/ADR updates and change-control (`.cursor/rules/23-change-control.mdc`), and requires that new or changed behavior be accompanied by appropriate happy-path, failure-path, and edge-case tests.

- **`rules/47-diff-discipline.mdc`**  
  - **Gap closed**: There was no explicit discipline around diff scope and blast radius for LLM agents and contributors. This rule requires clearly stated scope/goals, forbids bundling broad refactors with narrow tasks, tightens diff discipline for Tier H/M contexts (aligned with `.cursor/rules/36-architecture.mdc` and `.cursor/rules/43-fdd.mdc`), and gives reviewers criteria to flag drive-by or cross-context changes.

- **`rules/48-doc-sync.mdc`**  
  - **Gap closed**: Behavior and contract changes could occur without forcing updates to ADRs, API specs, domain docs, or runbooks. This rule defines spec/doc artifacts, makes code/spec drift a policy violation, requires synchronized updates for API, domain, security, data, and SLO changes, and integrates with `.cursor/rules/23-change-control.mdc`, `.cursor/rules/35-api-lifecycle.mdc`, `.cursor/rules/36-architecture.mdc`, and `.cursor/rules/3D-operations.mdc`.


