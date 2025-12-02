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

## 🎯 @orchestrator Templates

**Note:** The orchestrator formats context as Context Blocks for easy handoff. You (the user) manually copy the Context Block and pass it to the next agent in Cursor.

### Build Minimal PHP Backend (Aegis Codex Rules)
@orchestrator Build a minimal PHP backend from scratch to exercise Aegis Codex. Use core agents (@architect, @implementer, @test-engineer, @code-reviewer, @security-auditor, @supervisor). Apply all relevant rules from .cursor/rules/ (architecture/DDD, security, testing/change-discipline, CI, risk overrides, PHP/Laravel language rules). Do NOT ask me for structure; derive it from the rules. No risk overrides unless explicitly invoked.

Scope:
- Two bounded contexts: Identity, Orders (trust tiers per rules).
- Identity: RegisterUser use case (email/password), publishes UserRegistered event.
- Orders: PlaceOrder use case (userId, amount), publishes OrderPlaced event.

Deliverables:
- Clean Architecture/DDD-compliant code in PHP 8.2+ with ports/adapters and no frameworks in Domain/Application.
- In-memory adapters (repos, event publisher) for tests.
- composer.json, phpunit.xml, deptrac.yaml (layer enforcement), minimal README with run/test commands.
- Tests: Domain (VO/entity invariants) + Application (happy + failure paths) per rules/31-testing.mdc.
- CI/commands: `composer install`, `composer test` (phpunit + phpstan), `vendor/bin/deptrac analyse`.

Workflow (follow rules):
1) @architect: design bounded contexts, trust tiers, layers, ports/adapters per rules/36-architecture.mdc & 44-ddd.mdc; no structure guidance needed.
2) @security-auditor: threat model per rules/30-threat-modeling.mdc; apply PHP secure coding checklist (docs/secure-coding-checklists.md).
3) @implementer: build per design; keep Domain/Application framework-free; hash passwords; enforce invariants.
4) @test-engineer: add required tests (Domain + Application, happy + failure) per rules/31-testing.mdc.
5) @code-reviewer: enforce architecture/testing/change-discipline; reject violations.
6) @supervisor: ensure compliance; no completion if mandatory rules/tests missing.

Constraints:
- Respect Clean Architecture, no business logic in controllers/adapters.
- No plaintext passwords; validate duplicate email; Money non-negative.
- No edits to rules/.cursor; if a rule must be violated, require explicit RISK_OVERRIDE per rules/3G-risk-overrides.mdc.
- Keep outputs concise and self-contained; provide commands to run tests/checks.

### Template 1: End-to-End Feature Development

```
@orchestrator Build a complete [FEATURE] with architecture, API, security, tests, and CI/CD.

Workflow:
1. @architect Design [FEATURE] context following Clean Architecture + DDD (enforce 36-architecture.mdc)
2. @api-designer Design REST/GraphQL API for [FEATURE]
3. @security-auditor Review and fix security issues (enforce 30-security.mdc)
4. @test-engineer Add comprehensive tests (enforce 31-testing.mdc)
5. @devops Set up CI/CD pipeline (enforce 34-ci.mdc)
6. @supervisor Validate all outputs meet quality gates
7. @code-reviewer Final compliance review
```

**Example:**
```
@orchestrator Build a complete payment processing feature with architecture, API, security, tests, and CI/CD.
```

**When to use:**
- Complete feature development
- New service creation
- Full workflow execution

---

### Template 2: Security-First Development

```
@orchestrator Build [FEATURE] with security-first approach.

Workflow:
1. @architect Design with security boundaries (Tier H contexts, enforce 36-architecture.mdc)
2. @security-auditor Audit design and implementation (enforce 30-security.mdc)
3. @test-engineer Add security-focused tests (enforce 31-testing.mdc)
4. @supervisor Validate security compliance
5. @code-reviewer Verify security compliance
```

**Example:**
```
@orchestrator Build authentication system with security-first approach.
```

**When to use:**
- Security-critical features
- Authentication/authorization
- Compliance requirements

---

### Template 3: Parallel Review

```
@orchestrator Review [FEATURE] with parallel analysis.

Parallel agents:
- @security-auditor: Security review (enforce 30-security.mdc)
- @perf-optimizer: Performance analysis (enforce 33-performance.mdc)
- @code-reviewer: Code quality review (enforce 20-agents.mdc)

Aggregate results at end.
@supervisor Validate all parallel outputs.
```

**Example:**
```
@orchestrator Review payment handler with parallel analysis from security, performance, and code quality perspectives.
```

**When to use:**
- Comprehensive reviews
- Multi-perspective analysis
- Quality assurance

**Note:** Parallel execution is semantic - orchestrator asks multiple agents for views in one structured answer. User passes Context Block to each agent manually.

---

### Template 4: Parallel Audit

```
@orchestrator Audit [MODULE] with parallel security and performance review.

Parallel agents:
- @security-auditor: Security audit (enforce 30-security.mdc)
- @perf-optimizer: Performance audit (enforce 33-performance.mdc)

@supervisor Aggregate and validate results.
```

**Example:**
```
@orchestrator Audit payment module with parallel security and performance review.
```

**When to use:**
- Security audits
- Performance audits
- Compliance audits

**Note:** Parallel execution is semantic - orchestrator aggregates multiple perspectives into unified output.

---

### Template 5: Parallel Validation Suite

```
@orchestrator Validate [FEATURE] with parallel checks.

Parallel agents:
- @supervisor: Quality gates (enforce all Phase 0 rules)
- @code-reviewer: Standards compliance (enforce 20-agents.mdc)
- @test-engineer: Test coverage (enforce 31-testing.mdc)

Aggregate into comprehensive validation report.
```

**Example:**
```
@orchestrator Validate payment feature with parallel quality gates, standards compliance, and test coverage checks.
```

**When to use:**
- Pre-merge validation
- Release validation
- Quality assurance

**Note:** Parallel execution enables multiple validation checks on same output simultaneously.

---

## 👁️ @supervisor Templates

### Template 1: Validate Multi-Agent Workflow

```
@supervisor Validate all agent outputs in the [WORKFLOW_NAME] workflow.

Quality gates:
- Architecture compliance (36-architecture.mdc)
- Security standards (30-security.mdc)
- Test coverage (31-testing.mdc)
- Code quality (20-agents.mdc)
```

**Example:**
```
@supervisor Validate all agent outputs in the end-to-end payment feature development workflow.
```

**When to use:**
- After multi-agent workflows
- Quality assurance
- Compliance validation

---

### Template 2: Validate Specific Output

```
@supervisor Validate [AGENT] output for [FEATURE].

Check:
- Architecture compliance
- Security standards
- Test coverage
- Code quality
```

**Example:**
```
@supervisor Validate @architect output for payment processing context.
```

**When to use:**
- Single agent output validation
- Quality gate check
- Pre-merge validation

---

### Template 3: Monitor Refactoring Workflow

```
@supervisor Monitor the refactoring workflow for [MODULE] and ensure no regressions.

Validate:
- Behavior preserved
- Architecture compliance maintained
- Tests pass
- No performance regressions
```

**Example:**
```
@supervisor Monitor the refactoring workflow for UserService and ensure no regressions.
```

**When to use:**
- Refactoring projects
- Legacy modernization
- Technical debt reduction

---

## 🔗 Agent Delegation Examples

**Note:** Delegation uses Context Blocks for easy handoff. You (the user) manually copy the Context Block and pass it to the next agent in Cursor.

### Example 1: Architect Delegates to API Designer

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

---

### Example 2: Security Auditor Delegates to Test Engineer

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

---

### Example 3: Refactorer Delegates to Multiple Agents

```
@refactorer Refactor UserService following SRP. After refactor, delegate to @test-engineer for tests and @code-reviewer for compliance check.
```

**Context Passed:**
- Refactoring plan
- Changes made
- Behavior preserved

**Expected Output:**
- @refactorer: Refactored code with Context Block
- User copies Context Block and passes to @test-engineer and @code-reviewer
- @test-engineer: Characterization tests
- @code-reviewer: Compliance validation

---

### Example 4: Code Reviewer Delegates Conditionally

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
- @security-auditor: Security fixes (if issues found)
- @perf-optimizer: Performance fixes (if issues found)

---

### Example 5: Orchestrator Delegates to Multiple Agents

```
@orchestrator Build payment feature. Delegate to @architect for design, then @api-designer for API, then @security-auditor for security.
```

**Context Passed:**
- Full workflow context
- Previous agent outputs
- Quality gates

**Expected Output:**
- @orchestrator: Workflow plan with Context Blocks
- User passes Context Blocks sequentially to each agent
- @architect: Architecture design
- @api-designer: API contract
- @security-auditor: Security review
- Aggregated results

---

## 📊 Delegation Capability Matrix Reference

See `.cursor/rules/21-orchestration.mdc` and `docs/multi-agent/delegation-matrix.md` for the complete delegation capability matrix showing:
- Which agents can delegate to which other agents
- Purpose of each delegation
- When to use each delegation pattern
- Delegation constraints and rules

---

## 🔗 Agent Delegation Examples

**Note:** Delegation uses Context Blocks for easy handoff. You (the user) manually copy the Context Block and pass it to the next agent in Cursor.

### Example 1: Architect Delegates to API Designer

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

---

### Example 2: Security Auditor Delegates to Test Engineer

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

---

### Example 3: Refactorer Delegates to Multiple Agents

```
@refactorer Refactor UserService following SRP. After refactor, delegate to @test-engineer for tests and @code-reviewer for compliance check.
```

**Context Passed:**
- Refactoring plan
- Changes made
- Behavior preserved

**Expected Output:**
- @refactorer: Refactored code with Context Block
- User copies Context Block and passes to @test-engineer and @code-reviewer
- @test-engineer: Characterization tests
- @code-reviewer: Compliance validation

---

### Example 4: Code Reviewer Delegates Conditionally

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
- @security-auditor: Security fixes (if issues found)
- @perf-optimizer: Performance fixes (if issues found)

---

### Example 5: Orchestrator Delegates to Multiple Agents

```
@orchestrator Build payment feature. Delegate to @architect for design, then @api-designer for API, then @security-auditor for security.
```

**Context Passed:**
- Full workflow context
- Previous agent outputs
- Quality gates

**Expected Output:**
- @orchestrator: Workflow plan with Context Blocks
- User passes Context Blocks sequentially to each agent
- @architect: Architecture design
- @api-designer: API contract
- @security-auditor: Security review
- Aggregated results

---

## 📊 Delegation Capability Matrix Reference

See `.cursor/rules/21-orchestration.mdc` and `docs/multi-agent/delegation-matrix.md` for the complete delegation capability matrix showing:
- Which agents can delegate to which other agents
- Purpose of each delegation
- When to use each delegation pattern
- Delegation constraints and rules

---

## 🔀 Conditional Execution Templates

**Note:** Conditional execution means describing branches, but user controls execution. Orchestrator presents conditional plan, user approves, then execution proceeds.

### Template 1: Conditional Security Fix

```
@orchestrator Review [FEATURE]. If security issues found, delegate to @security-auditor for fixes.

Workflow:
1. @code-reviewer reviews code
2. (conditional) If security issues found → @security-auditor fixes
3. @supervisor validates all outputs
```

**Example:**
```
@orchestrator Review payment handler. If security issues found, delegate to @security-auditor for fixes.
```

**When to use:**
- Code reviews with potential security issues
- Conditional security fixes
- Security-first workflows

**Note:** User must approve conditional branch before execution.

---

### Template 2: Conditional Performance Optimization

```
@orchestrator Review [FEATURE]. If performance issues found (p95 > 200ms), delegate to @perf-optimizer.

Workflow:
1. @perf-optimizer analyzes performance
2. (conditional) If p95 latency > 200ms → @perf-optimizer optimizes
3. @supervisor validates optimizations
```

**Example:**
```
@orchestrator Review payment feature. If performance issues found (p95 > 200ms), delegate to @perf-optimizer.
```

**When to use:**
- Performance reviews with conditional optimization
- Metric-based conditional workflows
- Performance-first workflows

**Note:** Conditions must be explicit and measurable (e.g., p95 > 200ms).

---

### Template 3: Conditional Refactoring

```
@orchestrator Review [MODULE]. If architecture violations found, delegate to @refactorer for refactoring.

Workflow:
1. @supervisor validates architecture compliance
2. (conditional) If architecture violations found → @refactorer refactors
3. @supervisor validates all changes
```

**Example:**
```
@orchestrator Review payment module. If architecture violations found, delegate to @refactorer for refactoring.
```

**When to use:**
- Compliance reviews with conditional refactoring
- Architecture-first workflows
- Technical debt reduction

**Note:** Supervisor validates compliance before conditional branch.

---

### Template 4: Multi-Conditional Workflow

```
@orchestrator Review [FEATURE] with conditional fixes:
- @code-reviewer reviews code
- (conditional) If security issues found → @security-auditor fixes
- (conditional) If performance issues found → @perf-optimizer fixes
- (conditional) If architecture violations found → @refactorer refactors
- @supervisor validates all outputs
```

**Example:**
```
@orchestrator Review payment feature with conditional fixes for security, performance, and architecture issues.
```

**When to use:**
- Comprehensive reviews with multiple conditional branches
- Multi-perspective conditional workflows
- Quality assurance workflows

**Note:** Maximum 3-4 conditional branches to avoid complexity.

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

## Research Agent Templates

### Template 1: Best Practices Research

```
@researcher Research best practices for [TOPIC] in [LANGUAGE/FRAMEWORK].

Research Focus:
- Current industry standards (last 12-24 months)
- Recommended patterns aligned with Clean Architecture + DDD
- Common pitfalls and anti-patterns
- Performance considerations
- Security implications

Sources:
- Official documentation (priority)
- Industry standards (OWASP, Clean Architecture, DDD)
- Recent Stack Overflow/GitHub discussions
- Vendor documentation

Validation:
- Align with 36-architecture.mdc (Clean/Hex/DDD)
- Align with 44-ddd.mdc (bounded contexts, domain purity)
- Align with 50-lang-*.mdc (language-specific rules)
- Ensure recommendations are actionable

Output Format:
- Executive Summary (2-3 bullets)
- Detailed Findings
- Sources (URLs + dates)
- Recommendations
- Validation against Phase 0 rules
```

**Example:**
```
@researcher Research best practices for implementing CQRS in TypeScript following Clean Architecture.
```

**When to use:**
- Exploring new patterns or technologies
- Validating approach against industry standards
- Finding implementation examples aligned with architecture doctrine

---

### Template 2: Security Research

```
@researcher Research [SECURITY_TOPIC] including latest updates and best practices.

Research Focus:
- Latest vulnerabilities (last 6-12 months)
- Mitigation strategies
- Framework-specific guidance
- Compliance requirements
- OWASP Top 10 alignment

Sources:
- OWASP official documentation
- CVE databases
- Framework security guides
- Industry security standards

Validation:
- Align with 30-security.mdc (OWASP Top 10, defense-in-depth)
- Align with 36-architecture.mdc (security boundaries, Tier H contexts)
- Ensure recommendations are actionable

Output Format:
- Executive Summary (2-3 bullets)
- Detailed Findings
- Sources (URLs + dates)
- Recommendations
- Validation against 30-security.mdc and 36-architecture.mdc
```

**Example:**
```
@researcher Research OWASP Top 10 2024 updates and validate against 30-security.mdc.
```

**When to use:**
- Security vulnerability research
- Framework security updates
- Compliance requirement research
- Security pattern validation

---

### Template 3: Technology Research

```
@researcher Research [TECHNOLOGY] including features, limitations, and integration patterns.

Research Focus:
- Core features and capabilities
- Use cases and when to use
- Integration patterns with Clean Architecture
- Limitations and trade-offs
- Performance characteristics

Sources:
- Official documentation
- Industry best practices
- GitHub discussions
- Vendor documentation

Validation:
- Align with 36-architecture.mdc (ports/adapters, bounded contexts)
- Align with 44-ddd.mdc (domain purity, context boundaries)
- Ensure integration respects architecture doctrine

Output Format:
- Executive Summary (2-3 bullets)
- Detailed Findings
- Sources (URLs + dates)
- Recommendations
- Validation against Phase 0 rules
```

**Example:**
```
@researcher Research Event Sourcing patterns and validate integration with Clean Architecture + DDD.
```

**When to use:**
- Technology evaluation
- Integration pattern research
- Architecture pattern validation
- Technology comparison

---

### Template 4: Architecture Pattern Research

```
@researcher Research [ARCHITECTURE_PATTERN] and validate against Aegis Codex architecture doctrine.

Research Focus:
- Pattern definition and principles
- Implementation examples
- Alignment with Clean Architecture + Hexagonal + DDD
- Integration with bounded contexts
- Trust tier considerations

Sources:
- Architecture pattern documentation
- Industry best practices
- Implementation examples

Validation:
- Must align with 36-architecture.mdc
- Must align with 44-ddd.mdc
- Must respect trust tiers (H/M/S)
- Must support ports/adapters pattern

Output Format:
- Executive Summary (2-3 bullets)
- Detailed Findings
- Sources (URLs + dates)
- Recommendations
- Validation against 36-architecture.mdc and 44-ddd.mdc
```

**Example:**
```
@researcher Research Saga pattern and validate against Aegis Codex architecture doctrine.
```

**When to use:**
- Architecture pattern evaluation
- Pattern integration with existing architecture
- Pattern validation against Phase 0 rules

---

### Template 5: Research with Delegation

```
@researcher Research [TOPIC] and delegate to appropriate agent for implementation.

Research Focus:
- [TOPIC] best practices
- Alignment with Phase 0 rules

After research:
- Delegate to @architect (if architecture design needed)
- Delegate to @security-auditor (if security validation needed)
- Delegate to @api-designer (if API design needed)
- Delegate to @supervisor (for validation)
```

**Example:**
```
@researcher Research CQRS implementation patterns in TypeScript. After research, delegate to @architect for architecture design.
```

**When to use:**
- Research followed by implementation
- Multi-step workflows starting with research
- Research-driven design decisions

---

## 📖 See Also

- `docs/USAGE.md` — Complete usage guide
- `docs/agent-prompts.md` — Example prompts (legacy)
- `.cursor/rules/20-agents.mdc` — Agent definitions
- `test/scenarios/` — Real-world test scenarios

---

**Last Updated:** 2024-11-24
**Version:** 1.0.0

