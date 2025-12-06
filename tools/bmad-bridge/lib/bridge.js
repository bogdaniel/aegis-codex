const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const { loadAegisAgent } = require('../util/mdc-parser');
const { validateAgentFile } = require('../schema/agent');
const { compileAgent } = require('./compiler');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listFiles(dir, predicate) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFiles(full, predicate));
    } else if (!predicate || predicate(full)) {
      results.push(full);
    }
  }
  return results;
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      copyDir(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function copyTree(srcRoot, destRoot, subpaths = []) {
  for (const sub of subpaths) {
    copyDir(path.join(srcRoot, sub), path.join(destRoot, sub));
  }
}

function ensureCoreConfig(outRoot, bmadFolder) {
  const coreDir = path.join(outRoot, bmadFolder, 'core');
  ensureDir(coreDir);
  const configPath = path.join(coreDir, 'config.yaml');

  if (!fs.existsSync(configPath)) {
    const content = '# BMAD core configuration\n'
      + `bmad_folder: "${bmadFolder}"\n`
      + 'user_name: "Aegis User"\n'
      + 'communication_language: "English"\n'
      + 'document_output_language: "English"\n'
      + 'output_folder: "{project-root}/docs"\n'
      + 'install_user_docs: true\n';
    fs.writeFileSync(configPath, content, 'utf8');
  }
}

function ensureModuleConfig(outRoot, bmadFolder, moduleName) {
  const moduleDir = path.join(outRoot, bmadFolder, moduleName);
  ensureDir(moduleDir);
  const configPath = path.join(moduleDir, 'config.yaml');
  if (!fs.existsSync(configPath)) {
    const content = `# ${moduleName.toUpperCase()} module configuration\nname: \"${moduleName.toUpperCase()}\"\nversion: \"0.0.0\"\nconfig_source: \"{project-root}/${bmadFolder}/${moduleName}/config.yaml\"\n`;
    fs.writeFileSync(configPath, content, 'utf8');
  }
}

function ensureCfg(outRoot, bmadFolder) {
  const cfgDir = path.join(outRoot, bmadFolder, '_cfg');
  ensureDir(cfgDir);

  const manifestPath = path.join(cfgDir, 'manifest.yaml');
  if (!fs.existsSync(manifestPath)) {
    const manifest = {
      version: '0.0.0',
      modules: ['bmm'],
      ides: [],
    };
    fs.writeFileSync(manifestPath, yaml.stringify(manifest), 'utf8');
  }

  const workflowManifestPath = path.join(cfgDir, 'workflow-manifest.csv');
  if (!fs.existsSync(workflowManifestPath)) {
    fs.writeFileSync(workflowManifestPath, 'name,module,path,description\n', 'utf8');
  }

  const taskManifestPath = path.join(cfgDir, 'task-manifest.csv');
  if (!fs.existsSync(taskManifestPath)) {
    fs.writeFileSync(taskManifestPath, 'name,module,path,description,standalone\n', 'utf8');
  }

  const toolManifestPath = path.join(cfgDir, 'tool-manifest.csv');
  if (!fs.existsSync(toolManifestPath)) {
    fs.writeFileSync(toolManifestPath, 'name,module,path,description,standalone\n', 'utf8');
  }
}

function generateManifests(outRoot, bmadFolder, modules = [], ides = []) {
  const base = path.join(outRoot, bmadFolder);
  const cfgDir = path.join(base, '_cfg');
  ensureDir(cfgDir);

  const workflowManifestPath = path.join(cfgDir, 'workflow-manifest.csv');
  const taskManifestPath = path.join(cfgDir, 'task-manifest.csv');
  const toolManifestPath = path.join(cfgDir, 'tool-manifest.csv');
  const manifestPath = path.join(cfgDir, 'manifest.yaml');

  const workflows = listFiles(path.join(base, 'bmm', 'workflows'), (f) => f.endsWith('workflow.yaml'));
  const workflowRows = ['name,module,path,description'];
  for (const file of workflows) {
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const name = parts[parts.length - 2];
    const module = parts[1] || 'bmm';
    workflowRows.push(`${name},${module},${rel},`);
  }
  fs.writeFileSync(workflowManifestPath, workflowRows.join('\n') + '\n', 'utf8');

  const tasks = [
    ...listFiles(path.join(base, 'core', 'tasks'), (f) => f.endsWith('.xml')),
    ...listFiles(path.join(base, 'bmm', 'tasks'), (f) => f.endsWith('.xml')),
  ];
  const taskRows = ['name,module,path,description,standalone'];
  for (const file of tasks) {
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const name = path.basename(file, path.extname(file));
    const module = parts[0] === 'core' ? 'core' : (parts[1] || 'bmm');
    taskRows.push(`${name},${module},${rel},,true`);
  }
  fs.writeFileSync(taskManifestPath, taskRows.join('\n') + '\n', 'utf8');

  // Tools are optional; keep header if none
  if (!fs.existsSync(toolManifestPath)) {
    fs.writeFileSync(toolManifestPath, 'name,module,path,description,standalone\n', 'utf8');
  }

  // Write manifest.yaml with real metadata
  let pkgVersion = '0.0.0';
  try {
    // eslint-disable-next-line global-require
    pkgVersion = require(path.resolve('package.json')).version || '0.0.0';
  } catch {
    pkgVersion = '0.0.0';
  }

  const manifest = {
    version: pkgVersion,
    modules: Array.from(new Set(modules)).sort(),
    ides: Array.from(new Set(ides)).sort(),
    installDate: new Date().toISOString(),
  };
  fs.writeFileSync(manifestPath, yaml.stringify(manifest), 'utf8');
}

function rewriteWorkflowPlaceholders(outRoot, bmadFolder) {
  const base = path.join(outRoot, bmadFolder);
  const workflows = listFiles(base, (f) => f.endsWith('workflow.yaml'));
  for (const wf of workflows) {
    let content = fs.readFileSync(wf, 'utf8');

    // Replace placeholder {bmad_folder}
    content = content.replaceAll('{bmad_folder}', bmadFolder);

    // Replace hard-coded bmad to current folder in config_source paths
    content = content.replaceAll('{project-root}/bmad/', `{project-root}/${bmadFolder}/`);

    // Normalize any double slashes (after replacements)
    content = content.replaceAll('//', '/');

    fs.writeFileSync(wf, content, 'utf8');
  }
}

function exportWorkflowsAndTasks(outRoot, bmadFolder) {
  const sourceRoot = path.resolve('tmp/BMAD-METHOD/src');
  if (!fs.existsSync(sourceRoot)) {
    console.warn('BMAD source not found at tmp/BMAD-METHOD/src; skipping workflow/task export');
    return;
  }

  // Core tasks
  copyDir(
    path.join(sourceRoot, 'core', 'tasks'),
    path.join(outRoot, bmadFolder, 'core', 'tasks'),
  );

  // Export modules found under src/modules
  const moduleRoot = path.join(sourceRoot, 'modules');
  if (fs.existsSync(moduleRoot)) {
    for (const entry of fs.readdirSync(moduleRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const mod = entry.name;
      // workflows
      copyDir(
        path.join(moduleRoot, mod, 'workflows'),
        path.join(outRoot, bmadFolder, mod, 'workflows'),
      );
      // tasks
      copyDir(
        path.join(moduleRoot, mod, 'tasks'),
        path.join(outRoot, bmadFolder, mod, 'tasks'),
      );
    }
  }
}

function exportBundles(outRoot, bmadFolder, modules = []) {
  const base = path.join(outRoot, bmadFolder);
  const bundlesRoot = path.join(outRoot, 'web-bundles');
  ensureDir(bundlesRoot);

  // Core tasks
  copyTree(base, bundlesRoot, ['core/tasks']);

  // Module workflows/tasks
  for (const mod of modules) {
    copyTree(base, bundlesRoot, [`${mod}/workflows`, `${mod}/tasks`]);
  }
}

function sectionText(sections, key, fallback = '') {
  return (sections[key] || '').trim() || fallback;
}

function buildGovernancePrompt(sections) {
  const parts = [];
  if (sections.RESPONSIBILITIES) {
    parts.push('Responsibilities:\n' + sections.RESPONSIBILITIES.trim());
  }
  if (sections.PRINCIPLES) {
    parts.push('Principles:\n' + sections.PRINCIPLES.trim());
  }
  if (sections.REFUSAL) {
    parts.push('Refusal policy:\n' + sections.REFUSAL.trim());
  }
  if (parts.length === 0) {
    return null;
  }
  return parts.join('\n\n');
}

function overlayAgent(templateYaml, aegis, mapping, bmadFolder) {
  const tpl = yaml.parse(templateYaml);
  const meta = tpl.agent.metadata || {};
  const sections = aegis.sections;
  const fm = aegis.frontmatter || {};

  const targetName = fm.agentName || meta.name || mapping.output;
  tpl.agent.metadata = {
    ...meta,
    name: targetName,
    title: fm.description || meta.title || targetName,
    module: mapping.module,
    id: `${bmadFolder}/${mapping.module}/agents/${mapping.output}.md`,
  };

  const persona = tpl.agent.persona || {};
  tpl.agent.persona = {
    role: sectionText(sections, 'ROLE', persona.role || ''),
    identity: sectionText(sections, 'IDENTITY', persona.identity || ''),
    communication_style: sectionText(sections, 'COMMUNICATION STYLE', persona.communication_style || ''),
    principles: sectionText(sections, 'PRINCIPLES', persona.principles || ''),
  };

  if (!Array.isArray(tpl.agent.critical_actions)) {
    tpl.agent.critical_actions = [];
  }
  if (sections.RESPONSIBILITIES) {
    const bullets = sections.RESPONSIBILITIES.split(/\n+/).filter(Boolean);
    for (const b of bullets) {
      if (!tpl.agent.critical_actions.includes(b.trim())) {
        tpl.agent.critical_actions.push(b.trim());
      }
    }
  }

  if (!Array.isArray(tpl.agent.prompts)) {
    tpl.agent.prompts = [];
  }
  const governancePrompt = buildGovernancePrompt(sections);
  if (governancePrompt) {
    tpl.agent.prompts.push({ id: 'aegis-governance', content: governancePrompt });
  }

  return yaml.stringify(tpl);
}

function stripFrontmatterAndFence(compiled) {
  let content = compiled;
  const fmMatch = content.match(/^---[\s\S]*?---\s*/);
  if (fmMatch) {
    content = content.slice(fmMatch[0].length);
  }
  content = content.replace(/^```xml\s*/m, '');
  content = content.replace(/```\s*$/m, '');
  return content.trim();
}

function buildAll(mappingPath, options = {}) {
  const outRoot = options.outRoot || '.';
  const bmadFolder = options.bmadFolder || '.bmad';
  const ideClaudeDir = options.ideClaudeDir || null;
  const ideCursorDir = options.ideCursorDir || null;
  const extraModules = (options.modules || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const mappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  const baseRoot = process.cwd();
  const resolvePath = (p) => (path.isAbsolute(p) ? p : path.resolve(baseRoot, p));
  const results = [];

  const modules = Array.from(new Set([...mappings.map((m) => m.module || 'bmm'), ...extraModules]));
  const ides = [];
  if (ideClaudeDir) ides.push('claude-code');
  if (ideCursorDir) ides.push('cursor');

  ensureCoreConfig(outRoot, bmadFolder);
  modules.forEach((m) => ensureModuleConfig(outRoot, bmadFolder, m));
  ensureCfg(outRoot, bmadFolder);
  exportWorkflowsAndTasks(outRoot, bmadFolder);
  rewriteWorkflowPlaceholders(outRoot, bmadFolder);
  generateManifests(outRoot, bmadFolder, modules, ides);
  exportBundles(outRoot, bmadFolder, modules);

  for (const mapping of mappings) {
    const templateContent = fs.readFileSync(resolvePath(mapping.template), 'utf8');
    const aegis = loadAegisAgent(resolvePath(mapping.aegisPath));
    const mergedYaml = overlayAgent(templateContent, aegis, mapping, bmadFolder);

    const validationPath = `src/modules/${mapping.module}/agents/${mapping.output}.agent.yaml`;
    const parsed = yaml.parse(mergedYaml);
    const validation = validateAgentFile(validationPath, parsed);
    if (!validation.success) {
      const issue = validation.error.issues[0];
      throw new Error(`Validation failed for ${mapping.aegisId}: ${issue.message} at ${issue.path.join('.')}`);
    }

    const compiled = compileAgent(mergedYaml, {}, mapping.output, `${bmadFolder}/${mapping.module}/agents/${mapping.output}.md`);

    const compiledDir = path.join(outRoot, bmadFolder, mapping.module, 'agents');
    ensureDir(compiledDir);
    const compiledPath = path.join(compiledDir, `${mapping.output}.md`);
    fs.writeFileSync(compiledPath, compiled.xml, 'utf8');

    if (ideClaudeDir) {
      const claudeBase = resolvePath(ideClaudeDir);
      const claudeAgentDir = path.join(claudeBase, 'agents', bmadFolder, mapping.module, 'agents');
      ensureDir(claudeAgentDir);
      const claudeAgentPath = path.join(claudeAgentDir, `${mapping.output}.md`);
      fs.writeFileSync(claudeAgentPath, compiled.xml, 'utf8');

      const claudeCmdDir = path.join(claudeBase, 'commands', 'bmad', mapping.module, 'agents');
      ensureDir(claudeCmdDir);
      const claudeCmdPath = path.join(claudeCmdDir, `${mapping.output}.md`);
      const desc = compiled.metadata?.title || compiled.metadata?.name || mapping.output;
      const cmd = `---\ndescription: '${(desc || '').replaceAll("'", "''")}'\n---\n\n# ${compiled.metadata?.name || mapping.output}\n\nLoad and run agent: {project-root}/${bmadFolder}/${mapping.module}/agents/${mapping.output}.md\n\n- Open the agent file above and follow its menu triggers exactly.\n- Do not skip activation steps; wait for user input before executing menu items.\n`;
      fs.writeFileSync(claudeCmdPath, cmd, 'utf8');
    }

    if (ideCursorDir) {
      const cursorBase = resolvePath(ideCursorDir);
      const cursorAgentDir = path.join(cursorBase, 'agents', bmadFolder, mapping.module, 'agents');
      ensureDir(cursorAgentDir);
      const cursorAgentPath = path.join(cursorAgentDir, `${mapping.output}.md`);
      fs.writeFileSync(cursorAgentPath, compiled.xml, 'utf8');

      const cursorCmdDir = path.join(cursorBase, 'commands', 'bmad', mapping.module, 'agents');
      ensureDir(cursorCmdDir);
      const cursorCmdPath = path.join(cursorCmdDir, `${mapping.output}.md`);
      const desc = compiled.metadata?.title || compiled.metadata?.name || mapping.output;
      const cmd = `---\ndescription: '${(desc || '').replaceAll("'", "''")}'\n---\n\n# ${compiled.metadata?.name || mapping.output}\n\nLoad and run agent: {project-root}/${bmadFolder}/${mapping.module}/agents/${mapping.output}.md\n\n- Open the agent file above and follow its menu triggers exactly.\n- Do not skip activation steps; wait for user input before executing menu items.\n`;
      fs.writeFileSync(cursorCmdPath, cmd, 'utf8');
    }

    const bundleDir = path.join(outRoot, 'web-bundles', mapping.module, 'agents');
    ensureDir(bundleDir);
    const bundlePath = path.join(bundleDir, `${mapping.output}.xml`);
    fs.writeFileSync(bundlePath, stripFrontmatterAndFence(compiled.xml), 'utf8');

    results.push({ mapping, compiledPath, bundlePath });
  }

  return results;
}

module.exports = { buildAll };
