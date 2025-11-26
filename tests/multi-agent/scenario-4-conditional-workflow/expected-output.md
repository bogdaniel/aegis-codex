# Expected Output

## Orchestrator Output

1. **Conditional Plan:**
   ```
   Plan:
   - Step 1: @code-reviewer reviews payment feature code
   - Step 2 (conditional): If security issues found → @security-auditor fixes
   - Step 3 (conditional): If performance issues found → @perf-optimizer fixes
   - Step 4: @supervisor validates all outputs
   ```

2. **User Approval Required:**
   - User reviews conditional plan
   - User approves which branches to execute
   - User can modify conditions or skip branches

3. **Execution (After User Approval):**
   - @code-reviewer reviews code
   - If security issues found and user approved → @security-auditor fixes
   - If performance issues found and user approved → @perf-optimizer fixes
   - @supervisor validates all outputs

## Key Characteristics

- **Planning, Not Auto-Execution:** Orchestrator describes branches, but user controls execution
- **User Approval Required:** User must approve conditional paths before execution
- **Conditional Branches:** Issue-based conditions (if security issues found, if performance issues found)
- **Supervisor Validation:** @supervisor validates all conditional branches meet quality gates
- **Branch Isolation:** Conditional branches are isolated; each branch receives full context

## Conditional Execution Flow

1. **Orchestrator Describes Branches:**
   - Conditional plan with explicit conditions
   - Branches clearly marked as conditional

2. **User Approves Conditional Paths:**
   - User reviews plan
   - User approves which branches to execute
   - User can modify or skip branches

3. **Execution Proceeds:**
   - Approved branches executed
   - Supervisor validates conditional branches
   - Results aggregated with conditional outcomes


