# Validation Criteria

## Must Pass

- [ ] Orchestrator described conditional plan with branches
- [ ] Conditional branches explicitly marked (if security issues found, if performance issues found)
- [ ] User approval mechanism clear (planning, not auto-execution)
- [ ] @code-reviewer reviewed code first
- [ ] If security issues found and user approved → @security-auditor fixes
- [ ] If performance issues found and user approved → @perf-optimizer fixes
- [ ] @supervisor validated all conditional branches
- [ ] All Phase 0 rules enforced

## Conditional Execution Compliance

- [ ] Conditional execution is planning, not auto-execution
- [ ] Orchestrator describes branches, but user controls execution
- [ ] User approval required for conditional execution
- [ ] Conditions explicit and measurable (if security issues found, if performance issues found)
- [ ] Conditional branches isolated (each branch receives full context)
- [ ] Supervisor validates all conditional branches

## Condition Types

- [ ] Issue-based conditions used (if security issues found, if performance issues found)
- [ ] Conditions evaluated by supervisor or previous agent
- [ ] Conditions reference Phase 0 rules or metrics

## Supervisor Validation

- [ ] @supervisor validated all conditional branches
- [ ] Quality gates met despite conditional execution
- [ ] Supervisor reported which conditions were met/not met
- [ ] All branches maintained Phase 0 compliance


