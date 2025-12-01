# Bounded Contexts

This document describes the bounded contexts in this test backend, their trust tiers, and their relationships.

## Context Map

```
┌─────────────────────────────────────────────────────────────┐
│                    IdentityContext (Tier H)                 │
│                                                             │
│  Purpose: Authentication and identity management            │
│  Trust Tier: H (High / Safety Kernel)                      │
│                                                             │
│  Domain:                                                    │
│    - User entity                                            │
│    - UserId, UserEmail value objects                        │
│    - UserRepository, PasswordHasher ports                   │
│    - UserRegistered domain event                            │
│                                                             │
│  Application:                                               │
│    - RegisterUser use case                                  │
│    - AuthenticateUser use case                              │
│                                                             │
│  Infrastructure:                                             │
│    - InMemoryUserRepository                                 │
│    - NativePasswordHasher                                   │
│                                                             │
│  Interface:                                                 │
│    - RegisterUserCommandCli                                 │
│    - AuthenticateUserCommandCli                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (ACL: IdentityPort)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    OrdersContext (Tier M)                    │
│                                                             │
│  Purpose: Order management                                  │
│  Trust Tier: M (Medium / Business Core)                     │
│                                                             │
│  Domain:                                                    │
│    - Order entity                                           │
│    - OrderId, Money, OrderStatus value objects              │
│    - OrderRepository port                                   │
│    - IdentityPort (ACL interface)                          │
│                                                             │
│  Application:                                               │
│    - PlaceOrder use case                                    │
│                                                             │
│  Infrastructure:                                            │
│    - InMemoryOrderRepository                                │
│    - IdentityPortInMemoryAdapter (ACL)                     │
│                                                             │
│  Interface:                                                 │
│    - PlaceOrderCommandCli                                   │
└─────────────────────────────────────────────────────────────┘
```

## IdentityContext (Tier H)

### Trust Tier: H (High / Safety Kernel)

**Rationale:** Authentication and identity are security-critical. This context handles:
- User credentials (passwords)
- Authentication tokens (future)
- User identity validation

**Trust Tier Requirements:**
- ✅ Minimal dependencies
- ✅ Strong isolation
- ✅ Strict security controls
- ✅ Higher test coverage
- ✅ Framework-free Domain/Application layers

### Ubiquitous Language

- **User:** A registered identity in the system
- **Register:** Create a new user account
- **Authenticate:** Verify user credentials
- **Password Hash:** Securely stored password representation

### Domain Model

**Aggregate:** `User`
- **Root:** `User` entity
- **Invariants:**
  - User must have a valid email
  - User must have a hashed password
  - User ID must be unique

**Value Objects:**
- `UserId`: Unique identifier for a user
- `UserEmail`: Validated email address

**Domain Events:**
- `UserRegistered`: Published when a user is successfully registered

### Ports (Interfaces)

- `UserRepository`: Persistence interface
- `PasswordHasher`: Password hashing interface

### Use Cases

1. **RegisterUser**
   - Input: Email, password
   - Output: UserId
   - Side effects: User saved, UserRegistered event published
   - Validation: Email must be unique

2. **AuthenticateUser**
   - Input: Email, password
   - Output: UserId
   - Validation: Credentials must be valid

### Public API

**Application Layer:**
- `RegisterUserHandler` - Can be used by other contexts via ACL
- `AuthenticateUserHandler` - Can be used by other contexts via ACL

**Domain Ports:**
- `UserRepository` - Used by Infrastructure adapters and ACL adapters

## OrdersContext (Tier M)

### Trust Tier: M (Medium / Business Core)

**Rationale:** Order management is core business functionality but not security-critical. This context handles:
- Order creation
- Order status management
- Order validation

**Trust Tier Requirements:**
- ✅ Clean/Hex/DDD applied pragmatically
- ✅ May integrate with more external services
- ✅ Still uses ports/adapters pattern

### Ubiquitous Language

- **Order:** A purchase order placed by a user
- **Place Order:** Create a new order
- **Order Status:** Current state of an order (pending, confirmed, cancelled, completed)
- **Money:** Monetary value with currency

### Domain Model

**Aggregate:** `Order`
- **Root:** `Order` entity
- **Invariants:**
  - Order must have a valid user (validated via IdentityPort)
  - Order total must be non-negative
  - Order status transitions must be valid (pending → confirmed → completed, or pending → cancelled)

**Value Objects:**
- `OrderId`: Unique identifier for an order
- `Money`: Monetary value with currency (amount in cents)
- `OrderStatus`: Enum (pending, confirmed, cancelled, completed)

### Ports (Interfaces)

- `OrderRepository`: Persistence interface
- `IdentityPort`: ACL interface for IdentityContext (validates user existence)

### Use Cases

1. **PlaceOrder**
   - Input: UserId, amount in cents, currency
   - Output: OrderId
   - Validation: User must exist (via IdentityPort)
   - Side effects: Order saved with PENDING status

### Cross-Context Integration

**ACL Pattern:**

OrdersContext defines its own `IdentityPort` interface:

```php
// OrdersContext/Domain/Port/IdentityPort.php
interface IdentityPort
{
    public function userExists(UserId $userId): bool;
}
```

Infrastructure adapter bridges to IdentityContext:

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

**Why ACL?**
- OrdersContext doesn't depend on IdentityContext's Domain directly
- OrdersContext defines its own interface with distinct semantics
- Changes to IdentityContext don't break OrdersContext (as long as adapter is updated)
- Prevents duplicate port names (OrdersContext's `IdentityPort` vs IdentityContext's canonical port)

## Context Relationships

### IdentityContext → OrdersContext

**Relationship Type:** Upstream/Downstream (IdentityContext is upstream)

**Communication Pattern:**
- OrdersContext depends on IdentityContext via ACL
- OrdersContext defines `IdentityPort` (ACL interface)
- Infrastructure adapter (`IdentityPortInMemoryAdapter`) implements ACL
- Adapter uses IdentityContext's `UserRepository` port

**Contract:**
- IdentityContext provides user existence validation
- OrdersContext consumes via `IdentityPort::userExists()`

**Trust Boundary:**
- IdentityContext (Tier H) is more trusted than OrdersContext (Tier M)
- OrdersContext must not bypass IdentityContext's security controls
- OrdersContext must use ACL pattern, not direct Domain imports

## Shared Domain

**Location:** `src/Shared/`

**Purpose:** Common utilities used across contexts.

**Contains:**
- `Uuid`: UUID value object
- `DomainEvent`: Base class for domain events
- `EventPublisher`: Port for publishing domain events

**Rules:**
- ✅ Shared utilities are framework-free
- ✅ Shared utilities are context-agnostic
- ❌ Shared utilities must NOT contain business logic specific to one context

## Trust Tier Summary

| Context | Tier | Rationale | Requirements |
|---------|------|-----------|-------------|
| IdentityContext | H | Security-critical (auth, credentials) | Minimal deps, strict isolation, high test coverage |
| OrdersContext | M | Business core (order management) | Clean/Hex/DDD, ports/adapters, pragmatic integration |

## Future Extensions

Potential additional contexts:

1. **PaymentContext (Tier H)**
   - Payment processing
   - Payment validation
   - Payment security

2. **NotificationContext (Tier S)**
   - Email notifications
   - SMS notifications
   - Low-impact, surface layer

3. **InventoryContext (Tier M)**
   - Product inventory
   - Stock management
   - Business core functionality

## Documentation Requirements

Per `.cursor/rules/36-architecture.mdc` and `.cursor/rules/44-ddd.mdc`:

- ✅ Context map documented (this document)
- ✅ Trust tiers assigned (H for IdentityContext, M for OrdersContext)
- ✅ Ubiquitous language defined per context
- ✅ Aggregate boundaries documented
- ✅ Cross-context relationships documented (ACL pattern)

