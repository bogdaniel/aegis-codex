# Scenario 3: Parallel Execution

## Prompt

```
@orchestrator Review payment handler with parallel analysis from security, performance, and code quality perspectives.
```

## Expected Behavior

1. Orchestrator formats context as Context Block
2. Orchestrator asks multiple agents (@security-auditor, @perf-optimizer, @code-reviewer) for views in one structured answer
3. Each agent analyzes the same input independently
4. Orchestrator aggregates all perspectives into unified output
5. @supervisor validates all parallel outputs
6. All Phase 0 rules enforced

## Context

This scenario tests semantic parallel execution where orchestrator aggregates multiple agent perspectives into one comprehensive response.


