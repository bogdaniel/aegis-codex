#!/usr/bin/env node
/**
 * Architecture hygiene check (deep relatives, cross-context imports, public API docs, optional ESLint).
 * Can be used as a git hook or manual pre-commit gate.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', 'build', '.git', '.idea', '.vscode', 'test/scenarios']);

let violations = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function hasDeepRelative(content) {
  return /\.\.\/\.\.\/\.\./.test(content);
}

function hasCrossContext(content) {
  return /@\S*\/(domain|infra)\//.test(content);
}

function checkDeepRelatives(tsFiles) {
  const offender = tsFiles.find((file) => hasDeepRelative(fs.readFileSync(file, 'utf8')));
  if (offender) {
    console.error('❌ Found deep relative imports (../../ or deeper). Use path aliases instead.');
    console.error(`   Example offender: ${path.relative(ROOT, offender)}`);
    violations += 1;
  } else {
    console.log('✅ No deep relative imports found');
  }
}

function checkCrossContext(tsFiles) {
  const offender = tsFiles.find((file) => hasCrossContext(fs.readFileSync(file, 'utf8')));
  if (offender) {
    console.warn('⚠️  Potential cross-context direct imports detected. Use public API modules instead.');
    console.warn(`   Example: ${path.relative(ROOT, offender)}`);
  } else {
    console.log('✅ No obvious cross-context direct imports found');
  }
}

function checkApiDocs(tsFiles) {
  const targets = tsFiles.filter((file) => file.endsWith('Application/index.ts') || file.endsWith('Application/public.ts'));
  let missing = 0;
  for (const file of targets) {
    const head = fs.readFileSync(file, 'utf8').split(/\r?\n/).slice(0, 20).join('\n');
    if (!/\/\*\*|^\/\/\//m.test(head)) {
      console.warn(`⚠️  Public API module missing documentation: ${path.relative(ROOT, file)}`);
      missing += 1;
    }
  }
  if (missing === 0) {
    console.log('✅ All checked public API modules have documentation');
  }
}

function runEslintIfPresent() {
  const configPath = path.join(ROOT, 'test/example-app/.eslintrc.json');
  if (!fs.existsSync(configPath)) return;
  console.log('Running ESLint with architecture rules...');
  const res = spawnSync('npx', ['eslint', '--config', configPath, 'test/example-app/**/*.ts', '--ext', '.ts'], {
    shell: true,
    stdio: 'inherit',
  });
  if (res.status !== 0) {
    console.warn('⚠️  ESLint reported issues (see output above).');
  }
}

function main() {
  console.log('🔍 Running architecture compliance checks...');
  const tsFiles = walk(ROOT).filter((f) => f.endsWith('.ts'));

  checkDeepRelatives(tsFiles);
  checkCrossContext(tsFiles);
  checkApiDocs(tsFiles);
  runEslintIfPresent();

  if (violations > 0) {
    console.error('\n❌ Architecture violations found. Please fix before committing.');
    console.error('   See .cursor/rules/34-ci.mdc for architecture requirements.');
    process.exit(1);
  }
  console.log('\n✅ Architecture checks passed');
}

main();
