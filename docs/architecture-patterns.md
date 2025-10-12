# Architecture Patterns

## Core Tenets
- **Clean Architecture:** Domain (pure), Application (use cases), Interface (controllers/gateways), Infrastructure (adapters).
- **DDD:** Ubiquitous language, bounded contexts, aggregates, entities, value objects, repositories, domain events.
- **SOLID:** SRP, OCP via composition, LSP-safe abstractions, ISP-focused interfaces, DIP via ports/adapters.

## When to Use Patterns
- **Factory/Abstract Factory:** Object creation with invariants; prevents leaking concrete deps.
- **Strategy:** Swap algorithms at runtime (e.g., pricing, retries).
- **Observer/Event:** Decouple producers/consumers; domain events.
- **Adapter:** Integrate external systems behind stable ports.
- **Decorator:** Cross-cutting concerns (caching, metrics) without inheritance.
- **CQRS:** Read/write separation for complex domains or performance scaling.
- **Saga/Orchestration:** Manage distributed transactions across services.

## Layering Rules
- Dependencies point inward. Domain is unaware of frameworks and IO.
- Only interfaces (ports) cross boundaries; adapters implement them.
- Validation at edges; domain assumes valid inputs.

## ADRs
- Record decisions under `docs/adr/` with context, options, decision, consequences.
