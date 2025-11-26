# Agent Prompt Best Practices

**Date:** 2024-11-24
**Status:** ✅ **COMPLETE** — Best practices for using Aegis Codex agents

---

## 🎯 Core Principles

### 1. Trust the Rules

**✅ DO:**
```
@architect Design a payment processing context.
```

**❌ DON'T:**
```
@architect Design a payment processing context following Clean Architecture with Domain/Application/Infrastructure layers, ports/adapters pattern, DDD bounded contexts, and trust tiers. Make sure Domain is framework-free...
```

**Why:** Rules apply automatically. Restating them wastes tokens and can cause confusion.

---

### 2. Be Specific About the Task

**✅ DO:**
```
@security-auditor Review and fix security issues in src/handlers/paymentHandler.ts.
```

**❌ DON'T:**
```
@security-auditor Fix security.
```

**Why:** Specific file paths and requirements help the agent focus on the right code.

---

### 3. Use One Agent Per Prompt

**✅ DO:**
```
@architect Design the payment context.
[Wait for response]
@api-designer Design the API for payment processing.
```

**❌ DON'T:**
```
@architect Design the payment context and @api-designer design the API.
```

**Why:** Each agent has specific format requirements. Mixing agents can cause format violations.

---

### 4. Provide Context When Needed

**✅ DO:**
```
@refactorer Refactor this controller to follow Clean Architecture:
[Code snippet or file path]
```

**❌ DON'T:**
```
@refactorer Refactor this.
```

**Why:** Context helps the agent understand what to refactor and why.

---

### 5. Let Agents Handle Standards

**✅ DO:**
```
@test-engineer Add tests for RegisterUser use case.
```

**❌ DON'T:**
```
@test-engineer Add unit tests for RegisterUser use case with 80% coverage, using vitest, with happy path, edge cases, and error scenarios, following TDD principles...
```

**Why:** Agents automatically apply testing standards, coverage requirements, and best practices.

---

## 📋 Prompt Structure

### Basic Structure

```
@[AGENT] [ACTION] [TARGET] [CONTEXT/REQUIREMENTS]
```

**Components:**
- **Agent:** `@architect`, `@security-auditor`, etc.
- **Action:** `Design`, `Review`, `Add`, `Fix`, `Optimize`
- **Target:** File path, function name, feature name
- **Context:** Optional requirements, constraints, or code snippets

---

### Examples by Agent

#### @architect
```
@architect Design [FEATURE] [with INTEGRATION] [following PATTERNS].
```

#### @security-auditor
```
@security-auditor [Review/Audit] [FILE_PATH/CODE] [for SPECIFIC_ISSUES].
```

#### @test-engineer
```
@test-engineer [Add/Design] tests for [TARGET] [with COVERAGE].
```

#### @code-reviewer
```
@code-reviewer Review [TARGET] [for COMPLIANCE/ISSUES].
```

#### @refactorer
```
@refactorer Refactor [TARGET] [to FOLLOW_PATTERN] [without CHANGING_BEHAVIOR].
```

#### @perf-optimizer
```
@perf-optimizer Optimize [TARGET] [for METRIC] [without CHANGING_BEHAVIOR].
```

#### @api-designer
```
@api-designer Design [API_TYPE] for [SYSTEM] [with FEATURES].
```

#### @devops
```
@devops Create [CONFIG_TYPE] for [SERVICE] [with REQUIREMENTS].
```

---

## 🎨 Prompt Patterns

### Pattern 1: Simple Task
```
@[AGENT] [ACTION] [TARGET].
```

**Example:**
```
@test-engineer Add tests for RegisterUser use case.
```

---

### Pattern 2: Task with Context
```
@[AGENT] [ACTION] [TARGET] [with CONTEXT].
```

**Example:**
```
@security-auditor Review src/handlers/paymentHandler.ts for OWASP Top 10 vulnerabilities.
```

---

### Pattern 3: Task with Code Snippet
```
@[AGENT] [ACTION] [TARGET]:

[CODE_SNIPPET]
```

**Example:**
```
@perf-optimizer Optimize this function for large inputs:

export function findDuplicates(values: string[]): string[] {
  // ... code ...
}
```

---

### Pattern 4: Multi-Step Workflow
```
1. @[AGENT_1] [TASK_1]
2. @[AGENT_2] [TASK_2]
3. @[AGENT_3] [TASK_3]
```

**Example:**
```
1. @architect Design payment processing context.
2. @api-designer Design the API for payment processing.
3. @security-auditor Review and fix security issues.
```

---

## ⚠️ Common Mistakes

### Mistake 1: Over-Specifying

**❌ Bad:**
```
@architect Design a payment context with Domain layer containing entities and value objects, Application layer with use cases, Infrastructure layer with adapters, Interface layer with controllers, using ports/adapters pattern, following DDD bounded contexts, with Tier M trust tier, integrating with IdentityContext via ACL...
```

**✅ Good:**
```
@architect Design a PaymentContext that processes payments and integrates with IdentityContext for user validation.
```

**Why:** Rules handle all the details. Focus on what you want, not how to do it.

---

### Mistake 2: Under-Specifying

**❌ Bad:**
```
@architect Design something.
```

**✅ Good:**
```
@architect Design a payment processing context.
```

**Why:** Too vague prompts lead to generic responses.

---

### Mistake 3: Mixing Agents

**❌ Bad:**
```
@architect Design the payment context and @api-designer design the API.
```

**✅ Good:**
```
@architect Design the payment context.
[Wait for response]
@api-designer Design the API for payment processing.
```

**Why:** Each agent has specific format requirements. Mixing can cause conflicts.

---

### Mistake 4: Restating Rules

**❌ Bad:**
```
@security-auditor Review this code for SQL injection, XSS, CSRF, IDOR, mass assignment, sensitive data exposure, missing authorization, vulnerable dependencies, and insufficient logging.
```

**✅ Good:**
```
@security-auditor Review this code for OWASP Top 10 vulnerabilities.
```

**Why:** Agents automatically check for all OWASP Top 10 issues. No need to list them.

---

### Mistake 5: Ignoring Format Requirements

**❌ Bad:**
```
@perf-optimizer Optimize this and also add tests and documentation.
```

**✅ Good:**
```
@perf-optimizer Optimize this function for performance.
[Wait for response]
@test-engineer Add tests for the optimized function.
```

**Why:** Some agents have strict format requirements (single code block). Mixing concerns violates format.

---

## 🔄 Workflow Patterns

### Pattern 1: Feature Development

```
1. @architect Design [FEATURE]
2. @api-designer Design API
3. @test-engineer Add tests
4. @code-reviewer Review
```

---

### Pattern 2: Security Review

```
1. @security-auditor Audit [CODE]
2. [Apply fixes]
3. @security-auditor Verify fixes
```

---

### Pattern 3: Performance Optimization

```
1. @perf-optimizer Profile and optimize
2. @test-engineer Add regression tests
3. @code-reviewer Verify correctness
```

---

### Pattern 4: Legacy Refactoring

```
1. @refactorer Identify issues and plan
2. @test-engineer Add characterization tests
3. @refactorer Execute refactor
4. @code-reviewer Verify compliance
```

---

## 🎯 Mode Selection

### LITE Mode (Default)
**When:** Simple tasks, quick fixes, narrow scope

**Example:**
```
@security-auditor Fix SQL injection in this query.
```

---

### STANDARD Mode
**When:** Design tasks, debugging, context matters

**Example:**
```
Use STANDARD mode: @architect Design payment processing context.
```

---

### FULL Mode
**When:** High-risk changes (auth/PII/funds), major refactors

**Example:**
```
Use FULL mode: @architect Design authentication system with threat model.
```

---

## 📝 Prompt Templates by Scenario

### Scenario 1: New Feature
```
@architect Design [FEATURE] that [FUNCTION] and integrates with [CONTEXT] for [PURPOSE].
```

### Scenario 2: Security Audit
```
@security-auditor Review [FILE/CODE] for [OWASP/FRAMEWORK-SPECIFIC] security issues.
```

### Scenario 3: Test Coverage
```
@test-engineer Add tests for [TARGET] with coverage of [SCENARIOS].
```

### Scenario 4: Performance Issue
```
@perf-optimizer Optimize [TARGET] for [METRIC] without changing behavior.
```

### Scenario 5: Code Review
```
@code-reviewer Review [TARGET] for [COMPLIANCE/ISSUES].
```

### Scenario 6: Refactoring
```
@refactorer Refactor [TARGET] to [PATTERN] without changing behavior.
```

### Scenario 7: API Design
```
@api-designer Design [API_TYPE] for [SYSTEM] with [FEATURES].
```

### Scenario 8: CI/CD Setup
```
@devops Create [CONFIG_TYPE] for [SERVICE] with [REQUIREMENTS].
```

---

## 🔍 Debugging Prompts

### If Agent Refuses Request

**Check:**
1. Does the request violate architecture doctrine?
2. Is the format requirement met?
3. Are there security concerns?

**Response:**
```
The agent refused because [REASON]. Here's a compliant alternative: [ALTERNATIVE].
```

---

### If Output Doesn't Match Expected

**Check:**
1. Is the prompt specific enough?
2. Is the context provided?
3. Are file paths correct?

**Improve:**
```
@[AGENT] [MORE_SPECIFIC_ACTION] [WITH_CONTEXT] in [FILE_PATH].
```

---

### If Rules Don't Apply

**Check:**
1. Does the file match the glob pattern?
2. Is `alwaysApply: true` set?
3. Is the rule file in the correct location?

**Fix:**
- Verify file paths match globs
- Check rule file structure
- Ensure rules are loaded

---

## 📚 See Also

- `docs/agent-prompts/templates.md` — Reusable prompt templates
- `docs/USAGE.md` — Complete usage guide
- `.cursor/rules/20-agents.mdc` — Agent definitions
- `test/scenarios/` — Real-world examples

---

**Last Updated:** 2024-11-24
**Version:** 1.0.0


