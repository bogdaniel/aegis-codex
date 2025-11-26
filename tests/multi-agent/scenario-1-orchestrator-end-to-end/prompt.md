# Scenario 1: Orchestrator End-to-End Feature

## Prompt

```
@orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
```

## Expected Behavior

1. Orchestrator breaks down task into sub-tasks
2. Invokes @architect, @api-designer, @security-auditor, @test-engineer, @devops, @code-reviewer
3. Formats context as Context Blocks for easy handoff between agents
4. Aggregates results
5. @supervisor validates all outputs meet quality gates
6. All Phase 0 rules enforced (36-architecture.mdc, 44-ddd.mdc, 50-lang-*.mdc)

## Context

This scenario tests the orchestrator's ability to coordinate a complete feature development workflow from architecture to deployment.


