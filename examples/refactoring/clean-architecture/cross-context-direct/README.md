# Clean Architecture: Direct Cross-Context Imports → Public API Modules

## Problem

One bounded context directly imports another context's Domain or Infrastructure:
- OrdersContext imports `User` entity directly from IdentityContext Domain
- OrdersContext imports `InMemoryUserRepository` from IdentityContext Infrastructure
- Violates bounded context boundaries and DDD principles

This creates tight coupling between contexts and breaks encapsulation.

## Solution

Use public API modules (facades) for cross-context communication:
- Each context defines a public API module in Application layer
- Cross-context imports go through public API modules only
- Direct Domain/Infrastructure imports are forbidden
- ACL (Anti-Corruption Layer) pattern for cross-context ports

## Files

- `before.ts` — Direct cross-context imports
- `after.ts` — Public API modules with ACL pattern

## Principles Applied

- **DDD:** Bounded contexts have explicit boundaries
- **Clean Architecture:** Cross-context via public API modules
- **ACL Pattern:** Anti-Corruption Layer shields contexts from each other
- **Hexagonal Architecture:** Ports and adapters for cross-context communication


