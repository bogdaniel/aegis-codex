# PHP Clean Backend - Test Project

A **reference sandbox backend** demonstrating Clean Architecture, Hexagonal Architecture, and DDD patterns for Aegis Codex rules validation.

## Purpose

This project serves as:
- A **testbed** for validating Aegis Codex rules
- A **reference implementation** of Clean Architecture + Hexagonal + DDD in PHP
- A **demonstration** of multi-agent workflow capabilities
- An **example** of framework-free Domain/Application layers

## Architecture

This backend implements:

- **Clean Architecture** with four layers per bounded context:
  - Domain (framework-free business logic)
  - Application (use cases, orchestration)
  - Infrastructure (adapters, implementations)
  - Interface (CLI/HTTP adapters)

- **Hexagonal Architecture** using ports and adapters:
  - Ports (interfaces) defined in Domain/Application
  - Adapters (implementations) in Infrastructure/Interface

- **Domain-Driven Design** with:
  - Bounded contexts (IdentityContext, OrdersContext)
  - Trust tiers (H for Identity, M for Orders)
  - Anti-Corruption Layer (ACL) for cross-context communication
  - Ubiquitous language per context

## Requirements

- PHP 8.2 or higher
- Composer

## Setup

```bash
cd test/php-clean-backend
composer install
```

## Running Tests

```bash
composer test
```

## Code Quality Checks

```bash
composer phpcs      # PSR-12 style check
composer phpstan    # Static analysis (level max)
composer check      # Run all checks (phpcs + phpstan + tests)
```

## CLI Usage

```bash
# Register a user
php bin/console register-user test@example.com password123

# Authenticate a user
php bin/console authenticate test@example.com password123

# Place an order (requires valid userId from registration)
php bin/console place-order <userId> 5000 USD
```

## Project Structure

```
test/php-clean-backend/
├── src/
│   ├── Shared/                    # Shared domain utilities
│   ├── IdentityContext/           # Tier H (High Trust)
│   │   ├── Domain/                # Framework-free business logic
│   │   ├── Application/           # Use cases
│   │   ├── Infrastructure/       # Adapters
│   │   └── Interface/             # CLI adapters
│   ├── OrdersContext/             # Tier M (Medium Trust)
│   │   ├── Domain/                # Framework-free business logic
│   │   ├── Application/           # Use cases
│   │   ├── Infrastructure/       # Adapters (including ACL)
│   │   └── Interface/             # CLI adapters
│   └── bootstrap.php              # Dependency injection / wiring
├── tests/                          # Tests organized by context
├── bin/
│   └── console                     # CLI entrypoint
└── docs/                           # Documentation
    ├── ARCHITECTURE_DEMO.md        # Architecture overview
    ├── BOUNDED_CONTEXTS.md         # Context map and trust tiers
    └── CHANGE_EXAMPLES.md          # Change discipline examples
```

## Key Features

### Framework-Free Domain/Application

Domain and Application layers are completely framework-free:
- No ORM dependencies
- No HTTP framework dependencies
- No Laravel/Symfony classes
- Pure PHP with strict types

### Bounded Contexts

- **IdentityContext (Tier H):** Authentication and identity management
- **OrdersContext (Tier M):** Order management

### Cross-Context Communication

OrdersContext communicates with IdentityContext via **Anti-Corruption Layer (ACL)** pattern:
- OrdersContext defines its own `IdentityPort` interface
- Infrastructure adapter (`IdentityPortInMemoryAdapter`) bridges contexts
- No direct Domain imports across contexts

### Testing Strategy

- Tests target **Application use cases** (primary unit boundary)
- Domain tests for **invariants** (value objects, entities)
- Infrastructure tests for **adapters**
- Mock external dependencies (repositories, ports)

## Documentation

- **[ARCHITECTURE_DEMO.md](docs/ARCHITECTURE_DEMO.md)** - Detailed architecture overview
- **[BOUNDED_CONTEXTS.md](docs/BOUNDED_CONTEXTS.md)** - Context map and trust tiers
- **[CHANGE_EXAMPLES.md](docs/CHANGE_EXAMPLES.md)** - Change discipline examples

## Compliance

This project follows Aegis Codex rules:

- ✅ `.cursor/rules/36-architecture.mdc` - Clean Architecture + Hexagonal + DDD
- ✅ `.cursor/rules/44-ddd.mdc` - Domain-Driven Design
- ✅ `.cursor/rules/50-lang-php.mdc` - PHP standards (strict types, PSR-12)
- ✅ `.cursor/rules/31-testing.mdc` - Testing standards
- ✅ `.cursor/rules/30-security.mdc` - Security standards
- ✅ `.cursor/rules/23-change-control.mdc` - Change discipline

## License

Part of the Aegis Codex project.

