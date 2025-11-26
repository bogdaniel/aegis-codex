# Policy Test Scenarios

These scenarios validate that agents enforce critical policies correctly. Each scenario includes:
- `prompt.md` - The prompt to run in Cursor
- `expected-output.md` - Expected agent behavior and output structure
- `validation.md` - Acceptance criteria with checkboxes

## Structure

Each policy scenario follows the same structure as `tests/multi-agent/` scenarios:
- **Prompt:** The exact prompt to run in Cursor
- **Expected Output:** What the agent should produce
- **Validation:** Checklist of acceptance criteria

## Scenarios

- `ts-handler-missing-validation/` - Security auditor must catch missing validation and SQL injection

## How to Use

1. **Read the scenario prompt** from `[scenario-name]/prompt.md`
2. **Run the prompt in Cursor** using the specified agent
3. **Compare output** against `[scenario-name]/expected-output.md`
4. **Validate** using criteria in `[scenario-name]/validation.md`

## Enforcement

These policies are enforced by:
- **CI Integration:** Policy validation can be added to CI pipelines (see `.cursor/rules/34-ci.mdc`)
- **Rule References:** Policies reference specific rules that must be enforced (see validation.md in each scenario)
- **Agent Behavior:** Agents MUST comply with these policies (see `.cursor/rules/20-agents.mdc`)

## Updating Policies

When updating rules or agents:
1. Run relevant policy scenarios
2. Compare outputs to acceptance criteria
3. **MANDATORY:** If agent output does not satisfy a policy scenario, you MUST tighten the relevant `.cursor/rules/*.mdc` file and regenerate AGENTS.generated.md (if applicable).
4. Update policy validation criteria if needed
5. Document any deviations or issues

**Rule Tightening Loop:**
- Policy scenarios are triggers for rule tightening.
- If a policy scenario fails, the relevant rule file MUST be updated to ensure compliance.
- This creates a feedback loop: rules → agents → policies → rules.

## Enforcement

Policy scenarios are **enforceable** through:
- **Validation Script:** `scripts/validate-policies.sh` validates scenario structure
- **CI Integration:** Policy validation runs in GitHub Actions (see `.github/workflows/aegis-architecture-check.yml`)
- **Pre-commit Hooks:** Policy validation runs before commits (see `.pre-commit-config.yaml`)
- **Rule References:** Policies referenced in `.cursor/rules/*.mdc` files

See `tests/policies/ENFORCEMENT.md` for detailed enforcement mechanisms.

## See Also

- `tests/policies/ENFORCEMENT.md` - Detailed enforcement documentation
- `docs/test-scenarios.md` - Main test scenarios documentation
- `tests/multi-agent/` - Multi-agent workflow scenarios
- `.cursor/rules/20-agents.mdc` - Agent definitions and enforcement rules
- `.cursor/rules/34-ci.mdc` - CI/CD standards including policy validation
