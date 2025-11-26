# Validation Criteria

## Must Pass

- [ ] Orchestrator invoked all required agents (@architect, @api-designer, @security-auditor, @test-engineer, @devops, @code-reviewer, @supervisor)
- [ ] Context formatted as Context Blocks for easy handoff
- [ ] @architect identified bounded context (PaymentContext) and trust tier (Tier M)
- [ ] @architect enforced layering (Domain not importing Infra/Interface)
- [ ] @architect defined ports in Domain/Application, adapters in Infrastructure/Interface
- [ ] @api-designer created OpenAPI spec with all required elements (schemas, validation, error model, auth, pagination)
- [ ] @security-auditor found and fixed security issues (OWASP Top 10 mapping)
- [ ] @test-engineer added tests with ≥80% coverage for critical paths
- [ ] @devops created CI/CD config with architecture checks (ESLint, dependency validation)
- [ ] @supervisor validated all outputs meet quality gates
- [ ] @code-reviewer confirmed compliance with all Phase 0 rules
- [ ] All Phase 0 rules enforced (36-architecture.mdc, 44-ddd.mdc, 50-lang-*.mdc, 30-security.mdc, 31-testing.mdc, 34-ci.mdc)

## Architecture Compliance

- [ ] Bounded context identified and documented
- [ ] Trust tier assigned (H/M/S)
- [ ] Clean Architecture layering respected
- [ ] Hexagonal ports/adapters pattern used
- [ ] DDD patterns applied (aggregates, value objects, domain events)
- [ ] No business logic in controllers
- [ ] Domain/Application framework-free
- [ ] Path aliases used (if TypeScript)

## Security Compliance

- [ ] OWASP Top 10 risks addressed
- [ ] Input validation implemented
- [ ] Authorization checks at boundaries
- [ ] Secrets not hardcoded
- [ ] Secure error handling

## Testing Compliance

- [ ] Tests deterministic and hermetic
- [ ] Coverage ≥80% for critical paths
- [ ] Happy path, edge cases, failure modes covered
- [ ] Test commands provided

## CI/CD Compliance

- [ ] Architecture checks in pipeline
- [ ] Security scans configured
- [ ] Test coverage gates
- [ ] Rollback strategy defined


