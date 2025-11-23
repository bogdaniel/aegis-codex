# Aegis Codex — Enterprise AI Coding Ruleset

This repository defines a rule- and agent-pack for AI coding assistants (Cursor, Aider, Continue, etc.) to generate **senior‑grade, production‑ready code** by default.

You do **not** restate standards in your prompts. Instead, the agents and `.cursor/rules` files inject them automatically so you can focus on the task (“build X”, “review Y”, “add tests for Z”).

## Layout
- `AGENTS.md` — Human‑readable aggregation of all rules, generated from `.cursor/rules/*.mdc` (do not edit by hand; run `node scripts/build-agents-doc.js`).
- `.cursor/rules/*.mdc` — Machine‑readable rules for Cursor; always‑on standards.
- `docs/` — Human‑readable guides:
  - `docs/architecture/` — Architecture patterns, SOLID, core design principles (DRY/KISS/YAGNI/SoC), and design patterns. See `docs/architecture/patterns/` for per-pattern notes and navigation.
  - `docs/security-standards.md` — Security baseline.
  - `docs/testing-standards.md` — Testing rules.
  - `docs/observability-standards.md` — Logging/metrics/tracing/health.
  - `docs/performance-standards.md` — Performance guidance.
  - `docs/ci-standards.md` — CI/CD pipeline expectations.
  - `docs/api-standards.md` — API design rules.
  - `docs/code-review-standards.md` — Code review guidance.
  - `docs/language-guides/` — Language‑specific standards.
- `examples/` — Small “before/after” and flow examples (optional; for humans).

### Cursor rule load order (priority)
Rules are ordered by filename to ensure persona/bootstrap runs first, then global/agents, standards, methodologies, and languages:

1. `00-persona.mdc`
2. `10-global.mdc`
3. `20-agents.mdc`
4. `30-38*.mdc` (security, testing, observability, performance, ci, api, architecture, code-structure, compliance)
5. `40-44*.mdc` (atdd, bdd, tdd, fdd, ddd)
6. `50-lang-*.mdc` (language-specific)

## Core Agents
- `@architect` — System and service architecture.
- `@security-auditor` — Security review and fixes.
- `@test-engineer` — Test design and generation.
- `@code-reviewer` — Code review and quality gate.
- `@perf-optimizer` — Performance profiling and optimization.
- `@api-designer` — REST/GraphQL API contracts.
- `@devops` — CI/CD and runtime configuration.
- `@refactorer` — Behavior‑preserving refactors.

Each agent has:
- Clear role and operating rules.
- Strict `[FORMAT]` section (single fenced block or “Format non-compliant”).
- Outputs that always include at least one verification step (tests/checks/commands).

## Modes: Light, Standard, Full
- **LITE (default):** concise answers, ≤8 bullets, one best-practice path. Use for narrow tasks (e.g., “fix this handler”).
- **STANDARD:** adds Grounding Block + Plan + Validation. Use for design/debug tasks where context matters.
- **FULL:** includes MVE plan, ADR-1p, DONE checklist. Use for higher-risk work (auth/PII/contracts) or when changing behavior broadly.
- Trigger a mode by asking for it: `Use FULL mode for this auth change` or `Respond in STANDARD mode for design review`.

## Quick Tutorial (Cursor or similar)
1. Place this repo (or its `.cursor` and `AGENTS.md` + `docs` content) at the root of your project.
2. Open the project in Cursor; it will automatically pick up `.cursor/rules/*.mdc` and `AGENTS.md`.
3. Pick the right mode (LITE/ STANDARD/ FULL) based on risk; default is LITE.
4. In chat, invoke an agent by role with a short task. For example:
   - `Act as the @code-reviewer. Review this diff and fix anything blocking.`
   - `Act as the @security-auditor. Audit this handler and apply fixes.`
   - `Act as the @test-engineer. Add tests for this function.`
5. The rules auto-apply security/testing/observability/performance/CI/API standards and enforce single-block outputs plus verification commands.

## Using With Other Tools
For tools that can’t read `.cursor/rules` directly:
- Load or copy the relevant sections from `AGENTS.md` and `docs/*.md` into the tool’s “system” / “rules” area.
- Keep your user prompts short and task‑oriented; avoid duplicating rules.

## Extending the System
- To add a new language: create `docs/language-guides/<lang>.md` and a matching `.cursor/rules/50-lang-<lang>.mdc` file with globs and MUST/NEVER lists.
- To add a new agent: edit `.cursor/rules/20-agents.mdc` with role, operating rules, and `[FORMAT]`; optionally add usage in `docs/agent-prompts.md`; then regenerate `AGENTS.md` via `node scripts/build-agents-doc.js`.
- To tighten behavior: adjust the relevant `.cursor/rules/*.mdc` section; prefer “fail‑closed” patterns (e.g., respond with `Format non-compliant` when format can’t be honored), then regenerate `AGENTS.md`.

## Quickstart with Cursor
1) Clone/open this repo in Cursor (ensure `.cursor/rules` and `AGENTS.md` are at project root).
2) Use an agent prompt, e.g.: `Act as the @code-reviewer. Review this diff.` or `Act as the @security-auditor. Audit src/handler.ts`.
3) Standards load automatically from `.cursor/rules/*.mdc` and AGENTS. Keep prompts short; the rules enforce security, testing, observability, and formatting.

### Starter Demo Prompt
Ask any agent to spin up a tiny sample to see the rules in action. Example (LITE mode):
```
Act as the @architect. In LITE mode, sketch a minimal TypeScript Express service exposing GET /health and GET /users/:id with validation, logging, and tests outlined.
```
Then follow up with `@security-auditor`, `@test-engineer`, and `@devops` to see the standards across the flow.

## Status (v0.1 scope)
- **Tier 1 (fully enforced, examples present):** TypeScript, PHP.
- **Tier 2 (solid baseline, fewer examples):** Rust, Go, Python.
- **Tier 3 (light guidance, evolving):** CSS, HTML, Dart, GDScript.

## Examples
See `examples/` for:
- “Before/after” service handlers.
- Sample prompts you can reuse to exercise the agents end‑to‑end.

You can safely treat this repository as a **policy/agent layer** that you drop into real projects to upgrade AI‑assisted development to enterprise standards.***
