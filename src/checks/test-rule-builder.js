#!/usr/bin/env node
/**
 * Test harness for the rule builder (structure checks + optional Node-based validation).
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SCRIPTS_ROOT = path.join(ROOT, 'src', 'bridge', 'rules-builder');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const NC = '\x1b[0m';

function exists(p) {
  return fs.existsSync(p);
}

function logOk(msg) {
  console.log(`  ${GREEN}✅${NC} ${msg}`);
}

function logWarn(msg) {
  console.warn(`  ${YELLOW}⚠️ ${NC} ${msg}`);
}

function logErr(msg) {
  console.error(`  ${RED}❌${NC} ${msg}`);
}

function ensureModules() {
  const modules = [
    'lib/config/ConfigParser.js',
    'lib/config/ConfigValidator.js',
    'lib/rules/RuleReader.js',
    'lib/rules/RuleParser.js',
    'lib/rules/RuleMetadata.js',
    'lib/selection/RuleSelector.js',
    'lib/selection/DependencyResolver.js',
    'lib/selection/RuleValidator.js',
    'lib/output/RuleCopier.js',
    'lib/output/AgentsDocGenerator.js',
  ];
  let missing = 0;
  modules.forEach((m) => {
    const p = path.join(SCRIPTS_ROOT, m);
    if (exists(p)) {
      logOk(`${m}`);
    } else {
      logErr(`${m} (missing)`);
      missing += 1;
    }
  });
  if (missing > 0) {
    throw new Error(`${missing} required modules missing`);
  }
}

function ensureConfigs() {
  const configs = [
    'docs/.aegis-rules.example-minimal.json',
    'docs/.aegis-rules.example-typescript-backend.json',
    'docs/.aegis-rules.example-full-stack.json',
    'docs/.aegis-rules.example-php-laravel.json',
    'docs/.aegis-rules.example-java-spring.json',
    'docs/.aegis-rules.example-csharp-dotnet.json',
    'docs/.aegis-rules.example-backend-only.json',
    'docs/.aegis-rules.example-patterns-specific.json',
  ];
  let missing = 0;
  for (const cfg of configs) {
    if (!exists(cfg)) {
      logErr(`${cfg} (missing)`);
      missing += 1;
      continue;
    }
    logOk(`${cfg}`);
    try {
      JSON.parse(fs.readFileSync(cfg, 'utf8'));
      logOk('   Valid JSON');
    } catch {
      logErr('   Invalid JSON');
      missing += 1;
    }
  }
  if (missing > 0) {
    throw new Error(`${missing} config files missing or invalid`);
  }
}

function ensureRulesDir() {
  if (!exists('rules')) throw new Error('rules/ directory missing');
  logOk('rules/ directory exists');
  const ruleCount = fs.readdirSync('rules', { withFileTypes: true }).reduce((acc, dirent) => {
    if (dirent.isFile() && dirent.name.endsWith('.mdc')) return acc + 1;
    if (dirent.isDirectory()) {
      const sub = fs
        .readdirSync(path.join('rules', dirent.name))
        .filter((n) => n.endsWith('.mdc')).length;
      return acc + sub;
    }
    return acc;
  }, 0);
  console.log(`     Found ${ruleCount} rule files`);
  const required = ['00-persona.mdc', '10-global.mdc', '20-agents.mdc', '30-security.mdc', '36-architecture.mdc', '44-ddd.mdc'];
  let missing = 0;
  required.forEach((name) => {
    const found = fs.existsSync(path.join('rules', name)) || fs.existsSync(path.join('rules', '**', name));
    if (found) {
      logOk(name);
    } else {
      logErr(`${name} (missing)`);
      missing += 1;
    }
  });
  if (missing > 0) {
    throw new Error(`${missing} required rules missing`);
  }
}

function ensureMetadata() {
  let required = 0;
  let optional = 0;
  let none = 0;
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.mdc')) files.push(full);
    }
  };
  walk('rules');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (/required:\s*true/.test(content)) required += 1;
    else if (/required:\s*false/.test(content)) optional += 1;
    else none += 1;
  }
  console.log(`  Required rules (required: true): ${required}`);
  console.log(`  Optional rules (required: false): ${optional}`);
  if (none > 0) {
    logWarn(`Rules without metadata: ${none}`);
  } else {
    logOk('All rules have metadata');
  }
}

function runNodeTests() {
  try {
    const ConfigParser = require(path.join(SCRIPTS_ROOT, 'lib/config/ConfigParser'));
    const RuleReader = require(path.join(SCRIPTS_ROOT, 'lib/rules/RuleReader'));
    const RuleParser = require(path.join(SCRIPTS_ROOT, 'lib/rules/RuleParser'));
    const RuleMetadata = require(path.join(SCRIPTS_ROOT, 'lib/rules/RuleMetadata'));

    console.log('  Testing config parsing...');
    const cfg = ConfigParser.readConfig('docs/.aegis-rules.example-minimal.json');
    logOk(`Config parsed (version ${cfg.version || 'n/a'})`);

    console.log('  Testing rule reading...');
    const rules = RuleReader.readRules('rules');
    logOk(`Rules read: ${rules.length}`);

    if (rules.length > 0) {
      console.log('  Testing metadata extraction...');
      const parsed = RuleParser.parseRule(rules[0].content, rules[0].name);
      const meta = RuleMetadata.extractMetadata(parsed, rules[0].name);
      logOk(`Metadata extracted (category: ${meta.category || 'n/a'})`);
    }
  } catch (err) {
    throw new Error(`Node tests failed: ${err.message}`);
  }
}

function main() {
  console.log('🧪 Testing Aegis Codex Rule Builder');
  console.log('====================================\n');
  try {
    ensureModules();
    console.log('');
    ensureConfigs();
    console.log('');
    ensureRulesDir();
    console.log('');
    ensureMetadata();
    console.log('');
    runNodeTests();
    console.log('');
    console.log(`${GREEN}✅ Structure validation: PASSED${NC}`);
    console.log(`${GREEN}✅ Node.js tests: PASSED${NC}`);
  } catch (err) {
    console.error(`${RED}❌ ${err.message}${NC}`);
    process.exit(1);
  }
}

main();
