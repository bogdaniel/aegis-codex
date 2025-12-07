#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const { buildAll } = require('../lib/bridge');

const opts = {
  config: process.env.AEGIS_CONFIG || 'tools/aegis-bridge/config/agents.json',
  out: path.resolve('.tmp-aegis-ci'),
  folder: process.env.AEGIS_FOLDER || '.aegis',
  modules: process.env.AEGIS_MODULES || '',
  ideClaude: null,
  ideCursor: null,
};

function exists(p) {
  return fs.existsSync(p);
}

function ensure(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

buildAll(path.resolve(opts.config), {
  outRoot: opts.out,
  installFolder: opts.folder,
  ideClaudeDir: opts.ideClaude,
  ideCursorDir: opts.ideCursor,
  modules: opts.modules,
});

const base = path.join(opts.out, opts.folder);
const manifestPath = path.join(base, '_cfg', 'manifest.yaml');
const workflowManifest = path.join(base, '_cfg', 'workflow-manifest.csv');
const taskManifest = path.join(base, '_cfg', 'task-manifest.csv');

ensure(exists(manifestPath), 'Missing manifest.yaml');
ensure(exists(workflowManifest), 'Missing workflow-manifest.csv');
ensure(exists(taskManifest), 'Missing task-manifest.csv');

const wfLines = fs.readFileSync(workflowManifest, 'utf8').trim().split(/\r?\n/);
const taskLines = fs.readFileSync(taskManifest, 'utf8').trim().split(/\r?\n/);
ensure(wfLines.length > 1, 'workflow-manifest.csv is empty');
ensure(taskLines.length > 1, 'task-manifest.csv is empty');

// Basic path checks
ensure(exists(path.join(base, 'core', 'tasks')), 'Missing core/tasks');
ensure(exists(path.join(base, 'method', 'workflows')), 'Missing method/workflows');

console.log('✓ CI validation passed');

// Cleanup temp output to avoid leftover folders
try {
  fs.rmSync(opts.out, { recursive: true, force: true });
  console.log(`Cleaned up ${opts.out}`);
} catch (error) {
  console.warn(`Warning: failed to clean temp dir ${opts.out}: ${error.message}`);
}
