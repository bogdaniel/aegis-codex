# Contributing

## Edit flow
- Edit rules in `.cursor/rules/*.mdc` (persona/global/agents in 00/10/20, standards in 30-38, methodologies in 40-44, languages in 50-lang-*).
- If you change rules, regenerate `AGENTS.md` from the rules with: `node scripts/build-agents-doc.js` (add `--langs` to filter languages).
- Keep human docs (`docs/*`) aligned with rule content; update examples/prompts if behavior changes.

## Rule style
- Use bracketed sections `[SECTION]`; keep bullets short and enforceable.
- Include a `[VERIFICATION]` section with concrete commands/checks (tests, lint, audit) where applicable.
- Prefer fail-closed patterns (e.g., “Format non-compliant” when format rules can’t be honored).
- Single-recommendation rule: avoid listing options unless explicitly required.

## Quick checks
- After edits: `node scripts/build-agents-doc.js --out AGENTS.generated.md` to preview, then `node scripts/build-agents-doc.js` to update `AGENTS.md`.
- Consider running a sample prompt from `docs/agent-prompts.md` to spot regressions.
