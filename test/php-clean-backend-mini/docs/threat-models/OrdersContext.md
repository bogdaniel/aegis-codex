# Threat Model: OrdersContext

## Context
- **Bounded Context:** OrdersContext
- **Trust Tier:** M (Medium - Business Core)
- **Purpose:** Order management, order lifecycle

## Assets
- Orders (order IDs, user IDs, amounts)
- Financial data (order amounts)
- User relationships (via IdentityContext)

## Entry Points
- HTTP API: `/place-order` endpoint (PlaceOrderController)
- Application use case: PlaceOrder
- Domain events: OrderPlaced
- Cross-context: IdentityValidationPort (ACL to IdentityContext)

## Trust Boundaries
- Network boundary: HTTP requests from external clients
- Cross-context boundary: IdentityContext validation (via ACL)
- Data boundary: Money validation (non-negative)

## Threats (STRIDE)

### Spoofing
- **Threat:** Fake orders with invalid user IDs
- **Risk:** Medium
- **Mitigation:** User existence validation via IdentityValidationPort (ACL)
- **Owner:** Development team

### Tampering
- **Threat:** Order amount manipulation, negative amounts
- **Risk:** Medium
- **Mitigation:**
  - Money value object enforces non-negative invariant
  - Input validation (amount type, range)
  - Parameterized queries (when using DB)
- **Owner:** Development team

### Repudiation
- **Threat:** User denies placing order
- **Risk:** Medium
- **Mitigation:** Audit logs with correlation IDs, timestamped OrderPlaced events
- **Owner:** Operations team

### Information Disclosure
- **Threat:** Order data exposure, user ID enumeration
- **Risk:** Medium
- **Mitigation:**
  - Authorization checks (future)
  - Generic error messages
  - No sensitive data in logs
- **Owner:** Security team

### Denial of Service
- **Threat:** Order spam, resource exhaustion
- **Risk:** Medium
- **Mitigation:** Rate limiting, input size limits, connection pooling
- **Owner:** Operations team

### Elevation of Privilege
- **Threat:** Unauthorized order placement for other users
- **Risk:** Medium
- **Mitigation:**
  - User existence validation
  - Authorization checks (future)
  - IDOR prevention
- **Owner:** Security team

## OWASP Top 10 Mapping
- **A01:2021 – Broken Access Control:** Mitigated via user existence validation, future authorization
- **A03:2021 – Injection:** Mitigated via input validation, parameterized queries
- **A04:2021 – Insecure Design:** Mitigated via Clean Architecture, ACL pattern

## Security Controls
- Input validation: Amount type, range, user ID format
- Cross-context validation: IdentityValidationPort (ACL)
- Domain invariants: Money non-negative (enforced in Money VO)
- Error handling: Generic error messages

## Monitoring & Alerting
- Failed order attempts
- Unusual order patterns
- Cross-context validation failures

