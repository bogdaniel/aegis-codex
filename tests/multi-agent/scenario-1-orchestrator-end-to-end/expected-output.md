# Expected Output

## Orchestrator Output

1. **Workflow Plan:**
   - Step 1: @architect designs PaymentContext following Clean Architecture + DDD
   - Step 2: @api-designer designs REST/GraphQL API for payment feature
   - Step 3: @security-auditor reviews and fixes security issues
   - Step 4: @test-engineer adds comprehensive tests
   - Step 5: @devops sets up CI/CD pipeline
   - Step 6: @supervisor validates all outputs meet quality gates
   - Step 7: @code-reviewer final compliance review

2. **Agent Outputs:**
   - @architect: PaymentContext design with:
     - Bounded context identified (PaymentContext)
     - Trust tier assigned (Tier M - Medium/Business Core)
     - Clean Architecture layering (Domain, Application, Infrastructure, Interface)
     - Ports defined in Domain/Application
     - Adapters in Infrastructure/Interface
   - @api-designer: OpenAPI spec with schemas, validation, error model, auth, pagination
   - @security-auditor: Security review with OWASP Top 10 mapping and fixes
   - @test-engineer: Test code with unit/integration/E2E scope, fixtures, mocking strategy
   - @devops: CI/CD config with lint/test/build/scan gates, health checks, rollout strategy
   - @supervisor: Validation report with pass/fail status, issues found, recommendations
   - @code-reviewer: Compliance review confirming all standards met

3. **Summary:**
   - All quality gates passed
   - Architecture compliance verified
   - Security standards met
   - Test coverage ≥80% for critical paths
   - CI/CD pipeline configured
   - Ready for implementation

## Context Blocks

Each agent output should include a Context Block formatted for easy handoff:
- Grounding Block: Goal, constraints, assumptions, metrics, tier
- Plan: Minimal path that moves SLOs now; rollback path
- Artifacts: Files, designs, code created
- Next Steps: Recommended next actions or agent delegations


