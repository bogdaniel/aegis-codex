#!/usr/bin/env node
// Aegis Interactive Installer (futuristic ASCII edition)
// Sources module prompts from source/aegis/**/_module-installer/install-config.yaml
// Writes installed assets into the chosen install folder (default .aegis)
// Then runs aegis:compile (with IDE exports) to generate artifacts.

const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const readline = require('node:readline/promises');
const { spawnSync } = require('node:child_process');
const yaml = require('yaml');

const SOURCE_ROOT = path.resolve('source/aegis');
const MODULE_MAP = {
  method: 'method',
  builder: 'builder',
  gamedev: 'gamedev',
  innovation: 'innovation',
};

const COLORS = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function header() {
  const lines = [
    'AEGIS INTERACTIVE INSTALLER',
    'Choose modules • Set paths • Generate agents & bundles',
  ];
  console.log(COLORS.cyan(lines.join('\n')));
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

function readYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.parse(content);
}

function listModuleConfigs() {
  const modsDir = path.join(SOURCE_ROOT, 'modules');
  const entries = fs.readdirSync(modsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const cfgPath = path.join(modsDir, e.name, '_module-installer', 'install-config.yaml');
      return { rawName: e.name, cfgPath };
    })
    .filter((m) => fs.existsSync(m.cfgPath));
}

async function promptQuestion(rl, promptText, defaultValue, choices, validator) {
  let suffix = defaultValue !== undefined && defaultValue !== null ? ` [${defaultValue}]` : '';
  if (choices && choices.length > 0) {
    suffix += ` (${choices.map((c, idx) => `${idx + 1}:${c.label || c}`).join(', ')})`;
  }
  const answer = await rl.question(`${promptText}${suffix}: `);
  const value = answer.trim() === '' && defaultValue !== undefined ? defaultValue : answer.trim();
  if (validator && !validator(value)) {
    console.log(COLORS.yellow('  ↳ Invalid value, please try again.'));
    return promptQuestion(rl, promptText, defaultValue, choices, validator);
  }
  if (choices && choices.length > 0) {
    const num = Number(value);
    if (!Number.isNaN(num) && num >= 1 && num <= choices.length) {
      return choices[num - 1].value || choices[num - 1];
    }
    const match = choices.find((c) => (c.value || c).toString() === value);
    if (match) return match.value || match;
    console.log(COLORS.yellow('  ↳ Choose a valid option.'));
    return promptQuestion(rl, promptText, defaultValue, choices, validator);
  }
  return value;
}

function resolvePlaceholders(str, context) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{([^}]+)\}/g, (_, key) => {
    if (key === 'project-root') return context.projectRoot;
    if (key === 'output_folder') return context.output_folder || '{output_folder}';
    return context[key] !== undefined ? context[key] : `{${key}}`;
  });
}

function normalizePath(input, projectRoot) {
  const candidate = path.isAbsolute(input) ? input : path.join(projectRoot, input);
  const resolved = path.resolve(candidate);
  if (!resolved.startsWith(path.resolve(projectRoot))) {
    throw new Error(`Path escapes project root: ${input}`);
  }
  return resolved;
}

async function collectConfigAnswers(rl, installCfg, contextOverrides = {}) {
  const answers = {};
  const entries = Object.entries(installCfg).filter(
    ([key]) => !['header', 'subheader', 'code', 'name', 'default_selected'].includes(key),
  );
  for (const [key, meta] of entries) {
    const mergedContext = { ...contextOverrides, ...answers };
    const promptText = Array.isArray(meta.prompt) ? meta.prompt.join(' ') : meta.prompt || key;
    let defaultVal = meta.default;
    if (typeof defaultVal === 'string') {
      defaultVal = resolvePlaceholders(defaultVal, mergedContext);
    }
    const choices = Array.isArray(meta['single-select']) ? meta['single-select'] : null;
    const validator = meta.regex ? (val) => new RegExp(meta.regex).test(val) : null;
    const answer = await promptQuestion(rl, promptText, defaultVal, choices, validator);
    answers[key] = answer;
  }
  return { ...contextOverrides, ...answers };
}

async function runCoreInstaller(projectRoot, installFolder, coreAnswers) {
  const coreDir = path.join(projectRoot, installFolder, 'core');
  await ensureDir(coreDir);
  const cfgPath = path.join(coreDir, 'config.yaml');
  const yamlBody = [
    '# Aegis core configuration',
    ...Object.entries(coreAnswers).map(([k, v]) => `${k}: ${v}`),
  ].join('\n');
  await fsp.writeFile(cfgPath, yamlBody, 'utf8');
}

async function runMethodInstaller(projectRoot, installFolder, moduleAnswers) {
  const base = path.join(projectRoot, installFolder, 'method');
  await ensureDir(base);
  const { output_folder, sprint_artifacts, tech_docs } = moduleAnswers;
  if (output_folder) {
    const dest = normalizePath(output_folder.replace('{project-root}/', ''), projectRoot);
    await ensureDir(dest);
  }
  if (sprint_artifacts) {
    const dest = normalizePath(sprint_artifacts.replace('{project-root}/', ''), projectRoot);
    await ensureDir(dest);
  }
  if (tech_docs) {
    const dest = normalizePath(tech_docs.replace('{project-root}/', ''), projectRoot);
    await ensureDir(dest);
    const templateSrc = path.join(SOURCE_ROOT, 'modules', 'method', '_module-installer', 'assets', 'technical-deinnovationions-template.md');
    const templateDest = path.join(dest, 'technical-deinnovationions-template.md');
    if (fs.existsSync(templateSrc) && !fs.existsSync(templateDest)) {
      await fsp.copyFile(templateSrc, templateDest);
    }
  }
}

async function runBuilderInstaller(projectRoot, installFolder, moduleAnswers, coreAnswers) {
  const base = path.join(projectRoot, installFolder, 'builder');
  await ensureDir(base);
  const { custom_stand_alone_location, custom_module_location } = moduleAnswers;
  if (custom_stand_alone_location) {
    const destDir = normalizePath(custom_stand_alone_location, projectRoot);
    await ensureDir(destDir);
    const customYaml = `code: my-custom-aegis\nname: "${(coreAnswers.user_name || 'my')}-Custom-Aegis"\ndefault_selected: true\n`;
    const customPath = path.join(destDir, 'custom.yaml');
    if (!fs.existsSync(customPath)) {
      await fsp.writeFile(customPath, customYaml, 'utf8');
    }
  }
  if (custom_module_location) {
    const destDir = normalizePath(custom_module_location, projectRoot);
    await ensureDir(destDir);
  }
}

async function runInnovationInstaller(projectRoot, installFolder, moduleAnswers) {
  const base = path.join(projectRoot, installFolder, 'innovation');
  await ensureDir(base);
  if (moduleAnswers.output_folder) {
    const dest = normalizePath(moduleAnswers.output_folder.replace('{project-root}/', ''), projectRoot);
    await ensureDir(dest);
    const assetsDir = path.join(SOURCE_ROOT, 'modules', 'innovation', '_module-installer', 'assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      for (const file of files) {
        const src = path.join(assetsDir, file);
        const dst = path.join(dest, file);
        if (!fs.existsSync(dst)) {
          await fsp.copyFile(src, dst);
        }
      }
    }
  }
}

async function runGamedevInstaller(projectRoot, installFolder, moduleAnswers) {
  const base = path.join(projectRoot, installFolder, 'gamedev');
  await ensureDir(base);
  if (moduleAnswers.output_folder) {
    const dest = normalizePath(moduleAnswers.output_folder.replace('{project-root}/', ''), projectRoot);
    await ensureDir(dest);
  }
}

async function updateMcpConfig(editor, projectRoot, serverName, serverUrl) {
  const targetFile =
    editor === 'cursor'
      ? path.join(projectRoot, '.cursor', 'mcp.json')
      : path.join(projectRoot, '.vscode', 'mcp.json');
  await ensureDir(path.dirname(targetFile));
  let data = { mcpServers: {} };
  if (fs.existsSync(targetFile)) {
    try {
      data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    } catch {
      data = { mcpServers: {} };
    }
  }
  if (!data.mcpServers) data.mcpServers = {};
  data.mcpServers[serverName] = {
    url: serverUrl,
    headers: {},
  };
  fs.writeFileSync(targetFile, JSON.stringify(data, null, 2), 'utf8');
}

async function main() {
  header();

  if (!fs.existsSync(SOURCE_ROOT)) {
    console.error('source/aegis not found. Run the upstream sync first.');
    process.exit(1);
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const projectRoot = process.cwd();
  const directoryName = path.basename(projectRoot);

  // Core prompts
  const coreCfg = readYaml(path.join(SOURCE_ROOT, 'core', '_module-installer', 'install-config.yaml'));
  console.log(COLORS.magenta(`\n${coreCfg.header || 'Core Configuration'}`));
  if (coreCfg.subheader) console.log(COLORS.dim(coreCfg.subheader));
  const coreAnswersRaw = await collectConfigAnswers(rl, coreCfg, { projectRoot, directory_name: directoryName });
  const coreAnswers = { ...coreAnswersRaw };
  if (coreAnswers.output_folder) {
    coreAnswers.output_folder = normalizePath(
      resolvePlaceholders(coreAnswers.output_folder, { projectRoot }),
      projectRoot,
    );
  }
  if (coreAnswers.agent_sidecar_folder) {
    coreAnswers.agent_sidecar_folder = normalizePath(
      resolvePlaceholders(coreAnswers.agent_sidecar_folder, { projectRoot }),
      projectRoot,
    );
  }
  const installFolder = coreAnswers.aegis_folder || '.aegis';

  // Module selection
  const moduleConfigs = listModuleConfigs();
  const selectedModules = [];
  for (const mod of moduleConfigs) {
    const rawCfg = readYaml(mod.cfgPath);
    const targetName = MODULE_MAP[mod.rawName] || mod.rawName;
    const defaultSelected = rawCfg.default_selected === true;
    const yesNo = await promptQuestion(
      rl,
      `Install module ${targetName}?`,
      defaultSelected ? 'y' : 'n',
      null,
      (v) => ['y', 'n', 'Y', 'N'].includes(v.toLowerCase()),
    );
    if (yesNo.toLowerCase() === 'y') {
      console.log(COLORS.magenta(`\n${rawCfg.header || targetName}`));
      if (rawCfg.subheader) console.log(COLORS.dim(rawCfg.subheader));
      const answersRaw = await collectConfigAnswers(rl, rawCfg, { projectRoot, directory_name: directoryName, ...coreAnswers });
      // Resolve placeholders using core answers
      const resolved = {};
      for (const [k, v] of Object.entries(answersRaw)) {
        if (typeof v === 'string') {
          resolved[k] = resolvePlaceholders(v, { projectRoot, directory_name: directoryName, ...coreAnswers });
        } else {
          resolved[k] = v;
        }
      }
      selectedModules.push({ rawName: mod.rawName, targetName, cfg: rawCfg, answers: resolved });
    }
  }

  // Run installers
  await ensureDir(path.join(projectRoot, installFolder));
  await runCoreInstaller(projectRoot, installFolder, coreAnswers);
  for (const mod of selectedModules) {
    switch (mod.targetName) {
      case 'method':
        await runMethodInstaller(projectRoot, installFolder, mod.answers);
        break;
      case 'builder':
        await runBuilderInstaller(projectRoot, installFolder, mod.answers, coreAnswers);
        break;
      case 'innovation':
        await runInnovationInstaller(projectRoot, installFolder, mod.answers);
        break;
      case 'gamedev':
        await runGamedevInstaller(projectRoot, installFolder, mod.answers);
        break;
      default:
        break;
    }
  }

  // Optional MCP config for Test Architect enhancements
  const methodCfg = selectedModules.find((m) => m.targetName === 'method');
  if (methodCfg && methodCfg.answers.tea_use_mcp_enhancements) {
    const editorChoice = await promptQuestion(
      rl,
      'Which editor should receive Playwright MCP config? (cursor/vscode/skip)',
      'cursor',
      null,
      (v) => ['cursor', 'vscode', 'skip'].includes(v.toLowerCase()),
    );
    if (editorChoice.toLowerCase() !== 'skip') {
      const serverName = await promptQuestion(rl, 'MCP server name', 'AegisPlaywright');
      const serverUrl = await promptQuestion(rl, 'MCP server URL', 'http://localhost:7001');
      await updateMcpConfig(editorChoice.toLowerCase(), projectRoot, serverName, serverUrl);
      console.log(COLORS.green(`✓ Added MCP entry '${serverName}' to ${editorChoice === 'cursor' ? '.cursor/mcp.json' : '.vscode/mcp.json'}`));
    }
  }

  rl.close();

  console.log(COLORS.green('\n✓ Installation assets prepared. Running aegis:compile ...\n'));
  const result = spawnSync('npm', ['run', 'aegis:compile', '--', '--ide-claude', '.claude', '--ide-cursor', '.cursor'], {
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    console.warn(COLORS.yellow('Compile failed or aborted; check the logs.'));
  } else {
    console.log(COLORS.green('✓ Compile complete.'));
  }
}

main().catch((err) => {
  console.error(`Installer failed: ${err.message}`);
  process.exit(1);
});
