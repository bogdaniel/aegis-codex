# LSP: Liskov Substitution Principle — Contract Preservation

## Problem

Repository implementations that violate the base contract:
- `InMemoryUserRepository` throws exceptions for valid inputs (widens preconditions)
- `JpaUserRepository` returns different shapes than the interface promises (weakens postconditions)
- Subtypes cannot be substituted for base type without breaking behavior

## Solution

Ensure all implementations satisfy the same contract:
- All repositories handle all valid inputs consistently
- All repositories return the same data shapes
- Subtypes are truly substitutable for base type

## Files

- `before.ts` — Repository implementations with contract violations
- `after.ts` — Repository implementations preserving contracts

## Principles Applied

- **LSP:** Subtypes must be usable anywhere base type is expected
- **Contract Design:** Preconditions and postconditions must be consistent
- **Clean Architecture:** Port implementations must satisfy the same contract


