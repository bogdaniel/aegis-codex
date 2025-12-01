# Testing Strategy

This document explains the testing approach and how it complies with Aegis Codex testing rules.

## Test Organization

Tests are organized by bounded context and layer, following `.cursor/rules/31-testing.mdc`:

```
tests/
├── IdentityContext/
│   ├── Domain/                    # Domain tests for invariants
│   │   ├── ValueObject/          # Value object validation tests
│   │   ├── Entity/               # Entity invariant tests
│   │   └── Event/                # Domain event tests
│   └── Application/
│       └── UseCase/              # Application use case tests (primary unit boundary)
│
└── OrdersContext/
    ├── Domain/                    # Domain tests for invariants
    │   ├── ValueObject/          # Value object validation tests
    │   └── Entity/               # Entity invariant tests
    └── Application/
        └── UseCase/              # Application use case tests
```

## Test Types

### Domain Tests

**Purpose:** Test invariants, value object validation, aggregate boundaries.

**Examples:**
- `UserEmailTest` - Validates email format, equality
- `MoneyTest` - Validates amount constraints, currency format
- `OrderTest` - Tests order status transitions and invariants
- `UserRegisteredTest` - Tests domain event structure

**Coverage:**
- ✅ Value object validation (invalid inputs throw exceptions)
- ✅ Value object equality
- ✅ Entity invariants (status transitions, business rules)
- ✅ Domain event structure

### Application Tests

**Purpose:** Test use cases (primary unit boundary per `.cursor/rules/31-testing.mdc`).

**Examples:**
- `RegisterUserHandlerTest` - Tests user registration use case
- `AuthenticateUserHandlerTest` - Tests authentication use case
- `PlaceOrderHandlerTest` - Tests order placement use case

**Coverage:**
- ✅ Happy path (successful operations)
- ✅ Failure paths (invalid inputs, business rule violations)
- ✅ Edge cases (duplicate emails, non-existent users)

**Test Doubles:**
- Uses `InMemoryUserRepository` as test double (acceptable per rules: "Can import Infrastructure adapters directly for test doubles")
- Uses `NativePasswordHasher` (real implementation, acceptable for integration-style tests)
- Uses `InMemoryEventPublisher` to verify events are published

## Compliance with Testing Rules

### ✅ Architecture Compliance

- **Tests target Application use cases as primary unit boundary** (not controllers, not repositories)
- **Domain tests for invariants** (value objects, entities, domain events)
- **Tests organized by bounded context** (`tests/IdentityContext/`, `tests/OrdersContext/`)
- **Test structure reflects architecture layers** (Domain tests, Application tests)

### ✅ Test Quality

- **Deterministic:** No external dependencies, no randomness (except UUID generation which is deterministic per test)
- **Isolated:** Each test has its own `setUp()` with fresh fixtures
- **Arrange-Act-Assert pattern:** Clear test structure
- **Descriptive names:** Test names describe intent (`testRegisterUserWithDuplicateEmailThrowsException`)

### ✅ Coverage

- **Domain logic:** Value objects, entities, domain events tested
- **Application use cases:** All use cases have tests
- **Happy paths:** All use cases have success path tests
- **Failure paths:** Invalid inputs, business rule violations tested
- **Edge cases:** Duplicate emails, non-existent users, invalid credentials

### ✅ Test Doubles

- **Infrastructure adapters used as test doubles:** `InMemoryUserRepository`, `InMemoryOrderRepository`
- **Ports implemented by test doubles:** Test doubles implement repository ports (interfaces)
- **Real implementations where appropriate:** `NativePasswordHasher` used (acceptable for integration-style tests)

## Running Tests

```bash
# Run all tests
composer test

# Run specific test suite
./vendor/bin/phpunit tests/IdentityContext/
./vendor/bin/phpunit tests/OrdersContext/

# Run with coverage (if configured)
./vendor/bin/phpunit --coverage-text
```

## Test Examples

### Domain Test Example

```php
final class UserEmailTest extends TestCase
{
    public function testCreateInvalidEmailThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        UserEmail::fromString('invalid-email');
    }
}
```

**Why:** Tests value object validation (invariant).

### Application Test Example

```php
final class RegisterUserHandlerTest extends TestCase
{
    public function testRegisterUserWithDuplicateEmailThrowsException(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');
        $this->handler->handle($command);

        $this->expectException(DomainException::class);
        $this->handler->handle($command);
    }
}
```

**Why:** Tests use case business rule (email uniqueness).

## Missing Tests (Future Work)

For a production system, consider adding:

1. **Infrastructure Tests:**
   - Test repository implementations with real database (integration tests)
   - Test password hasher with various algorithms
   - Test event publisher with real message queue

2. **Interface Tests:**
   - Test CLI adapters (thin adapters, but still worth testing)
   - Test HTTP controllers (if added)

3. **Integration Tests:**
   - End-to-end tests for complete workflows
   - Cross-context integration tests (OrdersContext + IdentityContext)

4. **Property-Based Tests:**
   - For value objects (generate random valid/invalid inputs)
   - For domain invariants (test all possible state transitions)

## Compliance Checklist

- [x] Tests target Application use cases (primary unit boundary)
- [x] Domain tests for invariants (value objects, entities, events)
- [x] Tests organized by bounded context
- [x] Tests are deterministic and isolated
- [x] Tests follow Arrange-Act-Assert pattern
- [x] Tests cover happy paths, failure paths, and edge cases
- [x] Test doubles implement ports (interfaces)
- [x] Infrastructure adapters used as test doubles where appropriate

## References

- `.cursor/rules/31-testing.mdc` - Testing standards
- `.cursor/rules/36-architecture.mdc` - Architecture rules (test structure)
- `.cursor/rules/44-ddd.mdc` - DDD rules (domain tests)

