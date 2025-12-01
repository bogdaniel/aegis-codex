# Prompt Optimization Report

[OVERVIEW]
- Spine lives in `rules/00-` to `rules/3G-` plus language files under `rules/50-lang-*`; AGENTS/Orchestration mirror this spine and AGENTS.md is generated from `.cursor/rules`.
- Persona/global/agents/orchestration files restate constraints (architecture non-negotiable, single recommendation, output contract) then topic-specific rules (architecture, security, testing, CI, change-discipline, flags/config, observability/ops) and language overlays.
- Intentional dual-path: editable sources in `rules/` are copied to `.cursor/rules/` for Cursor consumption; references to `.cursor/rules/...` are correct and should remain.
- Pattern files under `rules/patterns/` repeat a template per pattern; AGENTS.md in root inlines most rules, including pattern templates.

[DUPLICATION]
- Architecture non-negotiable + Clean/Hex/DDD doctrine repeated across `00-persona.mdc`, `10-global.mdc`, `20-agents.mdc` (multiple times per agent), `36-architecture.mdc`, `44-ddd.mdc`, language files (e.g., `50-lang-typescript.mdc`), and AGENTS.md.
- Risk override protocol text appears in `00-persona.mdc`, `10-global.mdc`, `20-agents.mdc`, `36-architecture.mdc`, `44-ddd.mdc`, and others despite `.cursor/rules/3G-risk-overrides.mdc` being canonical.
- “Read rules first / do not copy violations / architecture before functionality” workflow repeated verbatim in `00-persona.mdc`, `36-architecture.mdc`, `50-lang-typescript.mdc`, and several language files.
- Testing gates (Domain + Application tests, failure-path requirement) repeated in `20-agents.mdc` agent sections, `31-testing.mdc`, and change-discipline files (`45-bugfix-protocol.mdc`, `46-regression-discipline.mdc`).
- Bounded context + trust tier definitions repeated in `00-persona.mdc`, `36-architecture.mdc`, `44-ddd.mdc`, and agent files.
- Public API module structure duplicated inside `36-architecture.mdc` (same bullet block appears twice) and again within `50-lang-typescript.mdc`.
- AGENTS.md embeds large swaths of rule text (persona/global/agents plus pattern templates), effectively duplicating the rule files themselves.

[INCONSISTENCY]
- Mixed path references: many files point to `.cursor/rules/...` while editable sources are in `rules/...`; this is intentional for the copy step but could confuse authors about which location to edit.
- Sectioning varies widely (`[INTENT]/[APPLICABILITY]/[MANDATORY RULES]` in some files vs. long bullet lists elsewhere), which makes cross-file scanning uneven.
- Terminology mostly uses Tier H/M/S, but phrasing alternates between “Tier H contexts” and “safety kernel Tier H contexts” without a single definition anchor.
- Some files mix “refuse/bypass only with risk override” wording with slightly softer “should” phrasing elsewhere; needs alignment to the strict language in spine rules.

[RISKY AREAS]
- AGENTS.md volume/noise (full rule content + pattern templates) can drown the critical spine instructions and risks drift if regenerated inconsistently.
- Duplicated refusal language across persona, agents, and topic rules could diverge over time, weakening enforcement if edits land in only one copy.
- Duplicate public-API-module block in `36-architecture.mdc` risks future edits diverging (two sources for same requirement).
- `.cursor/rules` vs `rules/` references may lead contributors to edit the wrong location or miss the generated nature of AGENTS.md.

[SAFE OPTIMIZATION TARGETS]
- Normalize “architecture non-negotiable / read rules first / refuse violations” into concise canonical statements in `00-persona.mdc` and `10-global.mdc`, with other files pointing to them.
- Deduplicate risk-override wording by pointing to `3G-risk-overrides.mdc` and keeping only short reminders elsewhere.
- Remove duplicate public-API-module block inside `36-architecture.mdc` and replace repetitions in language files with cross-references to `36-architecture.mdc`.
- Collapse repeated testing-gate language in `20-agents.mdc` agent sections to reference `31-testing.mdc` + change-discipline spine.
- Standardize section scaffolding (`[INTENT]`, `[APPLICABILITY]`, `[MANDATORY RULES]`, `[CROSS-REFERENCES]`) across spine/topic/language files where feasible without changing semantics.
- Clarify `.cursor/rules` vs `rules/` source-of-truth note near the top of persona/global/agents to reduce confusion while keeping generator expectations intact; keep `.cursor/rules` references unchanged because they are intentional targets.

[CHANGES]
- Added explicit source-of-truth notes (editable `rules/` → generated `.cursor/rules/`) to `rules/00-persona.mdc`, `rules/10-global.mdc`, and `rules/20-agents.mdc` for clarity without altering rule references.
- Deduplicated the public API module structure in `rules/36-architecture.mdc` (single canonical statement + cross-reference).
- Simplified `rules/50-lang-typescript.mdc` to point public-API requirements to the canonical rule in `rules/36-architecture.mdc` while keeping the mandate.
- Reduced repeated testing-gate wording in `rules/20-agents.mdc` for @implementer, @test-engineer, and @code-reviewer, consolidating to `rules/31-testing.mdc` + change-discipline spine with explicit “BLOCKER unless 3G override” language preserved.
- Added source-of-truth notes to `rules/11-meta-map.mdc` and `rules/21-orchestration.mdc` (editable `rules/` → generated `.cursor/rules/`) without changing semantics.
- Added source-of-truth notes to `rules/30-security.mdc`, `rules/31-testing.mdc`, and `rules/3G-risk-overrides.mdc` (editable `rules/` → generated `.cursor/rules/`) for consistency; no semantic changes.
- Added source-of-truth notes to `rules/23-change-control.mdc`, `rules/34-ci.mdc`, `rules/36-architecture.mdc`, and `rules/44-ddd.mdc` (editable `rules/` → generated `.cursor/rules/`); no semantic changes.
- Added source-of-truth notes to `rules/32-observability.mdc`, `rules/3D-operations.mdc`, `rules/3E-config-environments.mdc`, `rules/3F-feature-flags-rollouts.mdc`, `rules/35-api-lifecycle.mdc`, `rules/38-anti-corruption-events.mdc`, and `rules/3B-data-persistence.mdc` (editable `rules/` → generated `.cursor/rules/`); no semantic changes.
- Added source-of-truth notes to `rules/22-ai-assistants.mdc` and `rules/50-lang-typescript.mdc` (editable `rules/` → generated `.cursor/rules/`); no semantic changes.
- Added source-of-truth notes to change-discipline cluster files `rules/45-bugfix-protocol.mdc`, `rules/46-regression-discipline.mdc`, `rules/47-diff-discipline.mdc`, and `rules/48-doc-sync.mdc` (editable `rules/` → generated `.cursor/rules/`); no semantic changes.
- Added source-of-truth notes to remaining topic/language files: `rules/33-performance.mdc`, `rules/37-code-structure.mdc`, `rules/39-accessibility.mdc`, `rules/39-observability-security.mdc`, `rules/3C-frontend-architecture.mdc`, `rules/3A-anti-patterns.mdc`, and language guides (`rules/50-lang-*.mdc`) for JS, PHP (+ Laravel), Python, Go, Rust, Java, C#, HTML, CSS, GDScript; no semantic changes.
- Added an editing reminder to `README.md` clarifying the workflow: edit `rules/**/*.mdc`, regenerate `.cursor/rules/` and `AGENTS.md` via `build-agents-doc.js`; do not edit generated outputs directly.
- Added a canonical pointer in `rules/20-agents.mdc` to `.cursor/rules/3G-risk-overrides.mdc` to avoid scattered override semantics; mandate unchanged.
- Added `[INTENT]` and `[APPLICABILITY]` sections to `rules/10-global.mdc` and `rules/20-agents.mdc` to clarify scope/purpose without changing mandates.
- Added `[INTENT]` and `[APPLICABILITY]` sections to `rules/11-meta-map.mdc` and `rules/21-orchestration.mdc` to clarify scope/purpose without changing mandates.
- Added `[INTENT]` and `[APPLICABILITY]` to `rules/30-security.mdc` to clarify scope/purpose without altering security mandates.
- Added `[INTENT]` and `[APPLICABILITY]` to `rules/31-testing.mdc` and `rules/36-architecture.mdc` to clarify scope/purpose without altering mandates.
- Added `[INTENT]` and `[APPLICABILITY]` to `rules/23-change-control.mdc`, `rules/34-ci.mdc`, `rules/44-ddd.mdc`, `rules/35-api-lifecycle.mdc`, and `rules/38-anti-corruption-events.mdc` to clarify scope/purpose without altering mandates.

[NEXT TARGETS]
- Optional: Normalize section scaffolding (`[INTENT]`, `[APPLICABILITY]`, `[MANDATORY RULES]`, `[CROSS-REFERENCES]`) in high-read files (e.g., `rules/20-agents.mdc`, `rules/10-global.mdc`) without altering mandates.
- Optional: Replace duplicated refusal/override reminders in agent sections with concise cross-references to `rules/3G-risk-overrides.mdc` while keeping blocking semantics explicit.
- Optional: Trim AGENTS.md verbosity by leaning on cross-references in source files; keep semantics identical.

[CHANGES]
- Analysis only; no rule text modified yet.
