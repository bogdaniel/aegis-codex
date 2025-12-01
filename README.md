# Aegis Codex — Enterprise AI Coding Ruleset

Aegis Codex is a **rules & governance catalog** for AI/LLM‑assisted software development. It encodes how to build and change serious systems (especially backend‑heavy, security‑sensitive ones) using:

- **Clean Architecture + Hexagonal ports/adapters** (`.cursor/rules/36-architecture.mdc`)
- **Domain‑Driven Design** (`.cursor/rules/44-ddd.mdc`) and bounded contexts with trust tiers
- **Security & threat modeling** (`.cursor/rules/30-security.mdc`, `.cursor/rules/30-threat-modeling.mdc`)
- **Change discipline & stable contracts** (`.cursor/rules/23-change-control.mdc`, `.cursor/rules/45-bugfix-protocol.mdc`, `.cursor/rules/46-regression-discipline.mdc`, `.cursor/rules/47-diff-discipline.mdc`, `.cursor/rules/48-doc-sync.mdc`, `.cursor/rules/35-api-lifecycle.mdc`)
- **Config/environments, feature flags & rollouts, observability/ops** (`.cursor/rules/3E-config-environments.mdc`, `.cursor/rules/3F-feature-flags-rollouts.mdc`, `.cursor/rules/32-observability.mdc`, `.cursor/rules/3D-operations.mdc`, `.cursor/rules/3B-data-persistence.mdc`)
- **AI governance & multi‑agent workflows** (`.cursor/rules/00-persona.mdc`, `.cursor/rules/10-global.mdc`, `.cursor/rules/11-meta-map.mdc`, `.cursor/rules/20-agents.mdc`, `.cursor/rules/21-orchestration.mdc`, `.cursor/rules/3G-risk-overrides.mdc`)

You do **not** restate these standards in your prompts. Instead, the agents and rule files (`rules/*.mdc` exported to `.cursor/rules/*.mdc`) act as the “policy brain” so you can focus on the task (“build X”, “review Y”, “add tests for Z”).

## Layout
- `rules/*.mdc` — Canonical machine‑readable rules for Aegis Codex (architecture, security, change‑discipline, data, config/env, flags, observability, agents, etc.).
- `.cursor/rules/*.mdc` — Generated subset of rules for tools like Cursor; produced from `rules/*.mdc` via the [Rule Builder](#rule-builder) based on your project profile.
- `AGENTS.md` — Human‑readable aggregation of all rules, generated from `rules/*.mdc` (do not edit by hand; see [Rule Builder](#rule-builder) section).
- `docs/` — Human‑readable guides:
  - `docs/architecture/` — Architecture patterns, SOLID, core design principles (DRY/KISS/YAGNI/SoC), and design patterns. See `docs/architecture/patterns/` for per-pattern notes and navigation.
  - `docs/laravel-php-ai-guidelines.md` — Laravel/PHP AI assistant guidance derived from Spatie’s AI guidelines (mirrored in `.cursor/rules/50-lang-php-laravel-guidelines.mdc`).
  - `docs/security-standards.md` — Security baseline.
  - `docs/testing-standards.md` — Testing rules.
  - `docs/observability-standards.md` — Logging/metrics/tracing/health.
  - `docs/performance-standards.md` — Performance guidance.
  - `docs/ci-standards.md` — CI/CD pipeline expectations.
  - `docs/api-standards.md` — API design rules.
  - `docs/code-review-standards.md` — Code review guidance.
  - `docs/language-guides/` — Language‑specific standards.
- `examples/` — Small “before/after” and flow examples (optional; for humans).

**Editing note:** Modify `rules/**/*.mdc`, then run `node scripts/build-agents-doc.js --copy-rules` (or `--both`) to regenerate `.cursor/rules/` and `AGENTS.md`. Do not edit `.cursor/rules/` or `AGENTS.md` directly.

### Cursor rule load order (priority)
Rules are ordered by filename so persona/bootstrap runs first, then global/multi‑agent governance, topic standards, methodologies, and language rules. At a high level (see `.cursor/rules/11-meta-map.mdc` for details):

1. `00-persona.mdc` — AEONIC HYPERION persona and response modes
2. `10-global.mdc` — Global invariants and output contract
3. `11-meta-map.mdc` — Meta‑map of rule groups and precedence
4. `20-agents.mdc`, `21-orchestration.mdc`, `22-ai-assistants.mdc` — Agent roles, orchestration, AI governance
5. `23-change-control.mdc`, `30-3F*.mdc` — Security, testing, observability, performance, CI/CD, API, architecture, code‑structure, anti‑corruption, compliance, accessibility, data, config/env, feature flags/rollouts, operations
6. `40-44*.mdc` — Methodologies (ATDD, BDD, TDD, FDD, DDD)
7. `45-48*.mdc`, `3G-risk-overrides.mdc` — SOLID, bugfix protocol, regression discipline, diff discipline, doc‑sync, risk override protocol
8. `50-lang-*.mdc` — Language‑specific standards (TypeScript, PHP, HTML, CSS, JavaScript, Python, Go, Rust, etc.)

## Core Agents
- `@architect` — System and service architecture.
- `@security-auditor` — Security review and fixes.
- `@test-engineer` — Test design and generation.
- `@code-reviewer` — Code review and quality gate.
- `@perf-optimizer` — Performance profiling and optimization.
- `@api-designer` — REST/GraphQL API contracts.
- `@devops` — CI/CD and runtime configuration.
- `@refactorer` — Behavior‑preserving refactors.
- `@orchestrator` — Coordinate multiple agents for complex tasks (multi-agent).
- `@supervisor` — Monitor workflows, validate outputs, handle exceptions (multi-agent).
- `@researcher` — Gather data from external sources (APIs, databases, web).

Each agent has:
- Clear role and operating rules.
- Strict `[FORMAT]` section (single fenced block or "Format non-compliant").
- Outputs that always include at least one verification step (tests/checks/commands).

## Modes: Light, Standard, Full
- **LITE (default):** concise answers, ≤8 bullets, one best-practice path. Use for narrow tasks (e.g., “fix this handler”).
- **STANDARD:** adds Grounding Block + Plan + Validation. Use for design/debug tasks where context matters.
- **FULL:** includes MVE plan, ADR-1p, DONE checklist. Use for higher-risk work (auth/PII/contracts) or when changing behavior broadly.
- Trigger a mode by asking for it: `Use FULL mode for this auth change` or `Respond in STANDARD mode for design review`.

## Quick Tutorial (Cursor or similar)
1. Place this repo’s `rules/`, `AGENTS.md`, and `docs/` content at the root of your project (or export rules into your project via the Rule Builder so that `rules/*.mdc` and `.cursor/rules/*.mdc` are present).
2. Open the project in Cursor; it will automatically pick up `.cursor/rules/*.mdc` and `AGENTS.md`.
3. Pick the right mode (LITE/ STANDARD/ FULL) based on risk; default is LITE.
4. In chat, invoke an agent by role with a short task. For example:
   - `Act as the @code-reviewer. Review this diff and fix anything blocking.`
   - `Act as the @security-auditor. Audit this handler and apply fixes.`
   - `Act as the @test-engineer. Add tests for this function.`
5. The rules auto-apply security/testing/observability/performance/CI/API standards and enforce single-block outputs plus verification commands.

## Multi-Agent Tutorial

Aegis Codex supports **multi-agent workflows** where agents coordinate to complete complex tasks. Use `@orchestrator` to manage workflows and `@supervisor` to validate outputs.

### Basic Multi-Agent Workflow

**Example: Build a complete feature end-to-end**

```
@orchestrator Build a complete payment feature with architecture, API, security, tests, and CI/CD.
```

The orchestrator will:
1. Break down the task into sub-tasks
2. Invoke agents in sequence: `@architect` → `@api-designer` → `@security-auditor` → `@test-engineer` → `@devops`
3. Format context as **Context Blocks** for easy handoff between agents
4. Aggregate results into a unified output

**Note:** Context passing is **manual** — the orchestrator formats context as a Context Block, and you copy/paste it to the next agent in Cursor. This is a convention, not automatic.

### Parallel Execution

Get multiple perspectives on the same artifact simultaneously:

```
@orchestrator Review payment feature with parallel analysis:
- @security-auditor: Security perspective
- @perf-optimizer: Performance perspective
- @code-reviewer: Code quality perspective
```

**Note:** "Parallel" is semantic — the orchestrator asks multiple agents for views in one structured answer. Nothing guarantees real concurrency; it's a convention for aggregating perspectives.

### Conditional Workflows

Handle different scenarios with conditional execution:

```
@orchestrator Review payment feature. If security issues found, delegate to @security-auditor for fixes. If performance issues found, delegate to @perf-optimizer for optimization.
```

The orchestrator describes branches, but **you control execution** — you approve which conditional paths to execute.

### Supervisor Validation

Use `@supervisor` to validate all agent outputs meet quality gates:

```
@supervisor Validate all agent outputs in the end-to-end payment feature development workflow.
```

The supervisor checks:
- Architecture compliance (Clean/Hex/DDD)
- Security standards (OWASP Top 10)
- Test coverage (≥80% for critical paths)
- Performance targets
- Code quality (SOLID, readability)
- Language compliance (path aliases, layering)

### Agent Delegation

Agents can delegate to other agents:

```
@architect Design payment context. After design, delegate to @api-designer for API design and @security-auditor for security review.
```

**Context Passing:** The delegating agent formats context as a Context Block. You manually copy it and pass it to the delegated agent in Cursor.

### Common Multi-Agent Patterns

**End-to-End Feature Development:**
```
@orchestrator Build [FEATURE] with architecture, API, security, tests, and CI/CD.
```

**Security-First Development:**
```
@orchestrator Build [FEATURE] with security-first approach.
```

**Parallel Review:**
```
@orchestrator Review [FEATURE] with parallel @security-auditor, @perf-optimizer, @code-reviewer.
```

**Refactoring Workflow:**
```
@orchestrator Refactor [LEGACY_MODULE] following Clean Architecture.
```

### Learn More

- **Full Documentation:** See `docs/multi-agent/overview.md` for comprehensive multi-agent usage guide
- **Templates:** See `docs/agent-prompts/templates.md` for 30+ reusable prompt templates
- **Test Scenarios:** See `tests/multi-agent/` for validation scenarios
- **Delegation Matrix:** See `docs/multi-agent/delegation-matrix.md` for which agents can delegate to which

## Using With Other Tools
For tools that can’t read `.cursor/rules` directly:
- Load or copy the relevant sections from `AGENTS.md` and `docs/*.md` into the tool’s “system” / “rules” area.
- Keep your user prompts short and task‑oriented; avoid duplicating rules.

## Rule Builder

Aegis Codex includes a **rule builder** that lets you select only the rules relevant to your project, preventing bloat from unrelated content. The builder reads from the canonical `rules/` directory and generates a filtered set of rules in `.cursor/rules/` based on your configuration.

### Quick Start

**Option 1: Interactive Mode (Easiest)**

```bash
# Interactive prompts guide you through rule selection
# Choose output mode: --copy-rules (for Cursor IDE) or --generate-agents (for summary)
node scripts/build-agents-doc.js --interactive --copy-rules

# With cleanup (removes builder files after generation)
node scripts/build-agents-doc.js --interactive --copy-rules --cleanup
```

**Option 2: Use Example Config**

1. **Choose an example config** that matches your project:
   ```bash
   # For TypeScript backend
   cp docs/.aegis-rules.example-typescript-backend.json .aegis-rules.json
   
   # For PHP/Laravel
   cp docs/.aegis-rules.example-php-laravel.json .aegis-rules.json
   
   # For full-stack TypeScript/JavaScript/HTML/CSS
   cp docs/.aegis-rules.example-full-stack.json .aegis-rules.json
   
   # For minimal TypeScript-only
   cp docs/.aegis-rules.example-minimal.json .aegis-rules.json
   ```

2. **Choose output mode** (important: choose one to avoid loading both in Cursor IDE):
   ```bash
   # For Cursor IDE: Copy rules to .cursor/rules/ (recommended)
   node scripts/build-agents-doc.js --config .aegis-rules.json --copy-rules
   
   # For human-readable summary: Generate AGENTS.md only
   node scripts/build-agents-doc.js --config .aegis-rules.json --generate-agents
   
   # Generate both (not recommended - Cursor IDE will load .cursor/rules/ automatically)
   node scripts/build-agents-doc.js --config .aegis-rules.json --both
   ```

3. **Clean up repository** (remove builder files after generation):
   ```bash
   # Generate rules and clean up in one command
   node scripts/build-agents-doc.js --config .aegis-rules.json --copy-rules --cleanup
   ```

4. **Preview what will be included** (dry run):
   ```bash
   node scripts/build-agents-doc.js --config .aegis-rules.json --copy-rules --cleanup --dry-run
   ```

### Configuration Options

The rule builder supports selecting:
- **Mandatory rules** (always included): Persona, global invariants, agents, security, testing, observability, CI, architecture, DDD, SOLID, anti-patterns
- **Optional topics**: Performance, API design, accessibility, extended observability-security
- **Methodologies**: ATDD, BDD, TDD, FDD
- **Languages**: TypeScript, JavaScript, PHP, Python, Go, Rust, Java, C#, HTML, CSS, GDScript
- **Patterns**: Architectural-enterprise, behavioural, creational, structural (all or specific patterns)

### Example Configurations

See `docs/.aegis-rules.example-*.json` files for:
- **Minimal**: TypeScript-only with mandatory rules
- **TypeScript Backend**: TypeScript + all topics + methodologies + all patterns
- **Full Stack**: TypeScript, JavaScript, HTML, CSS + all topics
- **PHP Laravel**: PHP + Laravel guidelines + all topics
- **Java Spring**: Java + all topics + patterns
- **C# .NET**: C# + all topics + patterns
- **Backend Only**: All backend languages (no frontend)
- **Patterns Specific**: TypeScript with only specific architectural patterns

### Backward Compatibility

The builder supports the legacy `--langs` flag:
```bash
# Include TypeScript and PHP rules
node scripts/build-agents-doc.js --langs typescript,php --both
```

### Custom Configuration

Create your own `.aegis-rules.json`:
```json
{
  "version": "1.0.0",
  "optional": {
    "topics": {
      "performance": true,
      "api": true,
      "accessibility": false,
      "observability-security": false
    },
    "methodologies": {
      "atdd": true,
      "bdd": false,
      "tdd": true,
      "fdd": false
    },
    "languages": {
      "typescript": true,
      "php": false
    },
    "patterns": {
      "enabled": true,
      "categories": {
        "architectural-enterprise": true,
        "behavioural": false,
        "creational": false,
        "structural": false
      },
      "specific": ["layered-architecture", "aggregate", "value-object"]
    }
  }
}
```

See `docs/rule-builder-config-examples.md` for detailed configuration documentation.

### Testing

Run the test script to validate the rule builder:
```bash
./scripts/test-rule-builder.sh
```

See `docs/rule-builder-testing.md` for comprehensive testing guide.

## Extending the System
- To add a new language: create `docs/language-guides/<lang>.md` and a matching `rules/50-lang-<lang>.mdc` file with globs and MUST/NEVER lists. Then regenerate `.cursor/rules/` and `AGENTS.md` using the rule builder.
- To add a new agent: edit `rules/20-agents.mdc` with role, operating rules, and `[FORMAT]`; optionally add usage in `docs/agent-prompts.md`; then regenerate `.cursor/rules/` and `AGENTS.md` using the rule builder.
- To tighten behavior: adjust the relevant `rules/*.mdc` section; prefer "fail‑closed" patterns (e.g., respond with `Format non-compliant` when format can't be honored), then regenerate `.cursor/rules/` and `AGENTS.md` using the rule builder.

## Quickstart with Cursor
1) Clone/open this repo in Cursor.
2) **Generate rules for your project** (see [Rule Builder](#rule-builder) section):
   ```bash
   cp docs/.aegis-rules.example-typescript-backend.json .aegis-rules.json
   node scripts/build-agents-doc.js --config .aegis-rules.json --both
   ```
   This creates `.cursor/rules/` and `AGENTS.md` at the project root.
3) Use an agent prompt, e.g.: `Act as the @code-reviewer. Review this diff.` or `Act as the @security-auditor. Audit src/handler.ts`.
4) Standards load automatically from `.cursor/rules/*.mdc` and `AGENTS.md`. Keep prompts short; the rules enforce security, testing, observability, and formatting.

### Starter Demo Prompt
Ask any agent to spin up a tiny sample to see the rules in action. Example (LITE mode):
```
Act as the @architect. In LITE mode, sketch a minimal TypeScript Express service exposing GET /health and GET /users/:id with validation, logging, and tests outlined.
```
Then follow up with `@security-auditor`, `@test-engineer`, and `@devops` to see the standards across the flow.

### Laravel & Spatie AI Guidelines
For PHP/Laravel work, this pack integrates Spatie’s AI guidelines directly into the Cursor rules (`.cursor/rules/50-lang-php-laravel-guidelines.mdc`) and the human guide (`docs/laravel-php-ai-guidelines.md`). Follow Laravel conventions first, then these additions to keep AI output aligned with Spatie’s standards.

### Tutorial Prompts
#### Prompt 1 — Marketing Website Layout (HTML/CSS only)
- Build a small, production-ready HTML + CSS layout for a single-page marketing website for a SaaS product called “Aegis Codex”.
- Requirements:
  - A clean hero section with headline, subheadline, primary CTA button, and a short code-like snippet area.
  - A 3–4 column features section.
  - A “How it works” section with a simple step-by-step layout.
  - A pricing section with 2–3 plans.
  - A footer with navigation and contact links.
- Constraints:
  - No JS, no frameworks; just semantic HTML5 and modern CSS (flex/grid).
  - Make the layout responsive (mobile → desktop).
  - Use reasonable class names and structure so it would be easy to integrate into a larger app later.
- Deliver:
  - A single HTML file (with embedded CSS in a <style> block) that I can drop into a browser and it “just works”.
  - A short explanation (2–3 paragraphs max) of how you structured the layout and why.

What this tests:
- Semantic structure, naming, separation of concerns, no unnecessary complexity.
- Does it explain structure and decisions (architect mindset) without being asked?

#### Prompt 2 — HTML/JS Game (Logic vs Rendering, No Frameworks)
- Build a simple browser game called “Orb Dodger” using HTML, CSS, and vanilla JavaScript.
- Game idea:
  - Player controls a small square or circle at the bottom of the screen (move left/right with keyboard arrows or A/D).
  - “Orbs” fall from the top; the player must dodge them.
  - Score increases over time while the player is alive.
  - When hit, game shows “Game Over” and final score, with a “Play Again” button.
- Constraints:
  - No external libraries; plain JS and DOM APIs.
  - Keep game logic and rendering reasonably separated so it would be easy to test or extend later (e.g., difficulty scaling).
  - Avoid giant “god functions”; keep functions small and focused.
- Deliver:
  - A single HTML file with embedded CSS and JS (or a small set of files if you prefer, but keep it minimal).
  - Briefly describe how you separated game state/logic from rendering and event handling.

What this tests:
- Separation of concerns, small units, clarity of structure.
- Whether it introduces some testable core logic (even if you didn’t ask explicitly for tests).

#### Prompt 3 — Small REST API (Validation & Security Temptation)
- Build a small TypeScript + Node.js REST API (Express or a lightweight alternative) for managing “Code Review Comments”.
- API operations:
  - POST /comments: create a comment with { filePath, lineNumber, severity, message }.
  - GET /comments: list all comments, with optional ?severity= filter.
  - DELETE /comments/:id: delete a comment by id.
- Constraints:
  - Use in-memory storage for now (no real database).
  - Validate incoming payloads and handle bad input with proper HTTP status codes.
  - Organize the code so that HTTP layer, validation, and core “comment service” logic are clearly separated.
  - You don’t need to write tests for now; just focus on getting the API working.
- Deliver:
  - TypeScript code for the server (including package.json scripts if needed) that I can run locally.
  - A short explanation of the structure (which files/layers do what) and any tradeoffs you made.

What this tests:
- Whether it ignores “no tests” and pushes back / adds tests anyway (TDD/ATDD rules).
- Validation, status codes, separation of HTTP from domain logic.
- Possible introduction of something like a service layer or simple pattern usage.

#### Prompt 4 — CQRS-Style “Tasks” Service (Patterns & Architecture)
- Design and implement a small Node.js or TypeScript service for managing tasks using a light CQRS-style structure.
- Requirements:
  - Commands:
    - CreateTask(title, description)
    - CompleteTask(taskId)
  - Queries:
    - GetTaskById(taskId)
    - ListOpenTasks()
  - Use an in-memory data store (e.g., maps/arrays) for now.
  - Use a minimal HTTP API or CLI interface — your choice — but keep the internal design clean and testable.
- Constraints:
  - Separate command handling from query handling in the code structure (even though storage is in-memory).
  - Keep domain logic independent of the I/O mechanism (HTTP/CLI).
  - Include at least a couple of tests that show how this design is meant to be used and evolved.
- Deliver:
  - Source code with clear modules for commands, queries, and the domain model.
  - A minimal interface (HTTP endpoints or CLI commands) to exercise the system.
  - A small test suite (unit or integration) that demonstrates how to verify behavior.
  - A short explanation of why you chose this structure.

What this tests:
- Does it apply CQRS sensibly, or overcomplicate?
- Architecture boundaries, domain vs I/O, testing.
- Use (or not) of patterns like Repository/Service, etc.

#### Prompt 5 — Event-Driven Workflow (Resilience & Patterns)
- Implement a simplified event-driven workflow in TypeScript or your preferred backend language to process “Code Quality Reports”.
- Scenario:
  - A “scanner” component produces events like CodeScanCompleted { repoId, commitId, issues: [...] }.
  - A “processor” component consumes those events, aggregates some stats (e.g., counts by severity), and stores them in an in-memory projection.
  - A “query” component exposes an HTTP endpoint /quality/:repoId to retrieve the latest stats for a repository.
- Constraints:
  - Use an in-memory message bus or simple queue abstraction; no external broker required.
  - Design for resilience: think about what happens if processing fails (e.g., invalid event payload).
  - Keep event contracts explicit and separate from internal models where appropriate.
  - Include some tests that show the end-to-end flow from event → processing → query.
- Deliver:
  - Source code organized into components (scanner, processor, query/API, message bus abstraction).
  - A couple of tests that simulate events being published and verify the resulting projections.
  - A short explanation of how you modeled events and what trade-offs you made.

What this tests:
- Event-driven architecture, domain events, projections.
- Error handling, resilience thinking.
- Boundaries & patterns (Domain Event, Projection, maybe Outbox/Saga-lite thinking).

## Status (v0.1 scope)
- **Tier 1 (fully enforced, examples present):** TypeScript, PHP.
- **Tier 2 (solid baseline, fewer examples):** Rust, Go, Python.
- **Tier 3 (light guidance, evolving):** CSS, HTML, Dart, GDScript.

## Examples
See `examples/` for:
- “Before/after” service handlers.
- Sample prompts you can reuse to exercise the agents end‑to‑end.

You can safely treat this repository as a **policy/agent layer** that you drop into real projects to upgrade AI‑assisted development to enterprise standards.***
