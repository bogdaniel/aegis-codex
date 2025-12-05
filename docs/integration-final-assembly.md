# Integration & Final Assembly Checklist

- Purpose: tie together architecture, security, testing, CI, and agents into a cohesive configuration. Use after regenerating `.cursor/rules/` and `AGENTS.md`.

## Configuration
- Regenerate rules: `node scripts/build-agents-doc.js --copy-rules` (or `--both` if AGENTS.md needed).
- Ensure `.cursor/rules/` and `AGENTS.md` match `rules/` sources; do not edit generated files.
- Verify CI config includes architecture/testing/security gates per `rules/topics/34-ci.mdc`.

## Architecture & Security
- Architecture/DDD enforced per `rules/architecture/36-architecture.mdc` and `rules/methodologies/44-ddd.mdc`; bounded contexts + trust tiers documented.
- Security baseline per `rules/topics/30-security.mdc` and threat modeling per `rules/topics/30-threat-modeling.mdc`; check secure coding checklists (docs/secure-coding-checklists.md).
- Cross-context contracts follow `rules/topics/35-api-lifecycle.mdc` and `rules/architecture/38-anti-corruption-events.mdc`.

## Testing & QA
- Testing requirements per `rules/topics/31-testing.mdc`; change-control per `rules/core/23-change-control.mdc` and bug/regression/diff/doc rules (45–48).
- Tooling: see `docs/testing-tooling-matrix.md` for unit/integration/E2E references per language.
- CI must enforce coverage and architecture checks; see `rules/topics/34-ci.mdc`.

## Agents & Prompts
- Use `AGENTS.md` as human-readable summary; core agents (`@architect`, `@implementer`, `@code-reviewer`, etc.) are mandatory for backend work.
- Risk overrides only via explicit `rules/topics/3G-risk-overrides.mdc`.
- AI/assistant usage follows `rules/core/22-ai-assistants.mdc`; ensure traceability and review.

## Delivery & Operations
- Feature flags/rollouts per `rules/topics/3F-feature-flags-rollouts.mdc`; rollback triggers per `rules/core/10-global.mdc` and `rules/topics/3D-operations.mdc`.
- Config/env handling per `rules/architecture/3E-config-environments.mdc`; secrets externalized.
- Observability/ops per `rules/topics/32-observability.mdc` and `rules/topics/3D-operations.mdc` (logs/metrics/traces/runbooks).
