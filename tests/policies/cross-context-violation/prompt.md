# Policy Scenario: Cross-Bounded-Context Violation

## Prompt

```
Act as the @code-reviewer. Review this code that violates bounded context boundaries by directly importing another context's domain/infrastructure. Fix the architecture violation.

Code to review:
```typescript
// OrdersContext/Application/UseCases/PlaceOrder.ts
import { User } from '@identity/domain/Entities/User.js';
import { InMemoryUserRepository } from '@identity/infra/Adapters/InMemoryUserRepository.js';

export class PlaceOrder {
  async execute(orderData: OrderData) {
    const user = await new InMemoryUserRepository().findById(orderData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    // ... rest of order placement logic
  }
}
```
```

## Context

This scenario tests that `@code-reviewer` agent:
- Identifies cross-context violations (direct imports of another context's domain/infrastructure)
- Rejects code that violates bounded context boundaries
- Proposes compliant alternative using public API modules
- References architecture rules (36-architecture.mdc, 44-ddd.mdc)
- Follows format requirements (single fenced code block with filename)

## Related Rules

- `.cursor/rules/36-architecture.mdc` - Architecture rules (bounded contexts, public API modules)
- `.cursor/rules/44-ddd.mdc` - DDD rules (bounded context boundaries)
- `.cursor/rules/20-agents.mdc` - @code-reviewer agent definition

