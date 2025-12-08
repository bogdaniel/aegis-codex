# Contributing

## Edit flow
- Edit rules in `rules/*.mdc` (persona/global/agents in 00/10/11/20/21, topic standards in 23/30–3F, methodologies in 40–44, language rules in 50-lang-*).
- Use the rule builder to export rules into `.cursor/rules/*.mdc` and regenerate `AGENTS.md` after changes:
  - `node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules --generate-agents`
- Keep human docs (`docs/*`, `README.md`, `AGENTS.md`) aligned with rule content; update examples/prompts if behavior or guarantees change.

## Rule style
- Use bracketed sections `[SECTION]`; keep bullets short and enforceable.
- Include a `[VERIFICATION]` section with concrete commands/checks (tests, lint, audit) where applicable.
- Prefer fail-closed patterns (e.g., “Format non-compliant” when format rules can’t be honored).
- Single-recommendation rule: avoid listing options unless explicitly required.

## Quick checks
- After edits: `node src/rules-builder/build-agents-doc.js --out AGENTS.generated.md` to preview, then `node src/rules-builder/build-agents-doc.js` to update `AGENTS.md`.
- Consider running a sample prompt from `docs/agent-prompts.md` to spot regressions.
