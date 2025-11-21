# Architecture Patterns

- **Goal:** Provide a small set of defaults for service and application structure that agents can use without re‑designing from scratch.

## Clean / Hexagonal Architecture
- Separate core domain logic from frameworks and IO: domain → application → infrastructure → interface.
- Inbound adapters (HTTP, CLI, queues) call application services; outbound adapters implement ports for DB, cache, external APIs.
- Dependencies point inward; frameworks are plugins, not the center of the design.

Use this by default for:
- Backend services (HTTP/gRPC/queues).
- Apps with non‑trivial business rules or multiple integrations.

## Feature / Vertical Slices
- Organize code by feature or bounded context (`users/`, `billing/`, `orders/`) rather than by technical layer (`controllers/`, `models/`).
- Each slice owns its HTTP handlers, application logic, domain models, and persistence interfaces.

Use this by default for:
- Services that will grow with many features.
- Frontends and backends where teams are aligned to features.

## Bounded Contexts (DDD)
- Partition the system into contexts with their own models, invariants, and ubiquitous language.
- No direct cross‑context imports without explicit contracts (APIs, events, or anti‑corruption layers).
- Keep context boundaries stable; add integration contracts instead of merging contexts.

Use this when:
- Different domains use the same words with different meanings (e.g., “Account” in billing vs auth).
- Teams/ownership are split by domain.

## CQRS & Event‑Driven (Selective)
- Command Query Responsibility Segregation (CQRS): separate write models (commands) from read models (queries) when read performance or projections require it.
- Event‑driven integration: publish domain events for significant state changes; consume them in other contexts for side effects and projections.

Use sparingly when:
- Read/write requirements diverge significantly (analytics feeds, timelines).
- Integration between services benefits from decoupling and async behavior.

## When Not to Add Complexity
- For simple CRUD apps or one‑off tools, prefer a minimal layered or feature‑based structure without CQRS or heavy DDD.
- Avoid introducing event sourcing, sagas, or microservices before you have scale, complexity, or team boundaries that require them.
