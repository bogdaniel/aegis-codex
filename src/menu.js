#!/usr/bin/env node
/**
 * Aegis interactive menu to run common tasks.
 * Choices wrap existing scripts:
 *  - Install (.aegis) → src/install.js
 *  - Compile bundles → src/build-cli.js compile
 *  - Generate diagrams → src/scripts/generate-workflow-diagrams.js
 *  - Build rules/AGENTS.md → src/rules-builder/build-agents-doc.js (Rule Builder)
 *  - Local stack check → src/checks/aegis-check.js
 */
const { spawnSync } = require('node:child_process');
const readline = require('node:readline');
const path = require('node:path');

const ROOT = process.cwd();

const actions = [
  {
    key: '1',
    label: 'Install (.aegis)',
    run: () => ['node', [path.join(ROOT, 'src', 'install.js')]],
  },
  {
    key: '2',
    label: 'Compile bundles',
    run: () => ['node', [path.join(ROOT, 'src', 'build-cli.js'), 'compile']],
  },
  {
    key: '3',
    label: 'Generate workflow diagrams',
    run: () => ['node', [path.join(ROOT, 'src', 'scripts', 'generate-workflow-diagrams.js')]],
  },
  {
    key: '4',
    label: 'Build rules / AGENTS.md (Rule Builder)',
    // Default to copy rules for IDE use; adjust flags here if AGENTS.md is desired (--generate-agents or --both)
    run: () => ['node', [path.join(ROOT, 'src', 'rules-builder', 'build-agents-doc.js'), '--copy-rules']],
  },
  {
    key: '5',
    label: 'Local stack check (lint/tests/audit)',
    run: () => ['node', [path.join(ROOT, 'src', 'checks', 'aegis-check.js')]],
  },
  { key: 'q', label: 'Quit', run: () => null },
];

function printMenu() {
  console.log('\n=== Aegis Interactive Menu ===');
  actions.forEach((a) => console.log(`[${a.key}] ${a.label}`));
}

function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ask = () => {
    printMenu();
    rl.question('Select an option: ', (answer) => {
      const choice = actions.find((a) => a.key.toLowerCase() === answer.trim().toLowerCase());
      if (!choice) {
        console.log('Invalid choice. Try again.');
        return ask();
      }
      if (!choice.run) {
        rl.close();
        return;
      }
      const cmd = choice.run();
      if (!cmd) {
        rl.close();
        return;
      }
      const [command, args] = cmd;
      console.log(`\n→ Running: ${[command, ...args].join(' ')}`);
      const res = spawnSync(command, args, { stdio: 'inherit' });
      console.log(`\n${choice.label} exited with code ${res.status}`);
      rl.close();
    });
  };

  ask();
}

main();
