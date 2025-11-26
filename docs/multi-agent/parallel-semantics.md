# Parallel Execution Semantics

This document defines the semantics for parallel agent execution in multi-agent workflows.

## Overview

Parallel execution enables multiple agents to analyze the same input from different perspectives simultaneously. The orchestrator aggregates their independent views into a unified output.

**Key Point:** Parallel execution is **semantic** - it means the orchestrator asks multiple agents for views in one structured answer. Nothing guarantees real concurrency or simultaneous execution. It's a convention for aggregating multiple perspectives.

## Syntax

**Format:**
```
@orchestrator [TASK] with parallel [AGENT_LIST]
```

**Example:**
```
@orchestrator Review payment feature with parallel @security-auditor, @perf-optimizer, @code-reviewer
```

## What "Parallel" Means

### Semantic Convention, Not True Concurrency

- **NOT:** Agents running simultaneously in separate processes
- **NOT:** True concurrent execution with shared state
- **INSTEAD:** Orchestrator synthesizes multiple agent perspectives into one comprehensive response
- **INSTEAD:** Independent agents provide perspectives that are aggregated into one answer

### How It Works

1. **Orchestrator receives request** with parallel agent list
2. **Orchestrator formats context** as Context Block for easy handoff
3. **User passes context** to each parallel agent (manually, one at a time in Cursor)
4. **Each agent analyzes** the same input from their specialized viewpoint
5. **Orchestrator aggregates** all perspectives into unified output
6. **Supervisor validates** all parallel outputs meet quality gates

## When to Use Parallel

### ✅ Use Parallel For:

- **Reviews:** Multiple agents review same code/design from different angles
  - Example: Security + performance + code quality review of same feature
- **Audits:** Security + performance + architecture audits on same artifact
  - Example: Comprehensive audit of payment module
- **Analysis:** Different analytical perspectives on same problem
  - Example: Architecture + security + performance analysis of API design
- **Validation:** Multiple validation checks on same output
  - Example: Quality gates + standards compliance + test coverage validation

### ❌ Don't Use Parallel For:

- **Sequential workflows:** When agents depend on each other's outputs
  - Example: Architect must complete before API designer
- **Design → Implementation:** Building something requires sequential steps
  - Example: Design → API → Tests → Deploy
- **Dependent workflows:** Agent B needs Agent A's output as input
  - Example: Tests need API contract from API designer

## Parallel Execution Rules

### 1. Independence Requirement

- **Agents must be independent:** No dependencies on each other's outputs
- **Same initial context:** All agents receive the same initial context
- **No communication:** Agents do not communicate during execution
- **No shared state:** Each agent works independently

### 2. Context Sharing

- **Context Block format:** Context formatted as Context Block at start for easy handoff
- **Full context:** Each agent receives full context block (user passes it manually)
- **No intermediate outputs:** Agents do not see each other's intermediate outputs
- **Convention, not automation:** Context sharing is a convention for formatting, not automatic

### 3. Result Aggregation

- **Aggregation by orchestrator or supervisor:** Results aggregated at end
- **Unified output:** Unified output presents all perspectives
- **Conflict resolution:** Conflicts or contradictions highlighted
- **Consistency check:** Aggregated output must be internally consistent

### 4. Quality Gates

- **Supervisor validation:** Supervisor validates all parallel outputs
- **Individual quality gates:** Each agent's output must meet their quality gates
- **Consistency requirement:** Aggregated output must be internally consistent

## Parallel Execution Patterns

### Pattern 1: Multi-Perspective Review

**Use Case:** Comprehensive review from multiple angles

**Example:**
```
@orchestrator Review payment feature with parallel analysis:
- @security-auditor: Security perspective (enforce 30-security.mdc)
- @perf-optimizer: Performance perspective (enforce 33-performance.mdc)
- @code-reviewer: Code quality perspective (enforce 20-agents.mdc)

Output: Unified review with security, performance, and quality findings
```

**When to use:**
- PR reviews
- Feature reviews
- Code quality audits

---

### Pattern 2: Comprehensive Audit

**Use Case:** Multiple audit perspectives on same module

**Example:**
```
@orchestrator Audit payment module with parallel security and architecture review:
- @security-auditor: Security vulnerabilities (enforce 30-security.mdc)
- @architect: Architecture compliance (enforce 36-architecture.mdc)

Output: Combined audit report
```

**When to use:**
- Security audits
- Architecture audits
- Compliance audits

---

### Pattern 3: Validation Suite

**Use Case:** Multiple validation checks on same output

**Example:**
```
@orchestrator Validate payment feature with parallel checks:
- @supervisor: Quality gates (enforce all Phase 0 rules)
- @code-reviewer: Standards compliance (enforce 20-agents.mdc)
- @test-engineer: Test coverage (enforce 31-testing.mdc)

Output: Comprehensive validation report
```

**When to use:**
- Pre-merge validation
- Release validation
- Quality assurance

---

## Parallel vs Sequential Decision Tree

### Use Sequential If:

- ✅ Agent B needs Agent A's output
- ✅ Workflow has dependencies (design → API → tests)
- ✅ Building something (architect → api-designer → devops)
- ✅ Sequential steps required

**Example:**
```
@orchestrator Build payment feature:
1. @architect Design architecture
2. @api-designer Design API (needs architecture)
3. @test-engineer Add tests (needs API contract)
```

### Use Parallel If:

- ✅ Agents analyze same input independently
- ✅ Multiple perspectives on same artifact
- ✅ Reviews, audits, validations
- ✅ No dependencies between agents

**Example:**
```
@orchestrator Review payment feature with parallel:
- @security-auditor: Security review
- @perf-optimizer: Performance review
- @code-reviewer: Code quality review
```

## Constraints

### Maximum Parallel Agents

- **Limit:** 3-4 parallel agents (to avoid overwhelming output)
- **Reason:** Too many perspectives can make aggregation difficult
- **Exception:** Validation suites may use more agents if well-structured

### Completion Requirement

- **All agents must complete:** All parallel agents must complete before aggregation
- **No partial aggregation:** Cannot aggregate partial results
- **Supervisor validation:** Supervisor must validate all parallel outputs

### Conflict Resolution

- **Conflicts must be resolved:** Conflicts between parallel outputs must be resolved
- **Orchestrator responsibility:** Orchestrator highlights conflicts in aggregated output
- **User decision:** User decides how to resolve conflicts

## Examples

### Example 1: Parallel Security and Performance Review

**Prompt:**
```
@orchestrator Review payment handler with parallel security and performance analysis.
```

**Workflow:**
1. Orchestrator formats Context Block with payment handler code
2. User passes Context Block to @security-auditor
3. User passes same Context Block to @perf-optimizer
4. Orchestrator aggregates security and performance findings
5. Supervisor validates both outputs

**Output:**
- Unified report with security vulnerabilities and performance bottlenecks
- Conflicts highlighted (e.g., security fix might impact performance)

---

### Example 2: Parallel Multi-Perspective Review

**Prompt:**
```
@orchestrator Review payment feature with parallel analysis from security, performance, and code quality perspectives.
```

**Workflow:**
1. Orchestrator formats Context Block with payment feature
2. User passes Context Block to @security-auditor, @perf-optimizer, @code-reviewer
3. Each agent analyzes independently
4. Orchestrator aggregates all perspectives
5. Supervisor validates all outputs

**Output:**
- Comprehensive review with security, performance, and quality findings
- All perspectives presented in unified format

---

## See Also

- `.cursor/rules/21-orchestration.mdc` — Orchestration rules including parallel execution
- `.cursor/rules/20-agents.mdc` — Agent definitions and capabilities
- `docs/multi-agent/conditional-semantics.md` — Conditional workflow semantics
- `docs/agent-prompts/templates.md` — Parallel execution templates


