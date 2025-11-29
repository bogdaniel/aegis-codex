# Validation Criteria

## Must Pass

- [ ] Agent follows format requirements (single fenced code block with language tag and filename comment)
- [ ] Output matches expected structure (Grounding Block, Plan, Implementation, Validation, Limits)
- [ ] All architecture violations identified and fixed
- [ ] Architecture rules mapping provided (bounded contexts, Clean Architecture, DDD)
- [ ] Verification artifact provided (concrete architecture check command)

## Architecture Fixes Validation

- [ ] **Public API Module Usage:**
  - [ ] Cross-context imports use public API modules (e.g., `@identity/app`)
  - [ ] No direct imports from `@identity/domain/*` or `@identity/infra/*`
  - [ ] Example: `import { GetUser } from '@identity/app'` instead of direct domain/infrastructure imports

- [ ] **Port/Interface Usage:**
  - [ ] Use ports/interfaces for cross-context dependencies (e.g., `IdentityPort`)
  - [ ] Inject dependencies via constructor (dependency injection)
  - [ ] No direct instantiation of concrete implementations

- [ ] **No Direct Domain/Infrastructure Imports:**
  - [ ] Must NOT import from `@identity/domain/*` or `@identity/infra/*` directly
  - [ ] Must NOT import concrete implementations (e.g., `InMemoryUserRepository`)
  - [ ] Must use public API modules or ports/interfaces only

- [ ] **Architecture Compliance:**
  - [ ] Respect Clean Architecture layering (Application layer uses ports, not concrete implementations)
  - [ ] Respect bounded context boundaries (cross-context via public API modules)
  - [ ] Respect DDD principles (no shared domain entities across contexts)

## Format Compliance

- [ ] Exactly one fenced code block
- [ ] Language tag present (`typescript`)
- [ ] Filename comment present (`// OrdersContext/Application/UseCases/PlaceOrder.ts` or equivalent)
- [ ] No unfenced code snippets
- [ ] No commented alternatives

## Rule Compliance

- [ ] References `.cursor/rules/36-architecture.mdc` (bounded contexts, public API modules)
- [ ] References `.cursor/rules/44-ddd.mdc` (bounded context boundaries)
- [ ] References `.cursor/rules/20-agents.mdc` (@code-reviewer format)
- [ ] Architecture fixes respect Clean Architecture and DDD principles

## Verification Artifact

- [ ] Concrete architecture check command provided
- [ ] Command is runnable (e.g., `npm run lint`, `npm run type-check`)
- [ ] Command validates the architecture fixes

## Failure Criteria

If any of the following occur, the policy test **FAILS**:
- Agent produces multiple code blocks or unfenced snippets
- Cross-context violation not fixed (direct domain/infrastructure imports still present)
- Public API modules not used
- No verification artifact provided
- Architecture rules mapping missing
- Format requirements not met

## Enforcement

If this policy test fails:
1. **Tighten `.cursor/rules/36-architecture.mdc`** - Add explicit cross-context import restrictions
2. **Tighten `.cursor/rules/44-ddd.mdc`** - Add explicit bounded context boundary enforcement
3. **Tighten `.cursor/rules/20-agents.mdc`** - Add explicit architecture violation rejection for @code-reviewer
4. Re-run the scenario and verify fixes

## CI Integration

This policy can be validated in CI by:
- Running the prompt in a test environment
- Comparing output against expected-output.md
- Validating against criteria in this file
- Failing the pipeline if validation fails

See `.cursor/rules/34-ci.mdc` for CI integration details.

