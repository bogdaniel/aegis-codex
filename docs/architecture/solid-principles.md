# SOLID Principles

Use SOLID as a default lens for design and refactoring. Violations are often early signals of coupling and maintainability issues.

## Single Responsibility (SRP)
- Each module/class should have **one reason to change**.
- Split responsibilities such as persistence, validation, formatting, and orchestration into separate components.

## Open/Closed (OCP)
- Components should be **open for extension, closed for modification**.
- Prefer composition, interfaces, and configuration over editing existing code paths for every new case.

## Liskov Substitution (LSP)
- Subtypes must be usable anywhere their base type is expected without breaking behavior.
- Avoid widening preconditions or weakening postconditions in subclasses.

## Interface Segregation (ISP)
- Prefer many small, focused interfaces over large “god” interfaces.
- Clients should not depend on methods they do not use.

## Dependency Inversion (DIP)
- High-level modules should not depend on low-level modules; both depend on abstractions.
- Depend on interfaces/ports; inject dependencies rather than constructing them inline.
