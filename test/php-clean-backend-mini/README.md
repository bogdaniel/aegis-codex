# Aegis Codex PHP Backend

Minimal PHP backend demonstrating Aegis Codex architecture principles:
- Clean Architecture (Domain/Application/Infrastructure/Interface layers)
- Hexagonal Architecture (ports/adapters)
- Domain-Driven Design (bounded contexts, trust tiers)
- Framework-free Domain/Application layers

## Bounded Contexts

- **IdentityContext (Tier H)**: User authentication, identity management
- **OrdersContext (Tier M)**: Order management, order lifecycle

## Structure

```
src/
├── IdentityContext/
│   ├── Domain/          # Entities, VOs, Events, Repository interfaces
│   ├── Application/     # Use cases, Commands, Application ports
│   ├── Infrastructure/  # In-memory adapters (repos, event publisher)
│   └── Interface/       # HTTP controllers (thin)
└── OrdersContext/
    ├── Domain/          # Entities, VOs, Events, Repository interfaces
    ├── Application/     # Use cases, Commands, Application ports
    ├── Infrastructure/  # In-memory adapters (repos, event publisher, ACL)
    └── Interface/       # HTTP controllers (thin)
```

## Requirements

- PHP 8.2+
- Composer

## Installation

```bash
composer install
```

## Running Tests

```bash
# Run all tests
composer test

# Or directly
vendor/bin/phpunit
```

## Static Analysis

```bash
# PHPStan (type checking)
composer phpstan

# PHPCS (code style)
composer phpcs

# Fix code style issues
composer phpcbf
```

## Architecture Validation

```bash
# Deptrac (layer dependency enforcement)
vendor/bin/deptrac analyse
```

## CI Commands

```bash
# Full CI pipeline
composer install
composer phpcs
composer phpstan
composer test
vendor/bin/deptrac analyse
```

## Architecture Compliance

- ✅ Domain/Application layers are framework-free (no Laravel/Symfony dependencies)
- ✅ Controllers are thin (delegate to Application use cases)
- ✅ Ports/adapters pattern (interfaces in Domain/Application, implementations in Infrastructure)
- ✅ Bounded contexts with trust tiers (Identity: Tier H, Orders: Tier M)
- ✅ Cross-context communication via ACL (IdentityValidationPort)
- ✅ Domain invariants enforced (no duplicate email, Money non-negative)
- ✅ Password hashing (bcrypt, cost 12)

## Testing Coverage

- **Domain tests**: Value objects (UserEmail, HashedPassword, Money), Entities (User, Order), Events (UserRegistered, OrderPlaced)
- **Application tests**: Use cases (RegisterUser, PlaceOrder) with happy path + failure paths

## Security

- Password hashing: bcrypt (cost 12)
- Input validation: Email format, Money non-negative
- Threat models: `docs/threat-models/IdentityContext.md`, `docs/threat-models/OrdersContext.md`
