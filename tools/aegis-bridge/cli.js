#!/usr/bin/env node
const { Command } = require('commander');
const path = require('node:path');
const { buildAll } = require('./lib/bridge');

const program = new Command();
program
  .name('aegis-bridge')
  .description('Compile Aegis agents into compiled agents and web bundles')
  .option('-c, --config <path>', 'Agent mapping config JSON', 'tools/aegis-bridge/config/agents.json')
  .option('-o, --out <path>', 'Output root directory (default current project)', '.')
  .option('-f, --folder <name>', 'install folder name', '.aegis')
  .option('-m, --modules <list>', 'Comma-separated extra modules to export (in addition to mapped modules)', '')
  .option('--ide-claude <path>', 'Optional Claude config root to receive compiled agents (e.g., .claude)')
  .option('--ide-cursor <path>', 'Optional Cursor config root to receive compiled agents/commands (e.g., .cursor)');

program
  .command('compile')
  .description('Compile agents and web bundles')
  .action(() => {
    const opts = program.opts();
    const mappingPath = path.resolve(opts.config);
    const results = buildAll(mappingPath, {
      outRoot: opts.out,
      installFolder: opts.folder,
      ideClaudeDir: opts.ideClaude,
      ideCursorDir: opts.ideCursor,
      modules: opts.modules,
    });
    for (const res of results) {
      // eslint-disable-next-line no-console
      console.log(`✓ ${res.mapping.aegisId} → ${res.compiledPath} / ${res.bundlePath}`);
    }
  });

program
  .command('bundle')
  .description('Alias for compile (build agents, bundles, workflows/tasks, manifests)')
  .action(() => {
    const opts = program.opts();
    const mappingPath = path.resolve(opts.config);
    const results = buildAll(mappingPath, {
      outRoot: opts.out,
      installFolder: opts.folder,
      ideClaudeDir: opts.ideClaude,
      ideCursorDir: opts.ideCursor,
      modules: opts.modules,
    });
    for (const res of results) {
      // eslint-disable-next-line no-console
      console.log(`✓ ${res.mapping.aegisId} → ${res.compiledPath} / ${res.bundlePath}`);
    }
  });

program
  .command('validate')
  .description('Validate agent mappings without writing output')
  .action(() => {
    const opts = program.opts();
    const mappingPath = path.resolve(opts.config);
    buildAll(mappingPath, {
      outRoot: path.resolve('.tmp-aegis-validate'),
      installFolder: opts.folder,
      ideClaudeDir: opts.ideClaude,
      ideCursorDir: opts.ideCursor,
      modules: opts.modules,
    });
    // eslint-disable-next-line no-console
    console.log('✓ Validation succeeded for all mapped agents');
  });

program.parse(process.argv);
