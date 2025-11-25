# Clean Architecture Refactoring

## Examples

- `fat-controller/` — Moving business logic from controllers to Application use cases
- `framework-in-domain/` — Removing framework dependencies from Domain layer
- `cross-context-direct/` — Replacing direct cross-context imports with public API modules

## Principles

- Domain/Application layers are framework-free
- Controllers are thin (delegate to Application use cases)
- Cross-context communication via public API modules
- Ports defined in Domain/Application, adapters in Infrastructure

