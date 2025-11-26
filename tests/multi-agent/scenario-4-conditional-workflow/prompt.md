# Scenario 4: Conditional Workflow

## Prompt

```
@orchestrator Review payment feature with conditional fixes. If security issues found, delegate to @security-auditor. If performance issues found, delegate to @perf-optimizer.
```

## Expected Behavior

1. Orchestrator describes conditional plan with branches
2. User reviews and approves conditional paths
3. @code-reviewer reviews code first
4. If security issues found, user approves → @security-auditor fixes
5. If performance issues found, user approves → @perf-optimizer fixes
6. @supervisor validates all conditional branches
7. All Phase 0 rules enforced

## Context

This scenario tests conditional execution where orchestrator describes branches, but user controls execution.


