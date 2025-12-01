# Architecture Demo

This document demonstrates the Clean Architecture, Hexagonal Architecture, and DDD patterns implemented in this test backend.

## Overview

This is a **reference sandbox backend** designed to validate Aegis Codex rules and serve as a testbed for multi-agent workflows. It demonstrates:

- **Clean Architecture** with four distinct layers per bounded context
- **Hexagonal Architecture** using ports and adapters
- **Domain-Driven Design** with bounded contexts and trust tiers
- **PHP 8.2+** with strict types and PSR-12 compliance
- **Framework-free Domain/Application layers**

## Structure

```
test/php-clean-backend/
├── src/
│   ├── Shared/                    # Shared domain utilities
│   │   ├── Domain/
│   │   │   ├── ValueObject/       # Uuid
│   │   │   └── Event/             # DomainEvent base class
│   │   ├── Application/
│   │   │   └── Port/              # EventPublisher interface
│   │   └── Infrastructure/
│   │       └── Event/              # InMemoryEventPublisher implementation
│   │
│   ├── IdentityContext/           # Tier H (High Trust)
│   │   ├── Domain/                # Framework-free business logic
│   │   │   ├── Entity/            # User
│   │   │   ├── ValueObject/       # UserId, UserEmail
│   │   │   ├── Port/              # UserRepository, PasswordHasher interfaces
│   │   │   └── Event/            # UserRegistered domain event
│   │   ├── Application/           # Use cases (orchestration)
│   │   │   └── UseCase/
│   │   │       ├── RegisterUser/
│   │   │       └── AuthenticateUser/
│   │   ├── Infrastructure/        # Adapters (implementations)
│   │   │   ├── Persistence/       # InMemoryUserRepository
│   │   │   └── Security/          # NativePasswordHasher
│   │   └── Interface/             # Inbound adapters
│   │       └── Cli/               # CLI commands
│   │
│   ├── OrdersContext/             # Tier M (Medium Trust)
│   │   ├── Domain/                # Framework-free business logic
│   │   │   ├── Entity/            # Order
│   │   │   ├── ValueObject/       # OrderId, Money, OrderStatus
│   │   │   └── Port/              # OrderRepository, IdentityPort (ACL)
│   │   ├── Application/           # Use cases
│   │   │   └── UseCase/
│   │   │       └── PlaceOrder/
│   │   ├── Infrastructure/        # Adapters
│   │   │   ├── Persistence/       # InMemoryOrderRepository
│   │   │   └── Integration/      # IdentityPortInMemoryAdapter (ACL)
│   │   └── Interface/             # Inbound adapters
│   │       └── Cli/               # CLI commands
│   │
│   └── bootstrap.php              # Dependency injection / wiring
│
├── tests/                         # Tests organized by context
├── bin/
│   └── console                    # CLI entrypoint
└── docs/                          # Documentation
```

## Layer Responsibilities

### Domain Layer

**Purpose:** Pure business logic, framework-free, infrastructure-free.

**Contains:**
- Entities (e.g., `User`, `Order`)
- Value Objects (e.g., `UserId`, `UserEmail`, `Money`)
- Domain Events (e.g., `UserRegistered`)
- Repository interfaces (ports)

**Rules:**
- ✅ MUST be framework-free (no ORM, HTTP, or framework types)
- ✅ MUST NOT depend on Application, Infrastructure, or Interface layers
- ✅ MUST contain business invariants and rules
- ❌ MUST NOT import from `Infrastructure/` or `Interface/` directories

**Example:**
```php
// ✅ GOOD: Domain entity is framework-free
final class User
{
    private function __construct(
        private readonly UserId $id,
        private readonly UserEmail $email,
        private readonly string $passwordHash
    ) {}
}

// ❌ BAD: Domain entity with framework dependency
use Illuminate\Database\Eloquent\Model;
class User extends Model {} // REJECTED
```

### Application Layer

**Purpose:** Orchestrate use cases, coordinate domain objects.

**Contains:**
- Use case handlers (e.g., `RegisterUserHandler`)
- Commands/Queries (e.g., `RegisterUserCommand`)
- Application ports (interfaces for cross-context communication)

**Rules:**
- ✅ MUST depend on Domain layer (same context)
- ✅ MUST orchestrate domain objects and ports
- ✅ MUST NOT depend on Infrastructure or Interface layers
- ✅ MUST NOT contain framework dependencies

**Example:**
```php
// ✅ GOOD: Use case depends on ports, not concrete implementations
final class RegisterUserHandler
{
    public function __construct(
        private readonly UserRepository $userRepository,  // Port (interface)
        private readonly PasswordHasher $passwordHasher,   // Port (interface)
        private readonly EventPublisher $eventPublisher   // Port (interface)
    ) {}
}

// ❌ BAD: Use case depends on concrete infrastructure
final class RegisterUserHandler
{
    public function __construct(
        private readonly InMemoryUserRepository $userRepository // REJECTED
    ) {}
}
```

### Infrastructure Layer

**Purpose:** Implement ports, handle technical concerns.

**Contains:**
- Repository implementations (e.g., `InMemoryUserRepository`)
- External service adapters (e.g., `NativePasswordHasher`)
- Cross-context ACL adapters (e.g., `IdentityPortInMemoryAdapter`)

**Rules:**
- ✅ MUST implement ports defined in Domain/Application
- ✅ MAY depend on Domain and Application layers
- ✅ MAY contain ORM mappings, SDK usage, technical glue
- ❌ MUST NOT contain business logic (move to Domain/Application)

**Example:**
```php
// ✅ GOOD: Infrastructure implements Domain port
final class InMemoryUserRepository implements UserRepository
{
    public function save(User $user): void { /* ... */ }
    public function findById(UserId $id): ?User { /* ... */ }
}

// ❌ BAD: Infrastructure contains business logic
final class InMemoryUserRepository implements UserRepository
{
    public function save(User $user): void
    {
        if ($user->email()->toString() === 'admin@example.com') {
            // Business logic in infrastructure - REJECTED
        }
    }
}
```

### Interface Layer

**Purpose:** Translate external protocols to Application use cases.

**Contains:**
- CLI commands (e.g., `RegisterUserCommandCli`)
- HTTP controllers (not implemented in this demo)
- Message consumers (not implemented in this demo)

**Rules:**
- ✅ MUST be thin (delegate to Application use cases)
- ✅ MUST translate external protocols (CLI/HTTP) to Application commands
- ❌ MUST NOT contain business logic
- ❌ MUST NOT access repositories directly

**Example:**
```php
// ✅ GOOD: Thin CLI adapter delegates to use case
final class RegisterUserCommandCli
{
    public function __construct(
        private readonly RegisterUserHandler $handler
    ) {}

    public function execute(string $email, string $password): void
    {
        $command = new RegisterUserCommand($email, $password);
        $userId = $this->handler->handle($command);
        echo "User registered with ID: {$userId->toString()}\n";
    }
}

// ❌ BAD: Business logic in CLI adapter
final class RegisterUserCommandCli
{
    public function execute(string $email, string $password): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Validation logic in interface - REJECTED
        }
        // ... business logic ...
    }
}
```

## Bounded Contexts

### IdentityContext (Tier H - High Trust)

**Trust Tier:** H (High / Safety Kernel)

**Purpose:** Authentication and identity management.

**Responsibilities:**
- User registration
- User authentication
- Password hashing
- User identity validation

**Trust Tier Rules:**
- Minimal dependencies
- Strong isolation
- Strict security controls
- Higher test coverage requirements

**Public API:**
- `RegisterUserHandler` (via Application layer)
- `AuthenticateUserHandler` (via Application layer)
- `UserRepository` port (for cross-context access via ACL)

### OrdersContext (Tier M - Medium Trust)

**Trust Tier:** M (Medium / Business Core)

**Purpose:** Order management.

**Responsibilities:**
- Order creation
- Order status management
- Order validation

**Cross-Context Integration:**
- Uses `IdentityPort` (ACL) to validate user existence
- Does NOT directly import IdentityContext's Domain entities
- Uses Infrastructure adapter (`IdentityPortInMemoryAdapter`) to bridge contexts

**Public API:**
- `PlaceOrderHandler` (via Application layer)
- `OrderRepository` port

## Cross-Context Communication (ACL Pattern)

**Problem:** OrdersContext needs to validate that a user exists before creating an order.

**Solution:** Anti-Corruption Layer (ACL) pattern.

1. **OrdersContext defines its own port:**
   ```php
   // OrdersContext/Domain/Port/IdentityPort.php
   interface IdentityPort
   {
       public function userExists(UserId $userId): bool;
   }
   ```

2. **Infrastructure adapter bridges contexts:**
   ```php
   // OrdersContext/Infrastructure/Integration/IdentityPortInMemoryAdapter.php
   final class IdentityPortInMemoryAdapter implements IdentityPort
   {
       public function __construct(
           private readonly UserRepository $identityUserRepository
       ) {}

       public function userExists(UserId $userId): bool
       {
           return $this->identityUserRepository->findById($userId) !== null;
       }
   }
   ```

3. **Application use case depends on port, not concrete adapter:**
   ```php
   // OrdersContext/Application/UseCase/PlaceOrder/PlaceOrderHandler.php
   final class PlaceOrderHandler
   {
       public function __construct(
           private readonly OrderRepository $orderRepository,
           private readonly IdentityPort $identityPort  // Port, not adapter
       ) {}
   }
   ```

**Benefits:**
- OrdersContext doesn't depend on IdentityContext's Domain directly
- OrdersContext defines its own interface (ACL) with distinct semantics
- Infrastructure adapter translates between contexts
- Changes to IdentityContext don't break OrdersContext (as long as adapter is updated)

## Testing Strategy

Tests are organized by bounded context and layer:

```
tests/
├── IdentityContext/
│   └── Application/
│       └── UseCase/
│           ├── RegisterUserHandlerTest.php
│           └── AuthenticateUserHandlerTest.php
└── OrdersContext/
    └── Application/
        └── UseCase/
            └── PlaceOrderHandlerTest.php
```

**Test Principles:**
- Unit tests for Application use cases (primary unit boundary)
- Domain tests for invariants (value objects, entities)
- Integration tests for Infrastructure adapters
- Mock external dependencies (repositories, ports)

**Example:**
```php
final class RegisterUserHandlerTest extends TestCase
{
    public function testRegisterUserSuccessfully(): void
    {
        $handler = new RegisterUserHandler(
            new InMemoryUserRepository(),      // Test double
            new NativePasswordHasher(),       // Real implementation
            new InMemoryEventPublisher()      // Test double
        );

        $command = new RegisterUserCommand('test@example.com', 'password123');
        $userId = $handler->handle($command);

        $this->assertNotNull($userId);
    }
}
```

## Running the Demo

### Setup

```bash
cd test/php-clean-backend
composer install
```

### Run Tests

```bash
composer test
```

### Run CLI Commands

```bash
# Register a user
php bin/console register-user test@example.com password123

# Authenticate a user
php bin/console authenticate test@example.com password123

# Place an order (requires valid userId from registration)
php bin/console place-order <userId> 5000 USD
```

### Code Quality Checks

```bash
composer phpcs      # PSR-12 style check
composer phpstan    # Static analysis
composer check      # Run all checks
```

## Key Takeaways

1. **Domain/Application layers are framework-free** - No ORM, HTTP, or framework dependencies
2. **Ports define contracts, adapters implement them** - Hexagonal Architecture pattern
3. **Bounded contexts are isolated** - Cross-context communication via ACL pattern
4. **Trust tiers guide design decisions** - Tier H contexts have stricter requirements
5. **Tests target Application use cases** - Primary unit boundary, not controllers
6. **CLI adapters are thin** - They translate CLI → Application commands only

This architecture ensures:
- **Testability:** Domain/Application logic is easy to test (no framework dependencies)
- **Flexibility:** Infrastructure can be swapped (in-memory → database → external API)
- **Isolation:** Bounded contexts don't leak into each other
- **Maintainability:** Clear separation of concerns and responsibilities

