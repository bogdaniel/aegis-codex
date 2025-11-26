# Scenario 2: Agent Delegation

## Prompt

```
@architect Design a payment processing context. After design, delegate to @api-designer for API design and @security-auditor for security review.
```

## Expected Behavior

1. @architect designs PaymentContext following Clean Architecture + DDD
2. @architect formats architecture design as Context Block
3. @architect explicitly states delegation: "After design, delegate to @api-designer for API design and @security-auditor for security review"
4. User copies Context Block and passes to @api-designer
5. User copies Context Block and passes to @security-auditor
6. Both delegated agents use architecture context
7. All Phase 0 rules enforced

## Context

This scenario tests agent-to-agent delegation with explicit context passing.


