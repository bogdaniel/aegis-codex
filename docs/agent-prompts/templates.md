# Agent Prompt Templates

**Date:** 2024-11-24
**Status:** ✅ **COMPLETE** — Reusable prompt templates for all agents

---

## 📋 How to Use These Templates

1. **Copy the template** that matches your scenario
2. **Replace placeholders** (e.g., `[FILE_PATH]`, `[FEATURE_NAME]`)
3. **Add context** if needed (file paths, specific requirements)
4. **Paste in Cursor** and let the agent handle the rest

**Remember:** Don't restate standards or rules — the agents apply them automatically.

---

## 🏗️ @architect Templates

### Template 1: Design New Bounded Context

```
@architect Design a [CONTEXT_NAME]Context that [PRIMARY_FUNCTION] and integrates with [EXISTING_CONTEXT]Context for [INTEGRATION_PURPOSE].
```

**Examples:**
```
@architect Design a PaymentContext that processes payments and integrates with IdentityContext for user validation.

@architect Design a NotificationContext that sends emails and SMS, integrating with IdentityContext for user data and OrdersContext for order events.

@architect Design a ShippingContext that manages deliveries and integrates with OrdersContext for order information.
```

**When to use:**
- Starting a new feature or service
- Need to define bounded context boundaries
- Planning cross-context integration

---

### Template 2: Design Minimal Service Architecture

```
@architect Design a minimal architecture for a [SERVICE_NAME] service exposing [ENDPOINTS] in [LANGUAGE/FRAMEWORK], including data layer, observability, and basic scaling considerations.
```

**Examples:**
```
@architect Design a minimal architecture for a user service exposing GET /users/:id in TypeScript/Express, including data layer, observability, and basic scaling considerations.

@architect Design a minimal architecture for an order service exposing POST /orders and GET /orders/:id in PHP/Laravel, including data layer, observability, and basic scaling considerations.
```

**When to use:**
- Quick service design
- Need basic architecture outline
- Prototyping or MVP

---

### Template 3: Review Existing Architecture

```
@architect Review the architecture of [MODULE/SERVICE] and identify any violations of Clean Architecture, DDD, or trust tier boundaries. Propose fixes if needed.
```

**Examples:**
```
@architect Review the architecture of the OrdersContext and identify any violations of Clean Architecture, DDD, or trust tier boundaries. Propose fixes if needed.

@architect Review the architecture of the payment processing module and ensure it follows Clean Architecture with proper layer separation.
```

**When to use:**
- Architecture review
- Refactoring planning
- Compliance check

---

## 🔒 @security-auditor Templates

### Template 1: Audit File or Snippet

```
@security-auditor Review and fix security issues in [FILE_PATH].
```

**Examples:**
```
@security-auditor Review and fix security issues in src/handlers/userHandler.ts.

@security-auditor Review and fix security issues in examples/before-after/ts-express-handler-before.ts.
```

**When to use:**
- Security review of specific file
- Pre-commit security check
- Vulnerability assessment

---

### Template 2: Audit Code Snippet

```
@security-auditor Review this [LANGUAGE] snippet and apply all necessary security fixes:

[CODE_SNIPPET]
```

**Examples:**
```
@security-auditor Review this TypeScript snippet and apply all necessary security fixes:
```typescript
const token = "sk_test_123";
const userInput = req.query.q;
const sql = `SELECT * FROM accounts WHERE name = '${userInput}'`;
db.query(sql);
```

@security-auditor Review this PHP snippet and apply all necessary security fixes:
```php
$userInput = $_GET['q'];
$sql = "SELECT * FROM users WHERE name = '$userInput'";
$result = mysqli_query($conn, $sql);
```
```

**When to use:**
- Quick security check
- Code snippet review
- Learning security patterns

---

### Template 3: OWASP Top 10 Audit

```
@security-auditor Audit this [AUTHENTICATION/PAYMENT/DATA] code for OWASP Top 10 vulnerabilities.
```

**Examples:**
```
@security-auditor Audit this authentication code for OWASP Top 10 vulnerabilities.

@security-auditor Audit this payment processing code for OWASP Top 10 vulnerabilities.

@security-auditor Audit this user data handling code for OWASP Top 10 vulnerabilities.
```

**When to use:**
- Comprehensive security audit
- Pre-release security check
- Compliance verification

---

### Template 4: Framework-Specific Security

```
@security-auditor Review this [FRAMEWORK] code for framework-specific security patterns and OWASP Top 10 compliance.
```

**Examples:**
```
@security-auditor Review this Laravel controller for framework-specific security patterns and OWASP Top 10 compliance.

@security-auditor Review this Spring Boot service for framework-specific security patterns and OWASP Top 10 compliance.

@security-auditor Review this ASP.NET Core API for framework-specific security patterns and OWASP Top 10 compliance.
```

**When to use:**
- Framework-specific security review
- Leveraging framework security features
- Best practices for specific stack

---

## 🧪 @test-engineer Templates

### Template 1: Add Tests for Function/Use Case

```
@test-engineer Add tests for [FUNCTION/USE_CASE] with coverage of happy path, edge cases, and error scenarios.
```

**Examples:**
```
@test-engineer Add tests for the RegisterUser use case with coverage of happy path, edge cases, and error scenarios.

@test-engineer Add tests for the current user handler implementation so that happy path, validation errors, and not-found cases are fully covered.

@test-engineer Add tests for the PlaceOrder use case with coverage of happy path, validation errors, and payment failures.
```

**When to use:**
- New feature testing
- Improving test coverage
- Test-driven development

---

### Template 2: Design Tests for Function

```
@test-engineer Design and implement tests for this function:

[CODE_SNIPPET]
```

**Examples:**
```
@test-engineer Design and implement tests for this function:
```typescript
export function isStrongPassword(pw: string) {
  return pw.length > 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
}
```

@test-engineer Design and implement tests for this function:
```php
public function validateEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
```
```

**When to use:**
- Testing pure functions
- Unit test generation
- Function validation

---

### Template 3: Integration Tests

```
@test-engineer Add unit and integration tests for [MODULE/FUNCTION] to cover happy path, [ERROR_CONDITION_1], and [ERROR_CONDITION_2].
```

**Examples:**
```
@test-engineer Add unit and integration tests for the main login function in this service to cover happy path, invalid credentials, and lockout behavior.

@test-engineer Add unit and integration tests for the payment processing flow to cover successful payment, payment failure, and refund scenarios.
```

**When to use:**
- Integration testing
- End-to-end scenarios
- Complex workflows

---

## ⚡ @perf-optimizer Templates

### Template 1: Optimize Hot Path

```
@perf-optimizer Optimize the hot path of [ENDPOINT/HANDLER] for latency and scalability without changing behavior.
```

**Examples:**
```
@perf-optimizer Optimize the hot path of the user handler for latency and scalability without changing behavior.

@perf-optimizer This endpoint has high latency. Profile and optimize the hot path.

@perf-optimizer Optimize the order listing endpoint for latency and scalability without changing behavior.
```

**When to use:**
- Performance issues identified
- High-traffic endpoints
- Latency optimization

---

### Template 2: Optimize Function

```
@perf-optimizer Optimize this [LANGUAGE] function for [LARGE_INPUTS/THROUGHPUT] without changing behavior:

[CODE_SNIPPET]
```

**Examples:**
```
@perf-optimizer Optimize this TypeScript function for large inputs without changing behavior:
```typescript
export function findDuplicates(values: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] === values[j] && !result.includes(values[i])) {
        result.push(values[i]);
      }
    }
  }
  return result;
}
```
```

**When to use:**
- Algorithm optimization
- Performance-critical functions
- Large dataset handling

---

### Template 3: Database Query Optimization

```
@perf-optimizer Review and improve the performance of this [LANGUAGE] [HANDLER/QUERY] that [OPERATION], focusing on N+1 queries and pagination.
```

**Examples:**
```
@perf-optimizer Review and improve the performance of this Go HTTP handler that lists users from the database, focusing on N+1 queries and pagination.

@perf-optimizer Review and improve the performance of this PHP service that fetches orders with user data, focusing on N+1 queries and eager loading.
```

**When to use:**
- Database performance issues
- N+1 query problems
- Query optimization

---

## 📝 @code-reviewer Templates

### Template 1: Review PR or Change Set

```
@code-reviewer Review this [PR/CHANGE_SET] for architecture compliance and code quality issues.
```

**Examples:**
```
@code-reviewer Review this PR for architecture compliance and code quality issues.

@code-reviewer Review this change set and return the corrected file if you find any blocking issues.

@code-reviewer Review the updated user service code and return the corrected file if any blocking issues remain.
```

**When to use:**
- PR review
- Code quality check
- Architecture compliance

---

### Template 2: Review Refactoring

```
@code-reviewer Review this refactor of [MODULE] and ensure no behavior changes were introduced; fix anything that violates standards or breaks tests.
```

**Examples:**
```
@code-reviewer Review this refactor of a legacy module and ensure no behavior changes were introduced; fix anything that violates standards or breaks tests.

@code-reviewer Review this refactoring of the payment processing code and verify it maintains backward compatibility.
```

**When to use:**
- Refactoring review
- Behavior preservation check
- Regression prevention

---

### Template 3: Review Specific File

```
@code-reviewer Review [FILE_PATH] for architecture violations, security issues, and code quality problems.
```

**Examples:**
```
@code-reviewer Review src/controllers/UserController.php for architecture violations, security issues, and code quality problems.

@code-reviewer Review test/example-app/OrdersContext/Application/UseCases/PlaceOrder.ts for compliance with Clean Architecture.
```

**When to use:**
- File-specific review
- Targeted quality check
- Architecture compliance

---

## 🔄 @refactorer Templates

### Template 1: Refactor Controller

```
@refactorer Refactor this controller to follow Clean Architecture - extract business logic to Application use cases.
```

**Examples:**
```
@refactorer Refactor this controller to follow Clean Architecture - extract business logic to Application use cases.

@refactorer Refactor UserController.php to extract business logic to Application use cases, keeping the controller thin.
```

**When to use:**
- Fat controller refactoring
- Clean Architecture migration
- Separation of concerns

---

### Template 2: Refactor God Class

```
@refactorer Refactor this god class into focused classes following SRP.
```

**Examples:**
```
@refactorer Refactor this god class into focused classes following SRP.

@refactorer Refactor OrderService into focused classes following Single Responsibility Principle.
```

**When to use:**
- SRP violations
- Large service classes
- Responsibility separation

---

### Template 3: Refactor Legacy Code

```
@refactorer Improve the structure of [MODULE] to reduce duplication and make behavior easier to test, without changing game behavior.
```

**Examples:**
```
@refactorer Improve the structure of this GDScript gameplay script to reduce duplication and make behavior easier to test, without changing game behavior.

@refactorer Improve the structure of this legacy PHP service to reduce duplication and improve testability, without changing behavior.
```

**When to use:**
- Legacy code modernization
- Duplication reduction
- Testability improvement

---

## 🌐 @api-designer Templates

### Template 1: Design REST API

```
@api-designer Design a REST API for [SYSTEM] with [ENTITIES], including pagination and basic filtering.
```

**Examples:**
```
@api-designer Design a REST API for a blog system with posts, comments, and tags, including pagination and basic filtering.

@api-designer Design a REST API for an e-commerce system with products, orders, and customers, including pagination, filtering, and versioning.
```

**When to use:**
- New API design
- REST API specification
- Contract-first design

---

### Template 2: Design API for Service

```
@api-designer Design the API for a [SERVICE_NAME] service that exposes [ENDPOINTS]. Return the contract as a single OpenAPI snippet.
```

**Examples:**
```
@api-designer Design the API for a user service that exposes GET /users/:id and GET /users (paginated). Return the contract as a single OpenAPI snippet.

@api-designer Design the API for an order service that exposes POST /orders, GET /orders/:id, and PATCH /orders/:id. Return the contract as a single OpenAPI snippet.
```

**When to use:**
- Service API design
- OpenAPI specification
- API contract definition

---

### Template 3: Design GraphQL Schema

```
@api-designer Design a GraphQL schema for [SYSTEM] with [ENTITIES] and [FEATURES].
```

**Examples:**
```
@api-designer Design a GraphQL schema for a simple e-commerce catalog with products, categories, and search.

@api-designer Design a GraphQL schema for a social media platform with users, posts, comments, and likes.
```

**When to use:**
- GraphQL API design
- Schema definition
- GraphQL best practices

---

## 🚀 @devops Templates

### Template 1: Create CI Pipeline

```
@devops Create a CI pipeline configuration for a [LANGUAGE] service that runs lint, format, type-check, tests with coverage, security checks, and builds a Docker image.
```

**Examples:**
```
@devops Create a CI pipeline configuration for a TypeScript service that runs lint, format, type-check, tests with coverage, security checks, and builds a Docker image.

@devops Create a CI pipeline configuration for a PHP/Laravel service that runs PHPCS, PHPStan, tests, and builds a container image.
```

**When to use:**
- Setting up CI/CD
- New project setup
- Pipeline configuration

---

### Template 2: Create Runtime Configuration

```
@devops Create CI and basic runtime configuration for the [SERVICE_NAME] service, including linting, tests, security scans, and a container build.
```

**Examples:**
```
@devops Create CI and basic runtime configuration for the user service, including linting, tests, security scans, and a container build.

@devops Create CI and basic runtime configuration for the payment service, including linting, tests, security scans, and a container build.
```

**When to use:**
- Service deployment setup
- Container configuration
- Runtime environment

---

### Template 3: Kubernetes Deployment

```
@devops Provide a Kubernetes deployment and service for a stateless HTTP API with health and readiness probes enabled.
```

**Examples:**
```
@devops Provide a Kubernetes deployment and service for a stateless HTTP API with health and readiness probes enabled.

@devops Create a Kubernetes deployment for the user service with health checks, resource limits, and auto-scaling.
```

**When to use:**
- Kubernetes deployment
- Container orchestration
- Production deployment

---

## 🔗 Cross-Agent Workflow Templates

### Template 1: End-to-End Feature Development

```
1. @architect Design [FEATURE] following Clean Architecture and DDD patterns.
2. @api-designer Design the API for [FEATURE].
3. @security-auditor Review and fix security issues in [FEATURE].
4. @test-engineer Add tests for [FEATURE].
5. @perf-optimizer Optimize hot paths if needed.
6. @devops Set up CI/CD for [FEATURE].
7. @code-reviewer Final review of [FEATURE].
```

**Example:**
```
1. @architect Design a payment processing feature following Clean Architecture and DDD patterns.
2. @api-designer Design the API for payment processing.
3. @security-auditor Review and fix security issues in payment processing.
4. @test-engineer Add tests for payment processing.
5. @perf-optimizer Optimize hot paths if needed.
6. @devops Set up CI/CD for payment processing.
7. @code-reviewer Final review of payment processing.
```

**When to use:**
- Complete feature development
- New service creation
- Full workflow execution

---

### Template 2: Security-First Development

```
1. @architect Design [FEATURE] with security boundaries (Tier H contexts).
2. @security-auditor Audit design and implementation.
3. @test-engineer Add security-focused tests.
4. @code-reviewer Verify security compliance.
```

**Example:**
```
1. @architect Design authentication system with security boundaries (Tier H contexts).
2. @security-auditor Audit authentication design and implementation.
3. @test-engineer Add security-focused tests for authentication.
4. @code-reviewer Verify security compliance.
```

**When to use:**
- Security-critical features
- Authentication/authorization
- Compliance requirements

---

### Template 3: Performance Optimization Workflow

```
1. @perf-optimizer Profile and identify bottlenecks in [ENDPOINT/SERVICE].
2. @architect Review architecture for performance issues (if needed).
3. @test-engineer Add performance regression tests.
4. @code-reviewer Verify optimizations don't break correctness.
```

**Example:**
```
1. @perf-optimizer Profile and identify bottlenecks in the user listing endpoint.
2. @architect Review architecture for performance issues (if needed).
3. @test-engineer Add performance regression tests.
4. @code-reviewer Verify optimizations don't break correctness.
```

**When to use:**
- Performance issues
- Optimization projects
- Scalability improvements

---

### Template 4: Legacy Refactoring Workflow

```
1. @refactorer Identify issues and create refactor plan for [LEGACY_MODULE].
2. @test-engineer Add characterization tests.
3. @refactorer Execute refactor.
4. @code-reviewer Verify compliance and no regressions.
```

**Example:**
```
1. @refactorer Identify issues and create refactor plan for the legacy UserService.
2. @test-engineer Add characterization tests for UserService.
3. @refactorer Execute refactor.
4. @code-reviewer Verify compliance and no regressions.
```

**When to use:**
- Legacy code modernization
- Refactoring projects
- Technical debt reduction

---

## 📚 Best Practices

### ✅ DO

1. **Be specific:** Include file paths, function names, or specific requirements
2. **Use agent syntax:** Always start with `@agent-name` or `Act as the @agent-name`
3. **Keep prompts short:** Let rules handle standards, focus on the task
4. **Provide context:** Include relevant file paths or code snippets when needed
5. **Use templates:** Start with a template and customize for your needs

### ❌ DON'T

1. **Don't restate standards:** Rules apply automatically
2. **Don't be vague:** "Fix this" is too generic
3. **Don't mix agents:** Use one agent per prompt
4. **Don't override rules:** Trust the agent to apply standards correctly
5. **Don't skip verification:** Agents include verification steps automatically

---

## 🎯 Context-Specific Variations

### Language-Specific

**TypeScript/JavaScript:**
```
@architect Design a [FEATURE] in TypeScript following Clean Architecture with path aliases (@context/layer/*).
```

**PHP/Laravel:**
```
@architect Design a [FEATURE] in PHP/Laravel following Clean Architecture with framework-free Domain/Application layers.
```

**Java/Spring:**
```
@architect Design a [FEATURE] in Java/Spring following Clean Architecture with ports/adapters pattern.
```

**C#/.NET:**
```
@architect Design a [FEATURE] in C#/.NET following Clean Architecture with separate projects per layer.
```

### Risk Tier Variations

**Tier H (High/Safety Kernel):**
```
@architect Design a [FEATURE] with Tier H (High) trust tier. Use FULL mode for threat model and staged rollout.
```

**Tier M (Medium/Business Core):**
```
@architect Design a [FEATURE] with Tier M (Medium) trust tier following Clean Architecture and DDD.
```

**Tier S (Surface/Edge):**
```
@architect Design a [FEATURE] with Tier S (Surface) trust tier for UI/BFF layer.
```

---

## 🔍 Common Patterns

### Pattern 1: Quick Fix
```
@[AGENT] Fix [ISSUE] in [FILE_PATH].
```

### Pattern 2: Design + Review
```
@architect Design [FEATURE].
@code-reviewer Review the design for compliance.
```

### Pattern 3: Audit + Fix
```
@security-auditor Audit [FILE_PATH].
[Apply fixes]
@security-auditor Verify fixes are correct.
```

### Pattern 4: Test + Optimize
```
@test-engineer Add tests for [FEATURE].
@perf-optimizer Optimize hot paths if needed.
```

---

## 📖 See Also

- `docs/USAGE.md` — Complete usage guide
- `docs/agent-prompts.md` — Example prompts (legacy)
- `.cursor/rules/20-agents.mdc` — Agent definitions
- `test/scenarios/` — Real-world test scenarios

---

**Last Updated:** 2024-11-24
**Version:** 1.0.0

