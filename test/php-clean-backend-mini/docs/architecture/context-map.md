# Context Map

## Bounded Contexts

### IdentityContext (Tier H - Safety Kernel)
- **Trust Tier:** H (High)
- **Purpose:** User authentication, identity management, credential handling
- **Owns:** User identities, passwords (hashed), authentication tokens
- **Communication:** Publishes `UserRegistered` domain event

### OrdersContext (Tier M - Business Core)
- **Trust Tier:** M (Medium)
- **Purpose:** Order management, order lifecycle
- **Owns:** Orders, order amounts
- **Communication:** Consumes `UserRegistered` event (via ACL), publishes `OrderPlaced` domain event

## Context Relationships

- **IdentityContext → OrdersContext:** OrdersContext validates user existence via ACL (IdentityValidationPort)
- **Communication Pattern:** Async via domain events (UserRegistered → OrderPlaced)

## Trust Tier Requirements

### Tier H (IdentityContext)
- Minimal dependencies
- Strict Clean/Hex architecture
- Higher test coverage
- Stricter observability & security baselines

### Tier M (OrdersContext)
- Clean/Hex/DDD applied pragmatically
- May integrate with more external services via ports/adapters

