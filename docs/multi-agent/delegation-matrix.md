# Agent Delegation Capability Matrix

This matrix shows which agents can delegate to which other agents, and when to use each delegation pattern.

## Matrix

| Delegating Agent | Can Delegate To | Purpose | When to Use |
|------------------|-----------------|---------|-------------|
| **@architect** | @api-designer | API design | After architecture design, need API contract |
| | @security-auditor | Security review | After architecture design, need security validation |
| | @test-engineer | Test design | After architecture design, need test strategy |
| | @supervisor | Validation | After architecture design, need compliance check |
| **@api-designer** | @security-auditor | Security review | After API design, need security validation |
| | @test-engineer | API tests | After API design, need contract tests |
| | @code-reviewer | Code review | After API design, need compliance check |
| **@security-auditor** | @test-engineer | Security tests | After security review, need security test coverage |
| | @code-reviewer | Fix validation | After security fixes, need compliance check |
| | @supervisor | Quality gate | After security review, need validation |
| **@perf-optimizer** | @architect | Architecture review | If performance issues require architecture changes |
| | @test-engineer | Performance tests | After optimization, need performance regression tests |
| | @code-reviewer | Code review | After optimization, need compliance check |
| | @supervisor | Validation | After optimization, need quality gate check |
| **@test-engineer** | @code-reviewer | Code review | After test implementation, need compliance check |
| | @supervisor | Coverage validation | After test implementation, need coverage validation |
| **@devops** | @code-reviewer | Config review | After CI/CD setup, need compliance check |
| | @supervisor | Pipeline validation | After CI/CD setup, need quality gate check |
| **@refactorer** | @test-engineer | Characterization tests | Before refactoring, need safety net |
| | @code-reviewer | Compliance check | After refactoring, need compliance validation |
| | @supervisor | Regression check | After refactoring, need regression validation |
| **@code-reviewer** | @security-auditor | Security fix | If security issues found during review |
| | @perf-optimizer | Performance fix | If performance issues found during review |
| | @refactorer | Refactoring | If architecture violations found during review |
| | @supervisor | Final validation | After review, need final quality gate |
| **@orchestrator** | Any agent | Workflow execution | Can delegate to any agent as part of workflow |
| **@supervisor** | Any agent | Fix execution | If quality gates fail, can delegate to fix agents |
| **@researcher** | @architect | Architecture research | After research, need architecture design |
| | @security-auditor | Security research | After research, need security validation |
| | @api-designer | API research | After research, need API design |

## Delegation Patterns by Workflow Type

### Design Workflow
```
@architect → @api-designer → @security-auditor → @test-engineer → @supervisor
```

**Purpose:** Complete feature design from architecture to validation

**When to use:**
- New feature development
- Service creation
- End-to-end design workflow

### Review Workflow
```
@code-reviewer → @security-auditor (if issues) → @perf-optimizer (if issues) → @supervisor
```

**Purpose:** Comprehensive code review with conditional fixes

**When to use:**
- PR reviews
- Code quality audits
- Compliance checks

### Refactoring Workflow
```
@refactorer → @test-engineer → @code-reviewer → @supervisor
```

**Purpose:** Safe refactoring with test coverage and validation

**When to use:**
- Legacy modernization
- Technical debt reduction
- Architecture improvements

### Optimization Workflow
```
@perf-optimizer → @architect (if needed) → @test-engineer → @supervisor
```

**Purpose:** Performance optimization with architecture review if needed

**When to use:**
- Performance issues
- Scalability improvements
- Hot path optimization

### Security Workflow
```
@security-auditor → @test-engineer → @code-reviewer → @supervisor
```

**Purpose:** Security-first development with test coverage

**When to use:**
- Security-critical features
- Vulnerability assessments
- Compliance requirements

## Delegation Constraints

### Maximum Depth
- **Maximum delegation depth:** 3 levels (to avoid deep chains)
- **Example:** @architect → @api-designer → @test-engineer (3 levels, OK)
- **Forbidden:** @architect → @api-designer → @test-engineer → @code-reviewer → @supervisor (5 levels, too deep)

### Circular Delegation
- **Forbidden:** Circular delegation (A → B → A)
- **Example:** @architect → @api-designer → @architect (forbidden)
- **Reason:** Prevents infinite loops and unclear ownership

### Explicit Delegation
- **Requirement:** Delegation must be explicit in agent output
- **Format:** "After [TASK], delegate to @[AGENT] for [PURPOSE]"
- **Context:** Context Block must be formatted for easy handoff

### Context Passing
- **Requirement:** Context must be passed to delegated agent
- **Format:** Context Block (Grounding Block + Plan + Artifacts + Next Steps)
- **Note:** Context passing is manual (user copies Context Block and passes to next agent)

### Phase 0 Rule Enforcement
- **Requirement:** Delegated agent MUST enforce same Phase 0 rules as delegating agent
- **Rules:** 36-architecture.mdc, 44-ddd.mdc, 50-lang-*.mdc, 30-security.mdc, 31-testing.mdc, 34-ci.mdc

## Examples

### Example 1: Architect Delegates to API Designer

**Prompt:**
```
@architect Design payment context. After design, delegate to @api-designer for API design.
```

**Context Passed:**
- Architecture design (bounded context, trust tier, layers)
- Integration points
- Constraints and assumptions

**Expected Output:**
- @architect: Architecture design with Context Block
- User copies Context Block and passes to @api-designer
- @api-designer: API contract using architecture context

### Example 2: Security Auditor Delegates to Test Engineer

**Prompt:**
```
@security-auditor Review payment handler for security issues. After review, delegate to @test-engineer to add security tests.
```

**Context Passed:**
- Security findings
- Vulnerabilities identified
- Fixes applied

**Expected Output:**
- @security-auditor: Security review and fixes with Context Block
- User copies Context Block and passes to @test-engineer
- @test-engineer: Security-focused tests

### Example 3: Code Reviewer Delegates Conditionally

**Prompt:**
```
@code-reviewer Review payment handler. If security issues found, delegate to @security-auditor. If performance issues found, delegate to @perf-optimizer.
```

**Context Passed:**
- Review findings
- Issues identified
- Conditional branches

**Expected Output:**
- @code-reviewer: Review report with conditional delegation
- User evaluates conditions and passes Context Block to appropriate agent
- @security-auditor or @perf-optimizer: Fixes based on issues found

## See Also

- `.cursor/rules/21-orchestration.mdc` — Orchestration rules and delegation syntax
- `.cursor/rules/20-agents.mdc` — Agent definitions with delegation capabilities
- `docs/agent-prompts/templates.md` — Delegation examples and templates


