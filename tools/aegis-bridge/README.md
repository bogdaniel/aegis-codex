# Aegis Bridge

Compiles Aegis `.mdc` agents into compiled agents (`.md` XML) and web bundles (`aegis-bundles/*.xml`). Uses migrated templates for menus/workflows and overlays Aegis personas/principles for governance.

## Commands
- `npm run aegis:compile` — Build compiled agents under `.aegis/<module>/agents/*.md` (default) and bundles under `aegis-bundles/<module>/agents/*.xml`. You can change root via `--out` and folder via `--folder`.
- `npm run aegis:validate` — Runs the same pipeline to ensure schema compliance.
- `npm run aegis:bundle` — Alias of compile (includes workflows/tasks manifests and bundles copies).
- `npm run aegis:ci` — CI validation (builds to `.tmp-aegis-ci`, checks manifests/workflows/tasks presence).
- `npm run aegis:diagrams` — Generate workflow diagrams from `.aegis/_cfg/workflow-manifest.csv`.

Options:
- `--out <path>`: output root (default `.`)
- `--folder <name>`: install folder name (default `.aegis`)
- `--ide-claude <path>`: also write compiled agents to a Claude config root (e.g., `.claude` → `.claude/agents/{folder}/{module}/agents/*.md`)
- `--ide-cursor <path>`: also write compiled agents and commands to a Cursor config root (e.g., `.cursor/commands/aegis/...`)
- `--modules <list>`: comma-separated extra modules to export workflows/tasks/configs for (default: none beyond mapped agents)

Additional outputs:
- Generates `.aegis/core/config.yaml` if missing.
- Exports workflows/tasks from source into `.aegis/core/tasks` and `.aegis/bmm/workflows|tasks` when source exists.
- Creates `_cfg/manifest.yaml` and empty manifests (`workflow-manifest.csv`, `task-manifest.csv`, `tool-manifest.csv`).
- Populates manifests by scanning `.aegis` workflows/tasks and writing workflow/task manifest CSVs.

## Mapping
`tools/aegis-bridge/config/agents.json` maps each Aegis agent to a template. Templates live in `tools/aegis-bridge/templates/bmm/`. Update this file to add more agents.

## Notes
- The compiler uses the ported schema/compilation path (`schema/agent.js`, `lib/compiler.js`).
- Persona/communication/principles are pulled from the `.mdc` frontmatter/sections; menus/workflows are preserved for executable behavior.
- Outputs match the compiled layout (compiled XML-in-`.md` for IDEs, XML bundles for web consumers).
