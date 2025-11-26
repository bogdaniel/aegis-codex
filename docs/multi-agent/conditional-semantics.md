# Conditional Workflow Semantics

This document defines the semantics for conditional agent execution in multi-agent workflows.

## Overview

Conditional execution enables workflows to branch based on previous results. The orchestrator describes conditional branches, but the user controls execution by approving which paths to take.

**Key Point:** Conditional execution means **describing branches, but user controls execution**. The orchestrator presents a conditional plan, the user approves it, and then execution proceeds. It's NOT automatic branching.

## Syntax

**Format:**
```
@orchestrator [TASK] with conditional [CONDITION] → [AGENT]
```

**Example:**
```
@orchestrator Review payment feature. If security issues found, delegate to @security-auditor for fixes.
```

## What "Conditional" Means

### Planning, Not Auto-Execution

- **NOT:** Automatic branching based on conditions
- **NOT:** Orchestrator auto-executing based on conditions
- **INSTEAD:** Orchestrator presents conditional plan
- **INSTEAD:** User approves conditional paths
- **INSTEAD:** Execution proceeds after user approval

### How It Works

1. **Orchestrator receives request** with conditional branches
2. **Orchestrator describes plan** with conditional branches
3. **User reviews plan** and approves which branches to execute
4. **User can modify** conditions or skip branches
5. **Execution proceeds** with approved branches
6. **Supervisor validates** all conditional branches meet quality gates

## Condition Types

### 1. Issue-Based Conditions

**Format:** "if [ISSUE] found" → Execute agent if issue detected

**Examples:**
- "if security issues found" → @security-auditor
- "if architecture violations found" → @refactorer
- "if performance issues found" → @perf-optimizer

**Evaluation:** Supervisor or previous agent reports issues

**Use Case:** Conditional fixes based on review findings

---

### 2. Metric-Based Conditions

**Format:** "if [METRIC] > [THRESHOLD]" → Execute agent if metric exceeds threshold

**Examples:**
- "if p95 latency > 200ms" → @perf-optimizer
- "if test coverage < 80%" → @test-engineer
- "if error rate > 0.5%" → @code-reviewer

**Evaluation:** Metrics from previous agent or supervisor

**Use Case:** Conditional optimization based on performance metrics

---

### 3. Status-Based Conditions

**Format:** "if [STATUS] == [VALUE]" → Execute agent if status matches value

**Examples:**
- "if validation failed" → @code-reviewer
- "if tests failed" → @test-engineer
- "if security audit failed" → @security-auditor

**Evaluation:** Status from supervisor or previous agent

**Use Case:** Conditional fixes based on validation status

---

### 4. Compliance-Based Conditions

**Format:** "if [RULE] violated" → Execute agent if rule violated

**Examples:**
- "if architecture rules violated" → @architect
- "if security rules violated" → @security-auditor
- "if language rules violated" → @code-reviewer

**Evaluation:** Supervisor validates against Phase 0 rules

**Use Case:** Conditional refactoring based on compliance violations

## Conditional Planning Workflow

### Step 1: Orchestrator Describes Branches

**Example:**
```
@orchestrator Review payment feature with conditional planning.

Plan:
- Step 1: @code-reviewer reviews code
- Step 2 (conditional): If security issues found → @security-auditor
- Step 3 (conditional): If performance issues found → @perf-optimizer
- Step 4: @supervisor validates all outputs
```

**Output:** Conditional plan with explicit branches

---

### Step 2: User Approves Conditional Paths

**User Actions:**
- Review conditional plan
- Approve which branches to execute
- Modify conditions if needed
- Skip branches if not needed

**Example:**
```
User approves:
- Step 1: ✅ Execute
- Step 2: ✅ Execute if security issues found
- Step 3: ❌ Skip (no performance concerns)
- Step 4: ✅ Execute
```

---

### Step 3: Execution Proceeds

**Workflow:**
1. Orchestrator executes approved branches
2. Supervisor validates conditional branches
3. Results aggregated with conditional outcomes

**Output:** Results with conditional outcomes clearly marked

## Conditional Execution Rules

### 1. User Control

- **Requirement:** User must approve conditional paths before execution
- **Flexibility:** User can modify conditions
- **Option:** User can skip branches

**Rationale:** User maintains control over workflow execution

---

### 2. Supervisor Validation

- **Requirement:** Supervisor validates conditional branches
- **Quality Gates:** Supervisor ensures quality gates met despite conditional execution
- **Reporting:** Supervisor reports which conditions were met/not met

**Rationale:** Quality gates must be maintained even with conditional execution

---

### 3. Condition Evaluation

- **Requirement:** Conditions evaluated by supervisor or previous agent
- **Explicitness:** Conditions must be explicit and measurable
- **Reference:** Conditions must reference Phase 0 rules or metrics

**Rationale:** Conditions must be objective and verifiable

---

### 4. Branch Isolation

- **Requirement:** Conditional branches are isolated
- **Context:** Each branch receives full context
- **Independence:** Branches don't interfere with each other

**Rationale:** Branches must be independent to avoid conflicts

## Conditional Execution Patterns

### Pattern 1: Issue-Based Conditional Fix

**Use Case:** Conditional fixes based on review findings

**Example:**
```
@orchestrator Review payment feature with conditional fixes:
- @code-reviewer reviews code
- If security issues found → @security-auditor fixes
- If performance issues found → @perf-optimizer fixes
- @supervisor validates all fixes
```

**Workflow:**
1. @code-reviewer reviews code
2. If security issues found, user approves → @security-auditor fixes
3. If performance issues found, user approves → @perf-optimizer fixes
4. @supervisor validates all fixes

---

### Pattern 2: Metric-Based Conditional Optimization

**Use Case:** Conditional optimization based on performance metrics

**Example:**
```
@orchestrator Review payment feature with conditional optimization:
- @perf-optimizer analyzes performance
- If p95 latency > 200ms → @perf-optimizer optimizes
- If error rate > 0.5% → @code-reviewer fixes
- @supervisor validates optimizations
```

**Workflow:**
1. @perf-optimizer analyzes performance
2. If p95 latency > 200ms, user approves → @perf-optimizer optimizes
3. If error rate > 0.5%, user approves → @code-reviewer fixes
4. @supervisor validates optimizations

---

### Pattern 3: Compliance-Based Conditional Refactoring

**Use Case:** Conditional refactoring based on compliance violations

**Example:**
```
@orchestrator Review payment module with conditional refactoring:
- @supervisor validates architecture compliance
- If architecture violations found → @refactorer refactors
- If security violations found → @security-auditor fixes
- @supervisor validates all changes
```

**Workflow:**
1. @supervisor validates architecture compliance
2. If architecture violations found, user approves → @refactorer refactors
3. If security violations found, user approves → @security-auditor fixes
4. @supervisor validates all changes

## Conditional vs Unconditional

### Use Conditional If:

- ✅ Need to handle different scenarios
- ✅ Want to optimize workflow (skip unnecessary steps)
- ✅ Have multiple possible paths
- ✅ Conditions are explicit and measurable

**Example:** Review workflow where fixes are only needed if issues are found

---

### Use Unconditional If:

- ✅ Always need all steps
- ✅ Workflow is deterministic
- ✅ No branching needed
- ✅ All steps are required

**Example:** End-to-end feature development where all steps are always needed

## Constraints

### Maximum Conditional Branches

- **Limit:** 3-4 conditional branches (to avoid complexity)
- **Reason:** Too many branches make workflow hard to follow
- **Exception:** Well-structured validation suites may use more branches

### Explicit Conditions

- **Requirement:** All conditions must be explicit and measurable
- **Reference:** Conditions must reference Phase 0 rules or metrics
- **Evaluation:** Conditions must be evaluable by supervisor or previous agent

### User Approval

- **Requirement:** User approval required for conditional execution
- **Flexibility:** User can modify conditions or skip branches
- **Control:** User maintains control over workflow execution

### Supervisor Validation

- **Requirement:** Supervisor must validate all conditional branches
- **Quality Gates:** Supervisor ensures quality gates met despite conditional execution
- **Reporting:** Supervisor reports which conditions were met/not met

### Phase 0 Compliance

- **Requirement:** Conditional branches must maintain Phase 0 compliance
- **Rules:** All Phase 0 rules (36-architecture, 44-ddd, 50-lang-*, etc.) must be enforced
- **Validation:** Supervisor validates compliance for all branches

## Examples

### Example 1: Conditional Security Fix

**Prompt:**
```
@orchestrator Review payment handler. If security issues found, delegate to @security-auditor for fixes.
```

**Workflow:**
1. Orchestrator describes plan: @code-reviewer reviews, then conditional @security-auditor if issues found
2. User approves plan
3. @code-reviewer reviews code
4. If security issues found, user approves → @security-auditor fixes
5. @supervisor validates all outputs

**Output:**
- Review report with security findings
- Security fixes (if issues found)
- Validation report

---

### Example 2: Conditional Performance Optimization

**Prompt:**
```
@orchestrator Review payment feature. If performance issues found (p95 > 200ms), delegate to @perf-optimizer.
```

**Workflow:**
1. Orchestrator describes plan: @perf-optimizer analyzes, then conditional optimization if p95 > 200ms
2. User approves plan
3. @perf-optimizer analyzes performance
4. If p95 > 200ms, user approves → @perf-optimizer optimizes
5. @supervisor validates optimizations

**Output:**
- Performance analysis
- Performance optimizations (if needed)
- Validation report

---

### Example 3: Conditional Refactoring

**Prompt:**
```
@orchestrator Review payment module. If architecture violations found, delegate to @refactorer for refactoring.
```

**Workflow:**
1. Orchestrator describes plan: @supervisor validates compliance, then conditional @refactorer if violations found
2. User approves plan
3. @supervisor validates architecture compliance
4. If architecture violations found, user approves → @refactorer refactors
5. @supervisor validates all changes

**Output:**
- Compliance validation report
- Refactored code (if violations found)
- Validation report

## See Also

- `.cursor/rules/21-orchestration.mdc` — Orchestration rules including conditional execution
- `.cursor/rules/20-agents.mdc` — Agent definitions and capabilities
- `docs/multi-agent/parallel-semantics.md` — Parallel execution semantics
- `docs/agent-prompts/templates.md` — Conditional execution templates


