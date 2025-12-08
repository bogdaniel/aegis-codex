#!/usr/bin/env node
/**
 * Validates policy scenarios under tests/policies for required files and basic structure.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const POLICIES_DIR = path.join(ROOT, 'tests', 'policies');

function main() {
  console.log('🔍 Validating policy scenarios...');

  if (!fs.existsSync(POLICIES_DIR)) {
    console.error(`❌ Policies directory not found: ${POLICIES_DIR}`);
    process.exit(1);
  }

  const scenarios = fs
    .readdirSync(POLICIES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => path.join(POLICIES_DIR, d.name));

  if (scenarios.length === 0) {
    console.log(`⚠️  No policy scenarios found in ${POLICIES_DIR}`);
    process.exit(0);
  }

  let errors = 0;

  for (const scenarioDir of scenarios) {
    const name = path.basename(scenarioDir);
    console.log(`\n📋 Validating scenario: ${name}`);

    const requiredFiles = ['prompt.md', 'expected-output.md', 'validation.md'];
    const missing = requiredFiles.filter((f) => !fs.existsSync(path.join(scenarioDir, f)));
    if (missing.length > 0) {
      console.error(`  ❌ Missing required files: ${missing.join(', ')}`);
      errors += 1;
      continue;
    }

    const prompt = fs.readFileSync(path.join(scenarioDir, 'prompt.md'), 'utf8');
    if (!/```/.test(prompt)) {
      console.warn('  ⚠️  prompt.md may not contain a code block with the prompt');
    }

    const validation = fs.readFileSync(path.join(scenarioDir, 'validation.md'), 'utf8');
    if (!/\[\s*\]/.test(validation)) {
      console.warn('  ⚠️  validation.md may not contain validation checkboxes');
    }

    const expected = fs.readFileSync(path.join(scenarioDir, 'expected-output.md'), 'utf8');
    if (!/\.cursor\/rules/.test(expected)) {
      console.warn('  ⚠️  expected-output.md should reference relevant .cursor/rules files');
    }

    console.log('  ✅ Scenario structure valid');
  }

  if (errors > 0) {
    console.error(`\n❌ Found ${errors} scenario(s) with errors`);
    process.exit(1);
  }

  console.log('\n✅ All policy scenarios are properly structured');
}

main();
