# Design Principles (High-Level)

These principles guide everyday design decisions. Agents (especially `@architect`, `@code-reviewer`, and `@refactorer`) should treat them as defaults.

## SOLID
- Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion rigorously.
- Use them as a lens when adding features or refactoring; violations are signals of coupling and maintainability risks.

## Separation of Concerns
- Each module/class should have a single, well‑defined purpose.
- Keep IO, domain logic, and orchestration separate; avoid “god” objects or multi‑purpose modules.

## DRY (Don’t Repeat Yourself)
- Eliminate meaningful duplication through abstraction and reusability.
- Prefer shared helpers, components, or services over copy‑pasted logic.

## KISS (Keep It Simple, Stupid)
- Favor simple, clear solutions over clever ones.
- Remove unnecessary abstractions and layers until complexity is justified by real needs.

## YAGNI (You Aren’t Gonna Need It)
- Only implement what is currently required.
- Avoid speculative features, parameters, and configuration until a concrete use case appears.

## Clean Architecture & DDD
- Clean/Hexagonal: separate domain, application, infrastructure, and presentation; keep dependencies pointing inward.
- DDD: use bounded contexts, aggregates, entities, value objects, and repositories when domain complexity justifies them.
