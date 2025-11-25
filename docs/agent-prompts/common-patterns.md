# Common Agent Prompt Patterns

**Date:** 2024-11-24
**Status:** ✅ **COMPLETE** — Common patterns and variations

---

## 🎯 Quick Reference

### By Task Type

| Task | Agent | Template |
|------|-------|----------|
| Design new feature | `@architect` | `Design [FEATURE] that [FUNCTION]` |
| Security audit | `@security-auditor` | `Review [FILE] for OWASP Top 10` |
| Add tests | `@test-engineer` | `Add tests for [TARGET]` |
| Optimize performance | `@perf-optimizer` | `Optimize [TARGET] for [METRIC]` |
| Code review | `@code-reviewer` | `Review [TARGET] for compliance` |
| Refactor code | `@refactorer` | `Refactor [TARGET] to [PATTERN]` |
| Design API | `@api-designer` | `Design [API_TYPE] for [SYSTEM]` |
| CI/CD setup | `@devops` | `Create [CONFIG] for [SERVICE]` |

---

## 🔄 Common Workflows

### Workflow 1: New Feature Development

```
1. @architect Design [FEATURE] following Clean Architecture and DDD.
2. @api-designer Design the API for [FEATURE].
3. @security-auditor Review and fix security issues.
4. @test-engineer Add tests for [FEATURE].
5. @code-reviewer Final review.
```

**Example:**
```
1. @architect Design payment processing following Clean Architecture and DDD.
2. @api-designer Design the API for payment processing.
3. @security-auditor Review and fix security issues.
4. @test-engineer Add tests for payment processing.
5. @code-reviewer Final review.
```

---

### Workflow 2: Security-First Development

```
1. @architect Design [FEATURE] with security boundaries.
2. @security-auditor Audit design and implementation.
3. @test-engineer Add security-focused tests.
4. @code-reviewer Verify security compliance.
```

**Example:**
```
1. @architect Design authentication system with security boundaries (Tier H).
2. @security-auditor Audit authentication design and implementation.
3. @test-engineer Add security-focused tests for authentication.
4. @code-reviewer Verify security compliance.
```

---

### Workflow 3: Performance Optimization

```
1. @perf-optimizer Profile and identify bottlenecks.
2. @test-engineer Add performance regression tests.
3. @code-reviewer Verify optimizations don't break correctness.
```

**Example:**
```
1. @perf-optimizer Profile and identify bottlenecks in user listing endpoint.
2. @test-engineer Add performance regression tests.
3. @code-reviewer Verify optimizations don't break correctness.
```

---

### Workflow 4: Legacy Refactoring

```
1. @refactorer Identify issues and create plan.
2. @test-engineer Add characterization tests.
3. @refactorer Execute refactor.
4. @code-reviewer Verify compliance and no regressions.
```

**Example:**
```
1. @refactorer Identify issues and create plan for legacy UserService.
2. @test-engineer Add characterization tests for UserService.
3. @refactorer Execute refactor.
4. @code-reviewer Verify compliance and no regressions.
```

---

## 🎨 Pattern Variations

### Pattern 1: Language-Specific

**TypeScript:**
```
@architect Design [FEATURE] in TypeScript with path aliases (@context/layer/*).
```

**PHP/Laravel:**
```
@architect Design [FEATURE] in PHP/Laravel with framework-free Domain/Application.
```

**Java/Spring:**
```
@architect Design [FEATURE] in Java/Spring with ports/adapters pattern.
```

**C#/.NET:**
```
@architect Design [FEATURE] in C#/.NET with separate projects per layer.
```

---

### Pattern 2: Risk Tier-Specific

**Tier H (High/Safety Kernel):**
```
@architect Design [FEATURE] with Tier H trust tier. Use FULL mode.
```

**Tier M (Medium/Business Core):**
```
@architect Design [FEATURE] with Tier M trust tier.
```

**Tier S (Surface/Edge):**
```
@architect Design [FEATURE] with Tier S trust tier for UI/BFF.
```

---

### Pattern 3: Framework-Specific

**Laravel:**
```
@security-auditor Review this Laravel controller for framework-specific security patterns.
```

**Spring Boot:**
```
@security-auditor Review this Spring Boot service for framework-specific security patterns.
```

**ASP.NET Core:**
```
@security-auditor Review this ASP.NET Core API for framework-specific security patterns.
```

---

## 📋 Copy-Paste Templates

### Quick Fixes

**Security Fix:**
```
@security-auditor Fix security issues in [FILE_PATH].
```

**Test Addition:**
```
@test-engineer Add tests for [FUNCTION/USE_CASE].
```

**Performance Fix:**
```
@perf-optimizer Optimize [ENDPOINT/FUNCTION] for performance.
```

**Code Review:**
```
@code-reviewer Review [FILE/PR] for compliance.
```

---

### Design Tasks

**New Context:**
```
@architect Design [CONTEXT]Context that [FUNCTION] and integrates with [EXISTING_CONTEXT]Context.
```

**Service Architecture:**
```
@architect Design minimal architecture for [SERVICE] exposing [ENDPOINTS] in [LANGUAGE/FRAMEWORK].
```

**API Design:**
```
@api-designer Design REST API for [SYSTEM] with [ENTITIES], including pagination.
```

---

### Refactoring Tasks

**Controller Refactoring:**
```
@refactorer Refactor this controller to follow Clean Architecture - extract business logic to Application use cases.
```

**SRP Violation:**
```
@refactorer Refactor this god class into focused classes following SRP.
```

**Legacy Code:**
```
@refactorer Improve structure of [MODULE] to reduce duplication and improve testability.
```

---

## 🔍 Context-Specific Examples

### Example 1: E-Commerce System

```
@architect Design an OrderContext that manages orders and integrates with PaymentContext for payment processing and IdentityContext for user validation.
```

### Example 2: Authentication System

```
@architect Design an IdentityContext with Tier H trust tier for authentication and authorization. Use FULL mode for threat model.
```

### Example 3: Notification System

```
@architect Design a NotificationContext that sends emails and SMS, integrating with IdentityContext for user data and OrdersContext for order events.
```

---

## 🎯 Anti-Patterns to Avoid

### ❌ Don't Over-Specify

**Bad:**
```
@architect Design payment context with Domain layer, Application layer, Infrastructure layer, Interface layer, using ports/adapters, following DDD, with bounded contexts, trust tiers, ACL pattern...
```

**Good:**
```
@architect Design a PaymentContext that processes payments.
```

---

### ❌ Don't Under-Specify

**Bad:**
```
@architect Design something.
```

**Good:**
```
@architect Design a payment processing context.
```

---

### ❌ Don't Mix Agents

**Bad:**
```
@architect Design payment and @api-designer design API.
```

**Good:**
```
@architect Design payment context.
[Wait for response]
@api-designer Design API for payment processing.
```

---

### ❌ Don't Restate Rules

**Bad:**
```
@security-auditor Check for SQL injection, XSS, CSRF, IDOR, mass assignment...
```

**Good:**
```
@security-auditor Review this code for OWASP Top 10 vulnerabilities.
```

---

## 📚 See Also

- `docs/agent-prompts/templates.md` — Complete template library
- `docs/agent-prompts/best-practices.md` — Best practices guide
- `docs/USAGE.md` — Usage guide
- `test/scenarios/` — Real-world examples

---

**Last Updated:** 2024-11-24
**Version:** 1.0.0

