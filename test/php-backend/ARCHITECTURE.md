# Architecture Design

## Bounded Contexts

1. **IdentityContext** (Tier M)
   - Purpose: User registration and authentication
   - Trust Tier: M (Medium - Business Core)

2. **OrdersContext** (Tier M)
   - Purpose: Order placement and management
   - Trust Tier: M (Medium - Business Core)

## Context Map

- IdentityContext → OrdersContext: OrdersContext depends on IdentityContext for user validation
- Communication: Via Application ports (IdentityContext exposes UserRepository port)

## Layer Structure (per context)

```
IdentityContext/
├── Domain/
│   ├── Entities/User.php
│   ├── ValueObjects/Email.php
│   ├── ValueObjects/HashedPassword.php
│   └── Ports/UserRepository.php
├── Application/
│   ├── UseCases/RegisterUser.php
│   └── Commands/RegisterUserCommand.php
├── Infrastructure/
│   ├── Persistence/PdoUserRepository.php
│   └── Security/PasswordHasher.php
└── Interface/
    └── Http/RegisterUserController.php

OrdersContext/
├── Domain/
│   ├── Entities/Order.php
│   └── Ports/OrderRepository.php
├── Application/
│   ├── UseCases/PlaceOrder.php
│   └── Commands/PlaceOrderCommand.php
├── Infrastructure/
│   └── Persistence/PdoOrderRepository.php
└── Interface/
    └── Http/PlaceOrderController.php
```

## Technology Stack

- PHP 8.2+
- PDO for database (plain SQL, no ORM)
- Plain PHP (no framework) for minimal implementation
- SQLite for simplicity (can be swapped to MySQL/PostgreSQL)

## Database Schema

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Security

- Password hashing: `password_hash()` with PASSWORD_BCRYPT
- Input validation: Domain value objects
- SQL injection prevention: PDO prepared statements
- No secrets in code: Environment variables

