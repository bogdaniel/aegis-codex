# Validation Criteria

## Must Pass

- [ ] @architect designed PaymentContext with bounded context and trust tier
- [ ] @architect enforced Clean Architecture layering
- [ ] @architect defined ports in Domain/Application
- [ ] @architect used ACL for IdentityContext integration (IdentityValidationPort, not direct IdentityPort)
- [ ] @architect formatted output as Context Block
- [ ] @architect explicitly stated delegation: "After design, delegate to @api-designer for API design and @security-auditor for security review"
- [ ] @api-designer received Context Block and used architecture context
- [ ] @api-designer created OpenAPI spec aligned with PaymentContext architecture
- [ ] @security-auditor received Context Block and used architecture context
- [ ] @security-auditor reviewed security with OWASP Top 10 mapping
- [ ] All Phase 0 rules enforced

## Delegation Compliance

- [ ] Delegation syntax correct: "After [TASK], delegate to @[AGENT] for [PURPOSE]"
- [ ] Context formatted as Context Block (Grounding Block + Plan + Artifacts + Next Steps)
- [ ] Delegated agents received full context
- [ ] Delegated agents enforced Phase 0 rules
- [ ] Delegation respected agent capabilities (@architect can delegate to @api-designer and @security-auditor)

## Architecture Compliance

- [ ] Bounded context identified (PaymentContext)
- [ ] Trust tier assigned (Tier M)
- [ ] Clean Architecture layering respected
- [ ] ACL used for cross-context integration (IdentityValidationPort)
- [ ] Ports defined in Domain/Application
- [ ] Adapters in Infrastructure/Interface


