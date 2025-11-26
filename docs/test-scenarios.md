# Test Scenarios for Agent Prompts

This document provides real-world test scenarios for validating agent behavior and rule compliance. Use these scenarios to test prompts in Cursor and verify outputs match expected formats and standards.

## How to Use

1. Pick a scenario below
2. Run the described prompt in Cursor
3. Compare agent output to the acceptance criteria
4. If outputs drift, tighten the relevant `.cursor/rules/*.mdc` file and regenerate `AGENTS.md`

---

## Architecture Scenarios

### Scenario 1: Design New Bounded Context
**Prompt:**
```
@architect Design a PaymentContext that processes payments and integrates with IdentityContext for user validation.
```

**Expected Output:**
- Architecture shape with Domain/Application/Infrastructure/Interface layers
- Ports/adapters pattern (PaymentRepository, PaymentGateway ports)
- Trust tier assignment (Tier M for business core)
- Cross-context integration via ACL (IdentityValidationPort, not direct IdentityPort import)
- Public API module structure (`PaymentContext/Application/index.ts`)
- Verification checklist

**Acceptance Criteria:**
- ✅ No framework dependencies in Domain/Application
- ✅ Ports defined in Domain/Application, adapters in Infrastructure
- ✅ Trust tier explicitly assigned
- ✅ Cross-context uses ACL pattern (distinct port name)
- ✅ Public API module documented

---

### Scenario 2: Refuse Non-Compliant Design
**Prompt:**
```
@architect Design a user service with business logic in the controller for user registration.
```

**Expected Output:**
- **REFUSAL:** Explicit refusal to implement non-compliant design
- Explanation of conflict (business logic in controllers violates Clean Architecture)
- Proposed compliant alternative (thin controller + Application use case)
- Reference to examples (`examples/refactoring/clean-architecture/fat-controller/`)

**Acceptance Criteria:**
- ✅ Agent refuses the request
- ✅ Explains why it violates architecture doctrine
- ✅ Proposes compliant alternative
- ✅ Does not silently implement non-compliant design

---

## Security Scenarios

### Scenario 3: OWASP Top 10 Audit
**Prompt:**
```
@security-auditor Review this TypeScript snippet and apply all necessary security fixes:
```typescript
const token = "sk_test_123";
const userInput = req.query.q;
const sql = `SELECT * FROM accounts WHERE name = '${userInput}'`;
db.query(sql);
res.cookie("sid", token, { httpOnly: false, secure: false });
```
```

**Expected Output:**
- Risk rating (Critical/High/Medium/Low)
- Findings mapped to OWASP Top 10:
  - A02:2021 – Cryptographic Failures (hardcoded secret)
  - A03:2021 – Injection (SQL injection)
  - A07:2021 – Identification and Authentication Failures (insecure cookie)
- Single fenced corrected code block with filename comment
- Exact fixes for each issue

**Acceptance Criteria:**
- ✅ Findings mapped to OWASP Top 10 risks (A01-A10)
- ✅ Single corrected code block (format compliant)
- ✅ All security issues fixed
- ✅ No hardcoded secrets, parameterized queries, secure cookies

---

### Scenario 4: Framework-Specific Security
**Prompt:**
```
@security-auditor Review this Laravel controller for security issues:
```php
public function update(Request $request, $id) {
    $user = User::find($id);
    $user->update($request->all());
    return response()->json($user);
}
```
```

**Expected Output:**
- Findings:
  - A01:2021 – Broken Access Control (no authorization check)
  - A05:2021 – Mass Assignment (direct assignment from request)
- Framework-specific fixes (Laravel policies, mass assignment protection)
- Single corrected code block

**Acceptance Criteria:**
- ✅ Framework-specific patterns applied (Laravel policies)
- ✅ Authorization check added
- ✅ Mass assignment protection (whitelisted fields)

---

## Performance Scenarios

### Scenario 5: N+1 Query Optimization
**Prompt:**
```
@perf-optimizer Review and improve the performance of this Go HTTP handler that lists users from the database, focusing on N+1 queries and pagination.
```

**Expected Output:**
- Baseline vs target metrics
- Bottlenecks identified (N+1 queries)
- Optimization plan (eager loading or batch loading)
- Single fenced corrected code block with complexity analysis
- Verification (benchmark command)

**Acceptance Criteria:**
- ✅ N+1 queries identified and fixed
- ✅ Time/space complexity stated
- ✅ Single code block (format compliant)
- ✅ Benchmark/verification command provided

---

## Testing Scenarios

### Scenario 6: Test Coverage for Use Case
**Prompt:**
```
@test-engineer Add tests for this RegisterUser use case with coverage of happy path, edge cases, and error scenarios.
```

**Expected Output:**
- Single fenced test block with language tag and filename comment
- Unit test scope (Domain/Application level)
- Fixtures/mocking strategy (in-memory repository)
- Commands to run tests
- Minimal passing assertion outline

**Acceptance Criteria:**
- ✅ Tests cover happy path, edge cases, error scenarios
- ✅ Deterministic (no external dependencies)
- ✅ Single test block (format compliant)
- ✅ Test command provided

---

## Code Review Scenarios

### Scenario 7: Architecture Violation Detection
**Prompt:**
```
@code-reviewer Review this PR for architecture compliance and code quality issues.
```

**Input:** PR with controller containing business logic

**Expected Output:**
- Quality score
- Blocking issues identified:
  - Business logic in controller (violates Clean Architecture)
  - Missing bounded context structure
- Single fenced corrected code block
- Reference to examples (`examples/refactoring/clean-architecture/fat-controller/`)

**Acceptance Criteria:**
- ✅ Architecture violations flagged
- ✅ Corrected code block provided
- ✅ PR blocked until fixed

---

## Refactoring Scenarios

### Scenario 8: SRP Violation Refactoring
**Prompt:**
```
@refactorer Refactor this god class into focused classes following SRP.
```

**Input:** God class with multiple responsibilities

**Expected Output:**
- Current issues identified (SRP violations)
- 2-4 step refactor plan with safety rails
- Before/after sketch
- Tests/checks (characterization tests)
- Rollback trigger/path
- Reference to examples (`examples/refactoring/srp-god-class/`)

**Acceptance Criteria:**
- ✅ Refactor plan preserves behavior
- ✅ Safety rails (tests, rollback)
- ✅ Links to examples
- ✅ Refactor improves architecture compliance

---

## Cross-Agent Workflow Scenarios

### Scenario 9: End-to-End Feature Development
**Workflow:**
1. `@architect` — Design PaymentContext
2. `@api-designer` — Design payment API
3. `@security-auditor` — Audit security
4. `@test-engineer` — Add tests
5. `@code-reviewer` — Final review

**Expected Output:**
- Each agent produces format-compliant output
- Architecture compliance maintained throughout
- Security issues addressed
- Tests added
- Final review passes

**Acceptance Criteria:**
- ✅ All agents follow format requirements
- ✅ Architecture doctrine maintained
- ✅ Security standards met
- ✅ Tests present
- ✅ Final review passes

---

## Multi-Agent Workflow Scenarios

For comprehensive multi-agent workflow testing, see `tests/multi-agent/` directory.

### Multi-Agent Scenarios

- **Scenario 1: Orchestrator End-to-End** — Full feature development workflow
  - See `tests/multi-agent/scenario-1-orchestrator-end-to-end/`
- **Scenario 2: Agent Delegation** — Agent-to-agent delegation with context passing
  - See `tests/multi-agent/scenario-2-agent-delegation/`
- **Scenario 3: Parallel Execution** — Semantic parallel execution with multiple perspectives
  - See `tests/multi-agent/scenario-3-parallel-execution/`
- **Scenario 4: Conditional Workflow** — Conditional agent execution with user approval
  - See `tests/multi-agent/scenario-4-conditional-workflow/`
- **Scenario 5: Supervisor Validation** — Supervisor quality gate validation
  - See `tests/multi-agent/scenario-5-supervisor-validation/`

Each multi-agent scenario includes:
- `prompt.md` — The prompt to run in Cursor
- `expected-output.md` — Expected agent behavior
- `validation.md` — Acceptance criteria

**See Also:**
- `docs/multi-agent/overview.md` — Multi-agent system overview
- `docs/multi-agent/delegation-matrix.md` — Delegation capabilities
- `docs/multi-agent/parallel-semantics.md` — Parallel execution semantics
- `docs/multi-agent/conditional-semantics.md` — Conditional workflow semantics

---

## Validation Checklist

For each scenario, verify:
- ✅ Agent follows format requirements (single code block, filename comment, etc.)
- ✅ Output matches expected structure (architecture shape, test outline, etc.)
- ✅ Standards compliance (Clean Architecture, DDD, security, etc.)
- ✅ Refusal behaviors work (agents refuse non-compliant requests)
- ✅ Cross-references to examples/rules are accurate
- ✅ Verification artifacts provided (commands, benchmarks, etc.)

---

## Updating Scenarios

When updating rules or agents:
1. Run relevant test scenarios
2. Compare outputs to acceptance criteria
3. If outputs drift, update rules in `.cursor/rules/*.mdc`
4. Regenerate `AGENTS.md` via `node scripts/build-agents-doc.js`
5. Update this document if acceptance criteria change

---

**Last Updated:** 2024-01-XX
**Version:** 1.0.0

