# BMAD Bridge

Compiles Aegis `.mdc` agents into BMAD-style compiled agents (`.md` XML) and web bundles (`web-bundles/*.xml`). Uses BMAD templates for menus/workflows and overlays Aegis personas/principles for governance.

## Commands
- `npm run bmad:compile` — Build compiled agents under `.bmad/<module>/agents/*.md` (default) and bundles under `web-bundles/<module>/agents/*.xml`. You can change root via `--out` and folder via `--folder`.
- `npm run bmad:validate` — Runs the same pipeline to ensure schema compliance.
- `npm run bmad:bundle` — Alias of compile (includes workflows/tasks manifests and web-bundles copies).
- `npm run bmad:ci` — CI validation (builds to `.tmp-bmad-ci`, checks manifests/workflows/tasks presence).

Options:
- `--out <path>`: output root (default `.`)
- `--folder <name>`: BMAD folder name (default `.bmad`)
- `--ide-claude <path>`: also write compiled agents to a Claude config root (e.g., `.claude` → `.claude/agents/{folder}/{module}/agents/*.md`)
- `--ide-cursor <path>`: also write compiled agents and commands to a Cursor config root (e.g., `.cursor/commands/bmad/...`)
- `--modules <list>`: comma-separated extra modules to export workflows/tasks/configs for (default: none beyond mapped agents)

Additional outputs:
- Generates `.bmad/core/config.yaml` if missing.
- Exports BMAD workflows/tasks from `tmp/BMAD-METHOD/src` into `.bmad/core/tasks` and `.bmad/bmm/workflows|tasks` when source exists.
- Creates `_cfg/manifest.yaml` and empty manifests (`workflow-manifest.csv`, `task-manifest.csv`, `tool-manifest.csv`).
- Populates manifests by scanning `.bmad` workflows/tasks and writing workflow/task manifest CSVs.

## Mapping
`tools/bmad-bridge/config/agents.json` maps each Aegis agent to a BMAD template. Templates live in `tools/bmad-bridge/templates/bmm/`. Update this file to add more agents.

## Notes
- The compiler uses the ported BMAD schema/compilation path (`schema/agent.js`, `lib/compiler.js`).
- Persona/communication/principles are pulled from the `.mdc` frontmatter/sections; BMAD menus/workflows are preserved for executable behavior.
- Outputs match BMAD final layout (compiled XML-in-`.md` for IDEs, XML bundles for web consumers).
