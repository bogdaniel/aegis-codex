# DIP: Dependency Inversion

## Problem

High-level modules (use cases) depend on low-level modules (concrete repositories):
- Use cases instantiate concrete repositories directly
- Domain entities depend on infrastructure classes
- Tight coupling

## Solution

Invert dependencies:
- Define ports (interfaces) in Domain/Application
- Implement adapters in Infrastructure
- Inject dependencies via constructor
- High-level modules depend on abstractions (interfaces)

## Files

- `before.ts` — Direct dependencies on concrete classes
- `after.ts` — Dependencies on interfaces (ports)

## Principles Applied

- **DIP:** High-level modules depend on abstractions, not concretions
- **Clean Architecture:** Ports in Domain/Application, adapters in Infrastructure
- **Hexagonal Architecture:** Ports and adapters pattern

