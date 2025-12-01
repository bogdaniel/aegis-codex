# Testing Checklist

This checklist reflects the **MANDATORY** requirements from `rules/31-testing.mdc` and is **not optional** for non-Tier-S backend code.

## Before Marking a Change as Complete

For any backend/domain behavior change (new feature, bugfix, refactor that changes behavior):

- [ ] **Domain tests:** Did any value object (VO) invariants change? → VO tests updated/added.
- [ ] **Domain tests:** Did any entities/aggregates change behavior? → Entity tests updated/added.
- [ ] **Domain tests:** Did any domain events change structure or data? → Domain event tests updated/added.
- [ ] **Application tests:** Did any use case/application service behavior change? → Application tests updated/added.
- [ ] **Failure paths:** Is there at least one negative/failure path test for each non-trivial branch or validation?
- [ ] **Coverage:** Do tests clearly cover the bug/feature described in the change (happy path + at least one failure path)?

## What Counts as a "Behavior Change"

- New execution paths or workflows
- Changed invariants or validation rules
- Different side effects (events published, persistence operations, external calls)
- Modified business rules or domain logic

## When Both Domain and Application Tests Are Required

If your change affects **both** domain logic (VOs, entities, events) **and** use case behavior:

- ✅ **Domain tests** for the domain changes
- ✅ **Application tests** for the use case changes
- ❌ **NOT acceptable:** Only Application tests (missing Domain tests)
- ❌ **NOT acceptable:** Only Domain tests (missing Application tests)

## Exceptions

Only allowed for:
- Clearly-marked Tier S scripts
- Pure presentation-only code (UI-only changes with no backend logic)

For these exceptions:
- Tests MAY be lighter, but not entirely absent
- MUST be explicitly noted in the change description or ADR with justification
- MUST reference a valid risk override per `rules/3G-risk-overrides.mdc` if required tests are missing

## Blocking Issues

A change **MUST NOT** be considered complete if:

- Domain behavior changed but only Application tests were added → **BLOCKER**
- Use case behavior changed but only Domain tests were added → **BLOCKER**
- Tests cover only the happy path without at least one negative/failure path → **BLOCKER**
- Required tests are missing and no valid risk override is provided → **BLOCKER**

## Self-Verification

Before saying "done", verify:

1. **Domain tests present?** (if domain behavior changed)
2. **Application tests present?** (if use case behavior changed)
3. **Failure path tests present?** (for non-trivial logic)
4. **Exceptions documented?** (if any required tests are missing)

## References

- `rules/31-testing.mdc` — Testing standards (MANDATORY requirements)
- `rules/20-agents.mdc` — Agent responsibilities for testing
- `rules/3G-risk-overrides.mdc` — Risk override protocol (for exceptions)

