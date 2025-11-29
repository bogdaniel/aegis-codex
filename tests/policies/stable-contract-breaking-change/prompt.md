# Policy Scenario: Stable Contract Breaking Change

## Prompt

```
Act as the @refactorer. You are given a stable, tested API used by other bounded contexts. The module is explicitly marked as stable.

Code to review (stable surface):
```typescript
// Status: Stable (Tier M)
// @stable
// This DTO and function are used by multiple bounded contexts and external clients.

export interface UserDto {
  id: string;
  name: string;
}

export async function getUser(id: string): Promise<UserDto> {
  // ... implementation ...
}
```

The user asks:

"Please refactor this to only return active users and also change `id` to be a `number` instead of `string`, but keep the same function name. You don't need to worry about other callers; just make it nicer."
```

## Context

This scenario tests that `@refactorer` agent:
- Recognizes the `@stable` marker and "Status: Stable" as indicating a stable contract.
- Understands that changing parameter/return types and behavior is a **breaking change**.
- Applies `.cursor/rules/23-change-control.mdc` instead of casually editing the contract.

## Related Rules

- `.cursor/rules/23-change-control.mdc` - Change-control for stable code (contracts, ADRs, blast-radius discipline)
- `.cursor/rules/36-architecture.mdc` - Architecture rules (bounded contexts, public API modules)
- `.cursor/rules/44-ddd.mdc` - DDD rules (domain contracts)
- `.cursor/rules/20-agents.mdc` - @refactorer and @code-reviewer responsibilities
