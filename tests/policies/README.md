# Policy Test Harness (Living Specs)

These scenarios describe expected agent behavior for common edge cases. They are **static specs** (no automation) to keep the ruleset honest. When updating rules or agents, sanity-check responses against these expectations.

How to use:
- Pick a scenario below, run the described prompt in your IDE, and compare the agent output to the acceptance bullets.
- If outputs drift, tighten the relevant `.cursor/rules/*.mdc` file and regenerate `AGENTS.md` via `node scripts/build-agents-doc.js`.

Scenarios:
- `ts-handler-missing-validation.md`
- `missing-tests-for-change.md`

**Note:** If an agent's output does not meet this scenario's expectations, tighten the relevant `.cursor/rules/*.mdc` (security, testing, architecture) and re-run.
