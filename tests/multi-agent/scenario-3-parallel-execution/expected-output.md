# Expected Output

## Orchestrator Output

1. **Parallel Execution Plan:**
   - Context Block formatted for easy handoff
   - Parallel agents: @security-auditor, @perf-optimizer, @code-reviewer
   - Each agent receives same input (payment handler code)
   - Results aggregated into unified output

2. **Aggregated Results:**
   - **@security-auditor Perspective:**
     - Security vulnerabilities found (OWASP Top 10 mapping)
     - Security fixes applied
     - Risk rating
   - **@perf-optimizer Perspective:**
     - Performance bottlenecks identified
     - Optimization recommendations
     - Complexity analysis (time/space)
   - **@code-reviewer Perspective:**
     - Code quality issues
     - SOLID violations
     - Architecture compliance
     - Quality score

3. **Unified Output:**
   - All perspectives presented together
   - Conflicts or contradictions highlighted (if any)
   - Recommendations prioritized
   - @supervisor validation report

## Key Characteristics

- **Semantic Parallel:** Orchestrator asks multiple agents for views in one structured answer
- **Not True Concurrency:** Nothing guarantees real concurrency or simultaneous execution
- **Independent Analysis:** Each agent analyzes same input from specialized viewpoint
- **Aggregated Results:** Results aggregated into unified output
- **Supervisor Validation:** @supervisor validates all parallel outputs meet quality gates


