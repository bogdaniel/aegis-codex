#!/usr/bin/env node
/**
 * Aegis CLI entrypoint.
 * Commands wrap existing scripts:
 *  - install       → src/install.js
 *  - compile       → buildAll from src/lib/bridge.js
 *  - diagrams      → src/scripts/generate-workflow-diagrams.js
 *  - rules         → src/rules-builder/build-agents-doc.js
 *  - check         → src/checks/aegis-check.js
 *  - menu          → src/menu.js
 */
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { Command } = require('commander');
const { buildAll } = require('./lib/bridge');

const pkg = require(path.join(process.cwd(), 'package.json'));
const program = new Command();

function runNodeScript(scriptPath, args = []) {
  const res = spawnSync('node', [scriptPath, ...args], { stdio: 'inherit' });
  if (res.status !== 0) process.exit(res.status);
}

program
  .name('aegis')
  .description('Aegis CLI')
  .version(pkg.version || '0.0.0')
  .option('-c, --config <path>', 'Agent mapping config JSON', path.join(__dirname, 'config', 'agents.json'))
  .option('-o, --out <path>', 'Output root directory (default current project)', '.')
  .option('-f, --folder <name>', 'Install folder name', '.aegis')
  .option('-m, --modules <list>', 'Comma-separated extra modules to export', '')
  .option('--ide-claude <path>', 'Optional Claude config root to receive compiled agents (e.g., .claude)')
  .option('--ide-cursor <path>', 'Optional Cursor config root to receive compiled agents/commands (e.g., .cursor)');

program
  .command('install')
  .description('Install .aegis assets')
  .allowUnknownOption()
  .action((opts, cmd) => {
    runNodeScript(path.join(__dirname, 'install.js'), cmd.parent?.args?.slice(1) ?? []);
  });

program
  .command('compile')
  .description('Compile agents/workflows/tools into bundles')
  .allowUnknownOption()
  .action((opts, cmd) => {
    const options = cmd.parent?.opts?.() || {};
    const mappingPath = path.resolve(options.config || path.join(__dirname, 'config', 'agents.json'));
    const results = buildAll(mappingPath, {
      outRoot: options.out || '.',
      installFolder: options.folder || '.aegis',
      ideClaudeDir: options.ideClaude,
      ideCursorDir: options.ideCursor,
      modules: options.modules || '',
    });
    for (const res of results) {
      console.log(`✓ ${res.mapping.aegisId} → ${res.compiledPath} / ${res.bundlePath}`);
    }
  });

program
  .command('diagrams')
  .description('Generate workflow diagrams')
  .allowUnknownOption()
  .action((opts, cmd) => {
    runNodeScript(path.join(__dirname, 'scripts', 'generate-workflow-diagrams.js'), cmd.parent?.args?.slice(1) ?? []);
  });

program
  .command('rules')
  .description('Build rules/AGENTS.md (Rule Builder)')
  .allowUnknownOption()
  .action((opts, cmd) => {
    runNodeScript(path.join(__dirname, 'rules-builder', 'build-agents-doc.js'), cmd.parent?.args?.slice(1) ?? []);
  });

program
  .command('check')
  .description('Local stack check (lint/tests/audit)')
  .allowUnknownOption()
  .action((opts, cmd) => {
    runNodeScript(path.join(__dirname, 'checks', 'aegis-check.js'), cmd.parent?.args?.slice(1) ?? []);
  });

program
  .command('menu')
  .description('Interactive menu')
  .action(() => {
    runNodeScript(path.join(__dirname, 'menu.js'));
  });

program.parse(process.argv);
