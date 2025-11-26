# Expected Output

## Supervisor Output

1. **Validation Report:**
   - Pass/fail status for each quality gate
   - Issues found with recommendations
   - Overall workflow status

2. **Quality Gate Validation:**
   - **Architecture Compliance (36-architecture.mdc):**
     - Bounded contexts identified: ✅ PaymentContext (Tier M)
     - Trust tiers assigned: ✅ Tier M assigned
     - Layering respected: ✅ Domain not importing Infra/Interface
     - Path aliases used: ✅ @payment/* aliases used (if TypeScript)
     - ACL used: ✅ IdentityValidationPort for cross-context integration
   - **Security Standards (30-security.mdc):**
     - OWASP Top 10 risks addressed: ✅ All risks reviewed
     - Input validation: ✅ Implemented
     - Authorization checks: ✅ At boundaries
     - Secrets management: ✅ No hardcoded secrets
   - **Test Coverage (31-testing.mdc):**
     - Coverage ≥80%: ✅ Critical paths covered
     - Tests deterministic: ✅ Hermetic tests
     - Happy/edge/failure cases: ✅ All covered
   - **Performance Targets (33-performance.mdc):**
     - Latency targets: ✅ Met
     - Throughput targets: ✅ Met
     - Complexity analysis: ✅ O(n) or better
   - **Code Quality (20-agents.mdc):**
     - SOLID principles: ✅ Followed
     - Readability: ✅ Good
     - Naming: ✅ Clear
   - **Language Compliance (50-lang-*.mdc):**
     - Path aliases: ✅ Used (if TypeScript)
     - Framework-free Domain/Application: ✅ Verified
     - Thin controllers: ✅ Verified

3. **Issues Found:**
   - List of any issues with severity and recommendations
   - If issues found, supervisor can delegate to fix agents

4. **Recommendations:**
   - Action items for any gaps
   - Next steps for workflow completion

## Key Characteristics

- **Comprehensive Validation:** All quality gates checked
- **Phase 0 Rules:** All Phase 0 rules validated
- **Issue Reporting:** Issues found with clear recommendations
- **Delegation Capability:** Can delegate to fix agents if quality gates fail
- **Structured Output:** Validation report with pass/fail status


