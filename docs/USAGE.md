# Aegis Codex Usage Guide

## Overview

This guide explains how to use Aegis Codex `.cursor/rules` and specialized agents in your daily development workflow.

**Two Audiences:**
- **Developers:** How to use rules and agents in daily work
- **Architects:** How to extend rules for new contexts/languages

---

## For Developers

### Getting Started

1. **Rules are automatically loaded** by Cursor when you open the workspace.
2. **Agents are invoked** using `@agent-name` syntax (e.g., `@architect`, `@code-reviewer`).
3. **Rules apply automatically** to code you write or edit (based on file globs).

### Using Agents

#### @architect
**When to use:** Designing new features, reviewing architecture, making design decisions.

**Example:**
```
@architect Design a new payment processing context following Clean Architecture and DDD patterns. It should integrate with IdentityContext for user authentication.
```

**What you get:**
- Architecture shape and component responsibilities
- Design choices with rollback/reversibility
- Verification checklist

#### @code-reviewer
**When to use:** Reviewing PRs, checking code quality, ensuring standards compliance.

**Example:**
```
@code-reviewer Review this PR for architecture compliance and code quality issues.
```

**What you get:**
- Quality score and blocking issues
- Corrected code block if fixes needed
- Explicit callouts of deviations from standards

#### @security-auditor
**When to use:** Security reviews, vulnerability assessments, OWASP compliance checks.

**Example:**
```
@security-auditor Audit this authentication code for OWASP Top 10 vulnerabilities.
```

**What you get:**
- Risk rating
- Findings with file/line
- Exact fixes

#### @test-engineer
**When to use:** Writing tests, improving coverage, ensuring test quality.

**Example:**
```
@test-engineer Generate unit tests for this RegisterUser use case with coverage of happy path, edge cases, and error scenarios.
```

**What you get:**
- Test code with fixtures/mocking strategy
- Commands to run tests
- Minimal passing assertion outline

#### @refactorer
**When to use:** Modernizing legacy code, reducing complexity, improving maintainability.

**Example:**
```
@refactorer Refactor this controller to follow Clean Architecture - extract business logic to Application use cases.
```

**What you get:**
- Current issues identified
- 2-4 step refactor plan with safety rails
- Before/after sketch
- Rollback trigger/path

#### @perf-optimizer
**When to use:** Performance issues, optimization opportunities, profiling results.

**Example:**
```
@perf-optimizer This endpoint has high latency. Profile and optimize the hot path.
```

**What you get:**
- Baseline vs target metrics
- Bottlenecks with evidence
- Optimization plan

#### @orchestrator
**When to use:** Complex multi-step tasks requiring coordination of multiple agents.

**Example:**
```
@orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
```

**What you get:**
- Complete workflow execution plan
- Agent outputs aggregated
- Summary of all work completed

**Note:** The orchestrator formats context as Context Blocks for easy handoff between agents. You (the user) manually pass context to the next agent in Cursor.

#### @supervisor
**When to use:** Validating multi-agent workflows, ensuring quality gates are met.

**Example:**
```
@supervisor Validate all agent outputs in the security-first development workflow.
```

**What you get:**
- Validation report with pass/fail status
- Issues found with recommendations
- Quality gate compliance check
- Benchmark/load-test verification

#### @api-designer
**When to use:** Designing REST/GraphQL APIs, defining contracts.

**Example:**
```
@api-designer Design a REST API for order management with versioning, pagination, and error handling.
```

**What you get:**
- OpenAPI YAML or GraphQL SDL
- Schemas, validation, error model
- Auth, pagination, rate limiting

#### @devops
**When to use:** CI/CD pipelines, deployment configs, observability setup.

**Example:**
```
@devops Create a CI/CD pipeline for this TypeScript service with lint, test, security scans, and deployment gates.
```

**What you get:**
- Pipeline config (YAML)
- Health/readiness checks
- Rollout + rollback strategy

### Understanding Rules

**Rule File Structure:**
- `00-persona.mdc` — Core persona and response modes
- `10-global.mdc` — Global invariants and output contract
- `20-agents.mdc` — Agent definitions
- `30-38*.mdc` — Topic standards (security, testing, observability, performance, CI, API, architecture)
- `40-44*.mdc` — Methodologies (ATDD, BDD, TDD, FDD, DDD)
- `50-lang-*.mdc` — Language-specific standards
- `patterns/` — Design pattern catalog

**Rule Application:**
- Rules with `alwaysApply: true` apply to all matching files (based on globs).
- Rules with `alwaysApply: false` are available but not automatically enforced (e.g., design patterns).

## Multi-Agent Usage

See `docs/multi-agent/overview.md` for comprehensive guide.

### Quick Start

```
@orchestrator Build a complete [FEATURE] with architecture, API, security, tests, and CI/CD.
```

### Key Agents

- **@orchestrator** — Coordinates multiple agents for complex tasks
- **@supervisor** — Validates outputs and ensures quality gates
- **@researcher** — Gathers data from external sources (APIs, databases, web)

### Workflow Patterns

- **Sequential:** Agents execute one by one, passing context
- **Parallel:** Semantic parallel execution - orchestrator asks multiple agents for views in one structured answer
- **Conditional:** Orchestrator describes branches, but user controls execution

### Context Passing

- Context is formatted as Context Blocks for easy handoff
- You (the user) manually copy the Context Block and pass it to the next agent in Cursor
- This is a convention, not automatic

### Templates

See `docs/agent-prompts/templates.md` for complete templates including:
- Orchestrator templates (End-to-End Feature Development, Security-First, Parallel Review)
- Supervisor templates (Validate Multi-Agent Workflow, Validate Specific Output)
- Delegation examples
- Conditional execution templates

### Test Scenarios

See `tests/multi-agent/` for test scenarios validating multi-agent workflows.

---

### Common Workflows

#### Adding a New Feature
1. **Design:** Use `@architect` to design the feature following Clean Architecture/DDD.
2. **Implement:** Write code following language-specific rules (`50-lang-*.mdc`).
3. **Test:** Use `@test-engineer` to generate tests.
4. **Review:** Use `@code-reviewer` to check compliance.
5. **Deploy:** Use `@devops` to set up CI/CD if needed.

#### Refactoring Legacy Code
1. **Analyze:** Use `@refactorer` to identify issues and create a plan.
2. **Test:** Ensure existing tests pass (or add characterization tests).
3. **Refactor:** Follow the plan, maintaining behavior.
4. **Verify:** Run tests and use `@code-reviewer` to check compliance.

#### Security Review
1. **Audit:** Use `@security-auditor` to scan for vulnerabilities.
2. **Fix:** Apply recommended fixes.
3. **Verify:** Re-run audit to confirm fixes.

---

## For Architects

### Extending Rules

#### Adding a New Language Guide

1. **Create file:** `.cursor/rules/50-lang-{language}.mdc`
2. **Follow structure:**
   - Stack/version requirements
   - Style/lint configuration
   - Architecture integration (Clean/Hex/DDD enforcement)
   - Security & data safety
   - Performance & scalability
   - Testing & tooling
   - Anti-patterns
   - Verification commands

3. **Enforce architecture:**
   - Domain/Application must be framework-free
   - Ports in Domain/Application, adapters in Infrastructure
   - Controllers are thin (delegate to Application use cases)
   - Cross-context via public API modules

4. **Update:** Regenerate `AGENTS.md` by running `node scripts/build-agents-doc.js`

#### Adding a New Pattern

1. **Create file:** `.cursor/rules/patterns/{category}/{pattern-name}.mdc`
2. **Follow structure:**
   - Intent (what problem it solves)
   - When to use
   - When not to use
   - Actions for agents

3. **Update:** `patterns/60-patterns-overview.mdc` if needed

#### Adding a New Agent

1. **Update:** `.cursor/rules/20-agents.mdc`
2. **Define:**
   - Role
   - Deliverables
   - Format requirements
   - Refusal behaviors (if applicable)

3. **Update:** Regenerate `AGENTS.md`

### Rule File Naming Convention

- `00-09`: Persona and global rules
- `10-19`: Global invariants
- `20-29`: Agents
- `30-39`: Topic standards (security, testing, observability, performance, CI, API, architecture, code structure, anti-corruption, compliance, accessibility)
- `40-49`: Methodologies (ATDD, BDD, TDD, FDD, DDD, SOLID)
- `50-59`: Language-specific standards
- `60-69`: Pattern overviews
- `70-79`: Structural patterns
- `80-89`: Behavioral patterns
- `90-99`: Creational patterns
- `9A-9F`: Architectural/enterprise patterns

### Testing Prompts

**Test with real scenarios:**
1. Create a test scenario in `docs/test-scenarios.md`
2. Run the prompt through Cursor
3. Verify output matches expected format
4. Update rules if needed

**Example test scenario:**
```
Scenario: Design a new bounded context
Input: "@architect Design a PaymentContext that processes payments and integrates with IdentityContext for user validation."
Expected: Architecture shape with Domain/Application/Infrastructure/Interface layers, ports/adapters, trust tier assignment, cross-context integration via ACL.
```

### Version Control Strategy

**Rule files:**
- Commit rule changes with clear messages explaining the change
- Tag releases when major rule updates are made
- Document breaking changes in rule file headers

**Examples:**
- Keep examples in `examples/` directory
- Link examples from rule files
- Update examples when rules change

**Documentation:**
- Update `docs/USAGE.md` when adding new agents or workflows
- Update `docs/architecture/*.md` when architecture rules change
- Keep `AGENTS.md` in sync (regenerate after rule changes)

### Cross-Reference System

**Between rules:**
- Use explicit references: "See `.cursor/rules/36-architecture.mdc` for Clean Architecture details"
- Link to docs: "See `docs/architecture/design-principles.md` for foundational principles"
- Reference patterns: "See `patterns/structural/78-repository.mdc` for Repository pattern"

**From rules to examples:**
- Link to `examples/` directory: "See `examples/refactoring/srp-god-class/` for SRP refactoring examples"

**From docs to rules:**
- Reference rule files in documentation when explaining concepts

---

## Troubleshooting

### Rules Not Applying

1. **Check file globs:** Ensure your file matches the glob pattern in the rule file.
2. **Check `alwaysApply`:** Rules with `alwaysApply: false` must be explicitly invoked.
3. **Check rule order:** Rules are loaded by filename priority (00 → 10 → 20 → ...).

### Agent Not Responding Correctly

1. **Check agent definition:** Verify agent is defined in `20-agents.mdc`.
2. **Check format requirements:** Some agents have strict format requirements (single code block, etc.).
3. **Check refusal behaviors:** Agent may be refusing non-compliant requests (check persona rules).

### Conflicting Guidance

1. **Check rule priority:** Persona/global rules override topic-specific rules.
2. **Check architecture doctrine:** Architecture rules (36-architecture.mdc) are NON-NEGOTIABLE.
3. **Check language-specific rules:** Language rules (50-lang-*.mdc) may override general rules for that language.

---

## Quick Reference

### Agent Invocation
```
@orchestrator <complex multi-agent task>
@supervisor <validation request>
@researcher <research request>
@architect <design request>
@code-reviewer <review request>
@security-auditor <security review>
@test-engineer <test request>
@refactorer <refactor request>
@perf-optimizer <performance issue>
@api-designer <API design request>
@devops <CI/CD request>
```

**📚 For comprehensive prompt templates, see:**
- `docs/agent-prompts/templates.md` — Complete template library
- `docs/agent-prompts/best-practices.md` — Best practices guide
- `docs/agent-prompts/common-patterns.md` — Common patterns

### Key Rule Files
- Architecture: `.cursor/rules/36-architecture.mdc`
- Security: `.cursor/rules/30-security.mdc`
- Testing: `.cursor/rules/31-testing.mdc`
- TypeScript: `.cursor/rules/50-lang-typescript.mdc`
- PHP: `.cursor/rules/50-lang-php.mdc`
- Java: `.cursor/rules/50-lang-java.mdc`
- C#: `.cursor/rules/50-lang-csharp.mdc`

### Common Commands
- Regenerate agents doc: `node scripts/build-agents-doc.js`
- Run tests: Language-specific (see `50-lang-*.mdc`)
- Lint/format: Language-specific (see `50-lang-*.mdc`)

---

**Last Updated:** 2024-01-XX
**Version:** 1.0.0

