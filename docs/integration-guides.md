# Integration Guides

How to use this ruleset with common AI coding tools. The goal is always the same: load the **rules/agents** once, then keep your prompts short and task‑focused.

## Cursor
- Place `AGENTS.md`, `.cursor/rules/`, and `docs/` at the project root.
- Open the project in Cursor; it will auto‑load `.cursor/rules/*.mdc`.
- In chat, invoke agents by role only, for example:
  - `Act as the @security-auditor. Audit this handler and fix issues.`
  - `Act as the @test-engineer. Add tests for this function.`
  - `Act as the @code-reviewer. Review this diff and return the corrected file.`
- Do **not** restate standards; Cursor applies the rules automatically.

## Aider
- Use Aider’s system prompt/config file to load the content of `AGENTS.md` and the relevant `docs/*.md` (especially security, testing, observability, language guide).
- Keep user prompts minimal and agent‑oriented:
  - `Act as the @devops. Add CI for this project.`
  - `Act as the @api-designer. Design the API for X.`
- If Aider supports project‑level config files, store the loaded policies there so they’re reused across sessions.

## Continue / Other Editors
- Add the contents of `AGENTS.md` + key `docs/*.md` to the tool’s “rules”/“system prompt” area.
- Optionally add links or short summaries of language guides to the workspace context.
- Use the same invocation style as with Cursor: `Act as the @agent-name …`.

## General Tips
- Load **policies once**, then stop repeating them in user prompts.
- Always mention the agent (e.g., `@security-auditor`) and the **task**; let rules handle standards.
- For new stacks, add a language guide + rule file first, then use the same prompt style.***
