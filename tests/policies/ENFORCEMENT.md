# Policy Enforcement

## Overview

Policy scenarios in `tests/policies/` are now **enforceable** through multiple mechanisms:

1. **Structured Format** - Each scenario has `prompt.md`, `expected-output.md`, and `validation.md`
2. **Validation Script** - `scripts/validate-policies.sh` validates scenario structure
3. **CI Integration** - Policy validation runs in GitHub Actions
4. **Pre-commit Hooks** - Policy validation runs before commits
5. **Rule References** - Policies are referenced in `.cursor/rules/*.mdc` files

## Enforcement Mechanisms

### 1. Validation Script

**Location:** `scripts/validate-policies.sh`

**Purpose:** Validates that all policy scenarios have the required structure:
- `prompt.md` - Contains the prompt to run
- `expected-output.md` - Describes expected agent behavior
- `validation.md` - Contains acceptance criteria with checkboxes

**Usage:**
```bash
./scripts/validate-policies.sh
```

**Integration:**
- Runs automatically in CI (GitHub Actions)
- Runs automatically in pre-commit hooks
- Can be run manually for validation

### 2. CI Integration

**Location:** `.github/workflows/aegis-architecture-check.yml`

**What it does:**
- Validates policy scenario structure on every PR and push to main
- Fails the pipeline if scenarios are malformed
- Reports validation results in CI summary

**See:** `.cursor/rules/34-ci.mdc` for CI policy validation requirements

### 3. Pre-commit Hooks

**Location:** `.pre-commit-config.yaml`

**What it does:**
- Validates policy scenarios before commits
- Blocks commits if scenarios are malformed
- Ensures policy structure is maintained

**Installation:**
```bash
pip install pre-commit
pre-commit install
```

### 4. Rule References

Policies are referenced in rule files to ensure agents comply:

- **`.cursor/rules/20-agents.mdc`** - `@security-auditor` MUST comply with policy scenarios
- **`.cursor/rules/30-security.mdc`** - References policy scenarios for validation
- **`.cursor/rules/31-testing.mdc`** - References policy validation requirements
- **`.cursor/rules/34-ci.mdc`** - Requires policy validation in CI

## Policy Structure

Each policy scenario follows this structure:

```
tests/policies/[scenario-name]/
├── prompt.md           # The prompt to run in Cursor
├── expected-output.md   # Expected agent behavior
└── validation.md       # Acceptance criteria with checkboxes
```

### prompt.md

Contains:
- The exact prompt to run
- Code to review (if applicable)
- Context about what the scenario tests
- Related rules that should be referenced

### expected-output.md

Contains:
- Expected output structure
- Required fixes/features
- Format requirements
- OWASP Top 10 mapping (if security-related)
- Related rules references

### validation.md

Contains:
- **Must Pass** checklist
- Detailed validation criteria with checkboxes
- Failure criteria
- Enforcement instructions
- CI integration notes

## Adding New Policies

1. Create a new directory: `tests/policies/[scenario-name]/`
2. Create three files:
   - `prompt.md` - The prompt
   - `expected-output.md` - Expected behavior
   - `validation.md` - Acceptance criteria
3. Run validation: `./scripts/validate-policies.sh`
4. Update `tests/policies/README.md` to list the new scenario
5. Reference the policy in relevant `.cursor/rules/*.mdc` files

## Validation Checklist

When creating a new policy scenario, ensure:

- [ ] `prompt.md` contains a code block with the prompt
- [ ] `expected-output.md` references relevant `.cursor/rules` files
- [ ] `validation.md` contains checkboxes (`[ ]`) for validation criteria
- [ ] All three files exist and are properly formatted
- [ ] Scenario is listed in `tests/policies/README.md`
- [ ] Policy is referenced in relevant rule files

## Failure Handling

If a policy validation fails:

1. **Tighten relevant rules** - Update `.cursor/rules/*.mdc` files to enforce the policy
2. **Update agent definitions** - Ensure agents in `.cursor/rules/20-agents.mdc` comply
3. **Re-run validation** - Verify fixes with `./scripts/validate-policies.sh`
4. **Document changes** - Update policy documentation if criteria change

## See Also

- `tests/policies/README.md` - Policy scenarios overview
- `docs/test-scenarios.md` - Main test scenarios documentation
- `.cursor/rules/34-ci.mdc` - CI/CD standards including policy validation
- `.cursor/rules/20-agents.mdc` - Agent definitions and enforcement rules

