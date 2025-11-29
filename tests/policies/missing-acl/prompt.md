# Policy Scenario: Missing Anti-Corruption Layer

## Prompt

```
Act as the @code-reviewer. Review this code that violates anti-corruption layer principles by using external DTOs directly in the domain layer. Fix the architecture violation.

Code to review:
```typescript
// PaymentContext/Domain/Services/PaymentProcessor.ts
import { StripePaymentIntent } from 'stripe'; // External SDK type

export class PaymentProcessor {
  async processPayment(intent: StripePaymentIntent) {
    // Using external DTO directly in domain
    if (intent.status === 'succeeded') {
      return { success: true, amount: intent.amount };
    }
    return { success: false };
  }
}
```
```

## Context

This scenario tests that `@code-reviewer` agent:
- Identifies missing anti-corruption layer (external DTOs used directly in domain)
- Rejects code that violates domain purity
- Proposes compliant alternative using ACL pattern
- References architecture rules (36-architecture.mdc, 38-anti-corruption-events.mdc)
- Follows format requirements (single fenced code block with filename)

## Related Rules

- `.cursor/rules/36-architecture.mdc` - Architecture rules (domain purity, ports/adapters)
- `.cursor/rules/38-anti-corruption-events.mdc` - Anti-corruption layer rules
- `.cursor/rules/44-ddd.mdc` - DDD rules (domain purity)
- `.cursor/rules/20-agents.mdc` - @code-reviewer agent definition

