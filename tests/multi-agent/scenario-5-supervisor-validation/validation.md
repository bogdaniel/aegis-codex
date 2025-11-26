# Validation Criteria

## Must Pass

- [ ] Supervisor validated all agent outputs
- [ ] All quality gates checked:
  - Architecture compliance (36-architecture.mdc)
  - Security standards (30-security.mdc)
  - Test coverage (31-testing.mdc)
  - Performance targets (33-performance.mdc)
  - Code quality (20-agents.mdc)
  - Language compliance (50-lang-*.mdc)
- [ ] Validation report provided with pass/fail status
- [ ] Issues found with recommendations
- [ ] Supervisor can delegate to fix agents if quality gates fail
- [ ] All Phase 0 rules validated

## Quality Gate Validation

- [ ] **Architecture Compliance:**
  - Bounded contexts identified and trust tiers assigned
  - Layering respected (Domain not importing Infra/Interface)
  - Path aliases used (if TypeScript)
  - ACL used for cross-context integration
  - No business logic in controllers
  - Domain/Application framework-free

- [ ] **Security Standards:**
  - OWASP Top 10 risks addressed
  - Input validation implemented
  - Authorization checks at boundaries
  - Secrets not hardcoded
  - Secure error handling

- [ ] **Test Coverage:**
  - Coverage ≥80% for critical paths
  - Tests deterministic and hermetic
  - Happy/edge/failure cases covered

- [ ] **Performance Targets:**
  - Latency targets met
  - Throughput targets met
  - Complexity analysis provided

- [ ] **Code Quality:**
  - SOLID principles followed
  - Readability good
  - Naming clear

- [ ] **Language Compliance:**
  - Path aliases used (if TypeScript)
  - Framework-free Domain/Application
  - Thin controllers

## Supervisor Capabilities

- [ ] Can validate multi-agent workflow outputs
- [ ] Can report pass/fail status
- [ ] Can identify issues with recommendations
- [ ] Can delegate to fix agents if quality gates fail
- [ ] Can aggregate validation results


