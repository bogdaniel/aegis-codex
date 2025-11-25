# Clean Architecture: Framework in Domain → Framework-Free Domain

## Problem

Domain layer contains framework dependencies:
- Domain entities extend ORM models (e.g., `Model`, `Entity`)
- Domain code imports framework classes (e.g., `Request`, `Response`, `Model`)
- Domain depends on infrastructure concerns (database, HTTP, etc.)

This violates Clean Architecture: Domain must be framework-free and independent of infrastructure.

## Solution

Remove all framework dependencies from Domain:
- Domain entities are plain classes (no ORM inheritance)
- Domain code has no framework imports
- Framework dependencies moved to Infrastructure layer
- Domain defines ports (interfaces), Infrastructure implements them

## Files

- `before.ts` — Domain with framework dependencies
- `after.ts` — Framework-free Domain with ports/adapters

## Principles Applied

- **Clean Architecture:** Domain is framework-free and independent
- **Hexagonal Architecture:** Ports in Domain, adapters in Infrastructure
- **DIP:** Domain depends on abstractions (ports), not concretions (frameworks)

