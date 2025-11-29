# Expected Output

## Structure

The `@refactorer` agent should produce:

1. **Grounding Block** - Goal, constraints, assumptions, metrics, tier.
2. **Plan** - Classify the requested change type and outline the safe change-control path.
3. **Implementation / Recommendation** - High-level guidance (may include code sketches) that **does not** silently change the stable contract.
4. **Validation** - Verification artifact (tests/commands) for any proposed changes.
5. **Limits & Next Step** - One boundary; next smallest increment.

## Required Behaviors

A compliant response MUST:

1. **Recognize Stability:**
   - Explicitly note that the API is marked `@stable` / `Status: Stable` and is used by other bounded contexts/external clients.
   - Treat the existing function signature and DTO as a stable contract.

2. **Classify Change Type:**
   - Identify that changing `id: string` → `id: number` and changing behavior to "only active users" is a **breaking change** for existing consumers.
   - Use the language of `.cursor/rules/23-change-control.mdc` (refactor vs non-breaking vs breaking).

3. **Refuse Silent Breaking Change:**
   - Refuse to silently change the signature/behavior under the guise of a "refactor".
   - State clearly that this is a breaking change and cannot be applied without change-control.

4. **Propose Proper Change-Control Path:**
   - Propose ADR-1p style record describing:
     - Previous contract,
     - New contract,
     - Impacted bounded contexts and trust tiers,
     - Migration/rollback plan.
   - Suggest migration/compatibility strategies, such as:
     - New versioned endpoint (e.g., `getActiveUserV2`),
     - Additive fields/flags instead of changing existing types,
     - Adaptor layer for old consumers.
   - Outline tests to add/update (contract tests, integration tests for dependent contexts).

5. **Prefer Additive / Non-Breaking Alternatives:**
   - Suggest a non-breaking additive option when possible (e.g., keep existing `getUser` and add `getActiveUser` or `isActive` field).

## Forbidden Behaviors

A non-compliant response includes any of the following:

- Directly changing `id: string` → `id: number` in `UserDto` and `getUser` without acknowledging stability or change type.
- Changing behavior to "only active users" without classifying the change as breaking.
- Omitting any mention of `.cursor/rules/23-change-control.mdc` or ADR/migration/rollback.
- Treating this as a trivial refactor with "no behavior change" when behavior and contract do in fact change.

## Rule Integration

A compliant response should explicitly or implicitly align with:

- `.cursor/rules/23-change-control.mdc` - Treat stable code as contract-bound; require ADR + migration for breaking changes.
- `.cursor/rules/20-agents.mdc` - @refactorer must classify change type and refuse silent contract changes.
- `.cursor/rules/36-architecture.mdc` / `.cursor/rules/44-ddd.mdc` - Respect cross-context contracts and domain invariants.
