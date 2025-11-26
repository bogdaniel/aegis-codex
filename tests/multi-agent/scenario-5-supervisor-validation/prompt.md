# Scenario 5: Supervisor Validation

## Prompt

```
@supervisor Validate all agent outputs in the end-to-end payment feature development workflow.
```

## Expected Behavior

1. Supervisor receives outputs from multiple agents (@architect, @api-designer, @security-auditor, @test-engineer, @devops, @code-reviewer)
2. Supervisor validates against quality gates:
   - Architecture compliance (36-architecture.mdc)
   - Security standards (30-security.mdc)
   - Test coverage (31-testing.mdc)
   - Performance targets (33-performance.mdc)
   - Code quality (20-agents.mdc)
   - Language compliance (50-lang-*.mdc)
3. Supervisor reports pass/fail status, issues found, recommendations
4. If quality gates fail, supervisor can delegate to fix agents

## Context

This scenario tests supervisor's ability to validate multi-agent workflow outputs and ensure quality gates are met.


