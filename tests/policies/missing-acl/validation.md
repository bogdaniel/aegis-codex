# Validation Criteria

## Must Pass

- [ ] Agent follows format requirements (single fenced code block with language tag and filename comment)
- [ ] Output matches expected structure (Grounding Block, Plan, Implementation, Validation, Limits)
- [ ] All architecture violations identified and fixed
- [ ] Architecture rules mapping provided (domain purity, ACL, ports/adapters)
- [ ] Verification artifact provided (concrete architecture check command)

## Architecture Fixes Validation

- [ ] **Domain Purity:**
  - [ ] Domain layer MUST NOT import external SDK types (e.g., `StripePaymentIntent`)
  - [ ] Domain layer uses clean domain types (e.g., `Payment`, `PaymentStatus`)
  - [ ] External DTOs mapped to domain types in Infrastructure layer (ACL)

- [ ] **Anti-Corruption Layer:**
  - [ ] ACL adapter in Infrastructure layer translates external DTOs to domain types
  - [ ] Example: `StripePaymentAdapter` maps `StripePaymentIntent` to `Payment` domain entity
  - [ ] Domain layer receives clean domain types, not external DTOs

- [ ] **Port/Interface Pattern:**
  - [ ] Domain layer defines ports/interfaces (e.g., `PaymentGatewayPort`)
  - [ ] Infrastructure layer implements ports (e.g., `StripePaymentGateway` implements `PaymentGatewayPort`)
  - [ ] Domain layer depends on ports, not concrete implementations

- [ ] **Architecture Compliance:**
  - [ ] Respect Clean Architecture layering (Domain layer framework-free, infrastructure-free)
  - [ ] Respect DDD principles (domain purity, no external dependencies)
  - [ ] Respect anti-corruption layer pattern (external DTOs mapped in Infrastructure)

## Format Compliance

- [ ] Exactly one fenced code block
- [ ] Language tag present (`typescript`)
- [ ] Filename comment present (`// PaymentContext/Domain/Services/PaymentProcessor.ts` or equivalent)
- [ ] No unfenced code snippets
- [ ] No commented alternatives

## Rule Compliance

- [ ] References `.cursor/rules/36-architecture.mdc` (domain purity, ports/adapters)
- [ ] References `.cursor/rules/38-anti-corruption-events.mdc` (anti-corruption layer)
- [ ] References `.cursor/rules/44-ddd.mdc` (domain purity)
- [ ] References `.cursor/rules/20-agents.mdc` (@code-reviewer format)
- [ ] Architecture fixes respect Clean Architecture and DDD principles

## Verification Artifact

- [ ] Concrete architecture check command provided
- [ ] Command is runnable (e.g., `npm run lint`, `npm run type-check`)
- [ ] Command validates the architecture fixes

## Failure Criteria

If any of the following occur, the policy test **FAILS**:
- Agent produces multiple code blocks or unfenced snippets
- Missing ACL violation not fixed (external DTOs still used in domain)
- Domain purity not maintained
- No verification artifact provided
- Architecture rules mapping missing
- Format requirements not met

## Enforcement

If this policy test fails:
1. **Tighten `.cursor/rules/36-architecture.mdc`** - Add explicit domain purity requirements
2. **Tighten `.cursor/rules/38-anti-corruption-events.mdc`** - Add explicit ACL enforcement
3. **Tighten `.cursor/rules/44-ddd.mdc`** - Add explicit domain purity enforcement
4. **Tighten `.cursor/rules/20-agents.mdc`** - Add explicit ACL violation rejection for @code-reviewer
5. Re-run the scenario and verify fixes

## CI Integration

This policy can be validated in CI by:
- Running the prompt in a test environment
- Comparing output against expected-output.md
- Validating against criteria in this file
- Failing the pipeline if validation fails

See `.cursor/rules/34-ci.mdc` for CI integration details.

