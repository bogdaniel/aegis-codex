# Multi-Agent System Overview

## Introduction

Aegis Codex supports multi-agent workflows where agents cooperate to complete complex tasks. The system enables agents to coordinate, delegate, execute in parallel, and handle conditional workflows while maintaining strict architecture compliance.

## Core Agents

### Planner Agent: @orchestrator

**Role:** Coordinate multiple agents to complete complex tasks

**Capabilities:**
- Breaks down high-level tasks into sub-tasks
- Invokes appropriate agents in sequence
- Formats context as Context Blocks for easy handoff between agents
- Aggregates results into unified output
- Supports sequential, parallel, and conditional workflows

**Example:**
```
@orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
```

### Supervisor Agent: @supervisor

**Role:** Monitor workflows, validate outputs, handle exceptions

**Capabilities:**
- Monitors multi-agent workflow execution
- Validates agent outputs meet requirements
- Ensures quality gates are met
- Handles errors and exceptions
- Retries failed operations
- Aggregates validation results

**Quality Gates:**
- Architecture compliance (Clean/Hex/DDD from 36-architecture.mdc)
- Security standards (OWASP Top 10 from 30-security.mdc)
- Test coverage (≥80% for critical paths from 31-testing.mdc)
- Performance targets (latency, throughput from 33-performance.mdc)
- Code quality (SOLID, readability from 20-agents.mdc)
- Language compliance (path aliases, layering from 50-lang-*.mdc)

**Example:**
```
@supervisor Validate all agent outputs in the end-to-end payment feature development workflow.
```

### Specialized Agents

- **@architect** — System/service architecture, domain boundaries, data flows
- **@api-designer** — Contract-first REST/GraphQL API design
- **@security-auditor** — OWASP, supply chain, secrets hygiene
- **@test-engineer** — Deterministic tests, coverage of happy/edge/failure cases
- **@code-reviewer** — Quality gate vs standards (SOLID, readability, observability)
- **@perf-optimizer** — Profiling first, improve hot paths only
- **@devops** — CI/CD, runtime, observability, safe delivery
- **@refactorer** — Behavior-preserving modernization, reduce complexity/duplication
- **@researcher** — Gather data from external sources (APIs, databases, web)

## How to Use

### In Cursor

1. **Invoke orchestrator with high-level task:**
   ```
   @orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
   ```

2. **Orchestrator:**
   - Breaks down task into sub-tasks
   - Invokes appropriate agents in sequence
   - Formats context as Context Blocks for easy handoff
   - Aggregates results

3. **Context Passing (Manual):**
   - Orchestrator formats context as Context Block
   - You (the user) manually copy the Context Block
   - Pass Context Block to the next agent in Cursor
   - This is a convention, not automatic

4. **Supervisor validates:**
   - Architecture compliance
   - Security standards
   - Test coverage
   - Code quality
   - Language compliance

### Workflow Patterns

#### Sequential Workflows

Agents execute one by one, passing context:

```
@orchestrator Build payment feature:
1. @architect Design architecture
2. @api-designer Design API (needs architecture)
3. @test-engineer Add tests (needs API contract)
```

**When to use:** When agents depend on each other's outputs

#### Parallel Execution

Semantic parallel execution - orchestrator asks multiple agents for views in one structured answer:

```
@orchestrator Review payment handler with parallel analysis:
- @security-auditor: Security perspective
- @perf-optimizer: Performance perspective
- @code-reviewer: Code quality perspective
```

**Note:** Parallel execution is semantic - orchestrator aggregates multiple perspectives into one answer. Nothing guarantees real concurrency or simultaneous execution.

**When to use:** Reviews, audits, analysis (not sequential workflows)

#### Conditional Workflows

Orchestrator describes branches, but user controls execution:

```
@orchestrator Review payment feature. If security issues found, delegate to @security-auditor for fixes.
```

**Note:** Conditional execution means describing branches, but user controls execution. Orchestrator presents conditional plan, user approves, then execution proceeds.

**When to use:** When you need to handle different scenarios or optimize workflow

## Agent Delegation

Agents can delegate to other agents using explicit syntax:

**Format:**
```
After [TASK], delegate to @[AGENT] for [PURPOSE]
```

**Example:**
```
@architect Design payment context. After design, delegate to @api-designer for API design and @security-auditor for security review.
```

**Context Passing:**
- Context MUST be formatted as a Context Block for easy handoff
- You (the user) manually copy the Context Block and pass it to the next agent
- This is a convention, not automatic

**See:** `docs/multi-agent/delegation-matrix.md` for complete delegation capabilities

## Context Blocks

Context Blocks are the canonical format for passing information between agents:

**Structure:**
- **Grounding Block:** Goal, constraints, assumptions, metrics, tier
- **Plan:** The minimal path that moves SLOs now; rollback path
- **Artifacts:** Files, designs, code created
- **Next Steps:** Recommended next actions or agent delegations

**Example:**
```
## Context Block

**Grounding Block:**
- Goal: Design PaymentContext for payment processing
- Constraints: Must integrate with IdentityContext
- Assumptions: Tier M (Medium/Business Core)
- Metrics: Latency < 200ms, availability 99.9%

**Plan:**
- Design PaymentContext with Clean Architecture + DDD
- Define ports in Domain/Application
- Implement adapters in Infrastructure/Interface
- Rollback: Revert to previous architecture

**Artifacts:**
- PaymentContext/Domain/Entities/Payment.ts
- PaymentContext/Application/UseCases/ProcessPayment.ts
- PaymentContext/Application/Ports/IdentityValidationPort.ts (ACL)

**Next Steps:**
- Delegate to @api-designer for API design
- Delegate to @security-auditor for security review
```

## Integration with 7-Chat Foundation

Multi-agent workflows enforce all Phase 0 rules:

- **36-architecture.mdc** — Clean Architecture, Hexagonal Architecture, DDD, bounded contexts, trust tiers
- **44-ddd.mdc** — Domain purity, aggregates, value objects, domain events
- **50-lang-*.mdc** — Path aliases, framework-free Domain/Application, thin controllers
- **30-security.mdc** — OWASP Top 10, security best practices
- **31-testing.mdc** — Test coverage, determinism, hermetic tests
- **34-ci.mdc** — CI/CD gates, architecture checks

**Enforcement:**
- Orchestrator MUST enforce Phase 0 rules
- Supervisor validates all outputs against Phase 0 rules
- All agents enforce Phase 0 rules in their outputs

## Examples

### Example 1: End-to-End Feature Development

```
@orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
```

**Workflow:**
1. @architect designs PaymentContext
2. @api-designer designs API
3. @security-auditor reviews security
4. @test-engineer adds tests
5. @devops sets up CI/CD
6. @supervisor validates all outputs
7. @code-reviewer final review

### Example 2: Parallel Review

```
@orchestrator Review payment handler with parallel analysis from security, performance, and code quality perspectives.
```

**Workflow:**
- Orchestrator asks @security-auditor, @perf-optimizer, @code-reviewer for views
- Each agent analyzes independently
- Orchestrator aggregates all perspectives
- @supervisor validates all outputs

### Example 3: Conditional Workflow

```
@orchestrator Review payment feature. If security issues found, delegate to @security-auditor for fixes.
```

**Workflow:**
1. Orchestrator describes conditional plan
2. User approves conditional paths
3. @code-reviewer reviews code
4. If security issues found and user approved → @security-auditor fixes
5. @supervisor validates all outputs

## See Also

- `docs/agent-prompts/templates.md` — Complete templates for all agents
- `docs/multi-agent/delegation-matrix.md` — Delegation capabilities
- `docs/multi-agent/parallel-semantics.md` — Parallel execution semantics
- `docs/multi-agent/conditional-semantics.md` — Conditional workflow semantics
- `docs/multi-agent/research-agent.md` — Research agent documentation
- `tests/multi-agent/` — Test scenarios for multi-agent workflows
- `.cursor/rules/21-orchestration.mdc` — Orchestration rules
- `.cursor/rules/20-agents.mdc` — Agent definitions and capabilities

