# Validation Criteria

## Must Pass

- [ ] Orchestrator formatted context as Context Block
- [ ] Orchestrator asked multiple agents (@security-auditor, @perf-optimizer, @code-reviewer) for views
- [ ] Each agent analyzed same input independently
- [ ] Orchestrator aggregated all perspectives into unified output
- [ ] @supervisor validated all parallel outputs
- [ ] All Phase 0 rules enforced

## Parallel Execution Compliance

- [ ] Parallel execution is semantic (orchestrator asks multiple agents for views in one structured answer)
- [ ] Not true concurrency (nothing guarantees real concurrency or simultaneous execution)
- [ ] Independent agents (no dependencies on each other's outputs)
- [ ] Same initial context (all agents receive same input)
- [ ] Results aggregated into unified output
- [ ] Conflicts or contradictions highlighted (if any)

## Agent Outputs

- [ ] @security-auditor: Security review with OWASP Top 10 mapping
- [ ] @perf-optimizer: Performance analysis with complexity analysis
- [ ] @code-reviewer: Code quality review with SOLID and architecture compliance
- [ ] All outputs meet their quality gates
- [ ] Aggregated output is internally consistent

## Supervisor Validation

- [ ] @supervisor validated all parallel outputs
- [ ] Each agent's output met their quality gates
- [ ] Aggregated output validated for consistency
- [ ] Quality gate report provided


