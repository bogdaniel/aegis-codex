const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const { loadAegisAgent } = require('../util/mdc-parser');
const { validateAgentFile } = require('../schema/agent');
const { validateWorkflow, parseWorkflow } = require('./workflow-validator');
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

function ensureCoreConfig(outRoot, installFolder) {
  const coreDir = path.join(outRoot, installFolder, 'core');
  ensureDir(coreDir);
  const configPath = path.join(coreDir, 'config.yaml');

  if (!fs.existsSync(configPath)) {
    const content = '# Aegis core configuration\n'
      + `aegis_folder: "${installFolder}"\n`
      + 'user_name: "Aegis User"\n'
      + 'communication_language: "English"\n'
      + 'document_output_language: "English"\n'
      + 'output_folder: "{project-root}/docs"\n'
      + 'install_user_docs: true\n';
    fs.writeFileSync(configPath, content, 'utf8');
  }
}

function ensureModuleConfig(outRoot, installFolder, moduleName) {
  const moduleDir = path.join(outRoot, installFolder, moduleName);
  ensureDir(moduleDir);
  const configPath = path.join(moduleDir, 'config.yaml');
  if (!fs.existsSync(configPath)) {
    const content = `# ${moduleName.toUpperCase()} module configuration\nname: \"${moduleName.toUpperCase()}\"\nversion: \"0.0.0\"\nconfig_source: \"{project-root}/${installFolder}/${moduleName}/config.yaml\"\n`;
    fs.writeFileSync(configPath, content, 'utf8');
  }
}

function ensureCfg(outRoot, installFolder) {
  const cfgDir = path.join(outRoot, installFolder, '_cfg');
  ensureDir(cfgDir);

  const manifestPath = path.join(cfgDir, 'manifest.yaml');
  if (!fs.existsSync(manifestPath)) {
    const manifest = {
      version: '0.0.0',
      modules: ['method'],
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

function writeCsv(filePath, header, rows) {
  ensureDir(path.dirname(filePath));
  const content = [header, ...rows].join('\n') + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

function parseDescriptionFromContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // XML attribute description="..."
  const descAttr = content.match(/description="([^"]+)"/);
  if (descAttr) return descAttr[1];

  // Markdown frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    try {
      const fm = yaml.parse(fmMatch[1]);
      if (fm && fm.description) return String(fm.description);
    } catch {
      // ignore
    }
  }

  // Look for <objective>...</objective>
  const objectiveMatch = content.match(/<objective>([^<]+)<\/objective>/);
  if (objectiveMatch) return objectiveMatch[1].trim();

  return '';
}

function generateManifests(outRoot, installFolder, modules = [], ides = []) {
  const base = path.join(outRoot, installFolder);
  const cfgDir = path.join(base, '_cfg');
  ensureDir(cfgDir);

  const workflowManifestPath = path.join(cfgDir, 'workflow-manifest.csv');
  const taskManifestPath = path.join(cfgDir, 'task-manifest.csv');
  const toolManifestPath = path.join(cfgDir, 'tool-manifest.csv');
  const teamManifestPath = path.join(cfgDir, 'team-manifest.csv');
  const manifestPath = path.join(cfgDir, 'manifest.yaml');

  const workflows = listFiles(base, (f) => f.endsWith('workflow.yaml') || f.endsWith('workflow.md'));
  const workflowRows = [];
  for (const file of workflows) {
    if (file.includes('/workflows-legacy/')) {
      continue;
    }
    const validation = validateWorkflow(file);
    if (!validation.valid) {
      console.warn(`Skipping workflow ${file}: ${validation.reason}`);
      continue;
    }
    const wf = parseWorkflow(file) || {};
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const module = parts[0] === 'core' ? 'core' : (parts[1] || 'method');
    const name = validation.name || wf.name || parts[parts.length - 2] || path.basename(file, path.extname(file));
    const description = String(validation.description || wf.description || '').replaceAll(',', ' ');
    workflowRows.push(`${name},${module},${rel},${description}`);
  }
  writeCsv(workflowManifestPath, 'name,module,path,description', workflowRows);

  const tasks = [
    ...listFiles(path.join(base, 'core', 'tasks'), (f) => f.endsWith('.xml') || f.endsWith('.md')),
    ...listFiles(path.join(base, 'method', 'tasks'), (f) => f.endsWith('.xml') || f.endsWith('.md')),
    ...modules
      .filter((mod) => mod !== 'method')
      .flatMap((mod) => listFiles(path.join(base, mod, 'tasks'), (f) => f.endsWith('.xml') || f.endsWith('.md'))),
  ];
  const taskRows = tasks.map((file) => {
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const name = path.basename(file, path.extname(file));
    const module = parts[0] === 'core' ? 'core' : (parts[1] || 'method');
    const description = parseDescriptionFromContent(file).replaceAll(',', ' ');
    return `${name},${module},${rel},${description},true`;
  });
  writeCsv(taskManifestPath, 'name,module,path,description,standalone', taskRows);

  const tools = [
    ...listFiles(path.join(base, 'core', 'tools'), (f) => f.endsWith('.xml') || f.endsWith('.md')),
    ...listFiles(path.join(base, 'method', 'tools'), (f) => f.endsWith('.xml') || f.endsWith('.md')),
    ...modules
      .filter((mod) => mod !== 'method')
      .flatMap((mod) => listFiles(path.join(base, mod, 'tools'), (f) => f.endsWith('.xml') || f.endsWith('.md'))),
  ];
  const toolRows = tools.map((file) => {
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const name = path.basename(file, path.extname(file));
    const module = parts[0] === 'core' ? 'core' : (parts[1] || 'method');
    const description = parseDescriptionFromContent(file).replaceAll(',', ' ');
    return `${name},${module},${rel},${description},true`;
  });
  writeCsv(toolManifestPath, 'name,module,path,description,standalone', toolRows);

  const teams = [
    ...listFiles(path.join(base, 'method', 'teams'), (f) => f.endsWith('.csv') || f.endsWith('.yaml') || f.endsWith('.yml')),
    ...modules
      .filter((mod) => mod !== 'method')
      .flatMap((mod) =>
        listFiles(path.join(base, mod, 'teams'), (f) => f.endsWith('.csv') || f.endsWith('.yaml') || f.endsWith('.yml')),
      ),
  ];
  const teamRows = teams.map((file) => {
    const rel = path.relative(base, file).replace(/\\/g, '/');
    const parts = rel.split('/');
    const name = path.basename(file, path.extname(file));
    const module = parts[0] === 'core' ? 'core' : (parts[1] || 'method');
    return `${name},${module},${rel},`;
  });
  writeCsv(teamManifestPath, 'name,module,path,description', teamRows);

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

function rewriteWorkflowPlaceholders(outRoot, installFolder) {
  const base = path.join(outRoot, installFolder);
  const workflows = listFiles(base, (f) => f.endsWith('workflow.yaml'));
  for (const wf of workflows) {
    let content = fs.readFileSync(wf, 'utf8');

    // Replace folder placeholder
    content = content.replaceAll('{aegis_folder}', installFolder);

    // Normalize any double slashes (after replacements)
    content = content.replaceAll('//', '/');

    fs.writeFileSync(wf, content, 'utf8');
  }
}

function exportWorkflowsAndTasks(outRoot, installFolder) {
  // Use the in-repo install folder as the source of truth
  const sourceRoot = path.resolve(installFolder);
  if (!fs.existsSync(sourceRoot)) return;

  // Core tasks
  copyDir(
    path.join(sourceRoot, 'core', 'tasks'),
    path.join(outRoot, installFolder, 'core', 'tasks'),
  );
  // Core workflows
  copyDir(
    path.join(sourceRoot, 'core', 'workflows'),
    path.join(outRoot, installFolder, 'core', 'workflows'),
  );
  // Core tools
  copyDir(
    path.join(sourceRoot, 'core', 'tools'),
    path.join(outRoot, installFolder, 'core', 'tools'),
  );

  // Export modules found under install folder
  const moduleRoot = sourceRoot;
  const moduleEntries = fs
    .readdirSync(moduleRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'core' && entry.name !== '_cfg');

  for (const entry of moduleEntries) {
    const mod = entry.name;
    const srcBase = path.join(moduleRoot, mod);
    const dstBase = path.join(outRoot, installFolder, mod);

    const subdirs = [
      'workflows',
      path.join('docs', 'workflows'),
      path.join('reference', 'workflows'),
      'tasks',
      'tools',
      'teams',
    ];

    for (const sub of subdirs) {
      copyDir(path.join(srcBase, sub), path.join(dstBase, sub));
    }
  }
}

function exportBundles(outRoot, installFolder, modules = []) {
  const base = path.join(outRoot, installFolder);
  const bundlesRoot = path.join(outRoot, 'aegis-bundles');
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

function writeAgentManifest(outRoot, installFolder, agents = []) {
  const base = path.join(outRoot, installFolder);
  const cfgDir = path.join(base, '_cfg');
  ensureDir(cfgDir);
  const manifestPath = path.join(cfgDir, 'agent-manifest.csv');
  const rows = agents.map((agent) => {
    return [
      agent.name || '',
      agent.module || '',
      agent.path || '',
      (agent.title || '').replaceAll(',', ' '),
      (agent.icon || '').replaceAll(',', ' '),
      (agent.role || '').replaceAll(',', ' '),
      (agent.identity || '').replaceAll(',', ' '),
    ].join(',');
  });
  writeCsv(manifestPath, 'name,module,path,title,icon,role,identity', rows);
}

function overlayAgent(templateYaml, aegis, mapping, installFolder) {
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
    id: `${installFolder}/${mapping.module}/agents/${mapping.output}.md`,
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
  const installFolder = options.installFolder || '.aegis';
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
  const agentManifestEntries = [];

  const modules = Array.from(new Set([...mappings.map((m) => m.module || 'method'), ...extraModules]));
  const ides = [];
  if (ideClaudeDir) ides.push('claude-code');
  if (ideCursorDir) ides.push('cursor');

  ensureCoreConfig(outRoot, installFolder);
  modules.forEach((m) => ensureModuleConfig(outRoot, installFolder, m));
  ensureCfg(outRoot, installFolder);
  exportWorkflowsAndTasks(outRoot, installFolder);
  rewriteWorkflowPlaceholders(outRoot, installFolder);
  generateManifests(outRoot, installFolder, modules, ides);
  exportBundles(outRoot, installFolder, modules);

  for (const mapping of mappings) {
    const templateContent = fs.readFileSync(resolvePath(mapping.template), 'utf8');
    const aegis = loadAegisAgent(resolvePath(mapping.aegisPath));
    const mergedYaml = overlayAgent(templateContent, aegis, mapping, installFolder);

    const validationPath = `src/modules/${mapping.module}/agents/${mapping.output}.agent.yaml`;
    const parsed = yaml.parse(mergedYaml);
    const validation = validateAgentFile(validationPath, parsed);
    if (!validation.success) {
      const issue = validation.error.issues[0];
      throw new Error(`Validation failed for ${mapping.aegisId}: ${issue.message} at ${issue.path.join('.')}`);
    }

    const compiled = compileAgent(mergedYaml, {}, mapping.output, `${installFolder}/${mapping.module}/agents/${mapping.output}.md`);

    const compiledDir = path.join(outRoot, installFolder, mapping.module, 'agents');
    ensureDir(compiledDir);
    const compiledPath = path.join(compiledDir, `${mapping.output}.md`);
    fs.writeFileSync(compiledPath, compiled.xml, 'utf8');

    if (ideClaudeDir) {
      const claudeBase = resolvePath(ideClaudeDir);
      const claudeAgentDir = path.join(claudeBase, 'agents', installFolder, mapping.module, 'agents');
      ensureDir(claudeAgentDir);
      const claudeAgentPath = path.join(claudeAgentDir, `${mapping.output}.md`);
      fs.writeFileSync(claudeAgentPath, compiled.xml, 'utf8');

      const claudeCmdDir = path.join(claudeBase, 'commands', 'aegis', mapping.module, 'agents');
      ensureDir(claudeCmdDir);
      const claudeCmdPath = path.join(claudeCmdDir, `${mapping.output}.md`);
      const desc = compiled.metadata?.title || compiled.metadata?.name || mapping.output;
      const cmd = `---\ndescription: '${(desc || '').replaceAll("'", "''")}'\n---\n\n# ${compiled.metadata?.name || mapping.output}\n\nLoad and run agent: {project-root}/${installFolder}/${mapping.module}/agents/${mapping.output}.md\n\n- Open the agent file above and follow its menu triggers exactly.\n- Do not skip activation steps; wait for user input before executing menu items.\n`;
      fs.writeFileSync(claudeCmdPath, cmd, 'utf8');
    }

    if (ideCursorDir) {
      const cursorBase = resolvePath(ideCursorDir);
      const cursorAgentDir = path.join(cursorBase, 'agents', installFolder, mapping.module, 'agents');
      ensureDir(cursorAgentDir);
      const cursorAgentPath = path.join(cursorAgentDir, `${mapping.output}.md`);
      fs.writeFileSync(cursorAgentPath, compiled.xml, 'utf8');

      const cursorCmdDir = path.join(cursorBase, 'commands', 'aegis', mapping.module, 'agents');
      ensureDir(cursorCmdDir);
      const cursorCmdPath = path.join(cursorCmdDir, `${mapping.output}.md`);
      const desc = compiled.metadata?.title || compiled.metadata?.name || mapping.output;
      const cmd = `---\ndescription: '${(desc || '').replaceAll("'", "''")}'\n---\n\n# ${compiled.metadata?.name || mapping.output}\n\nLoad and run agent: {project-root}/${installFolder}/${mapping.module}/agents/${mapping.output}.md\n\n- Open the agent file above and follow its menu triggers exactly.\n- Do not skip activation steps; wait for user input before executing menu items.\n`;
      fs.writeFileSync(cursorCmdPath, cmd, 'utf8');
    }

    const bundleDir = path.join(outRoot, 'aegis-bundles', mapping.module, 'agents');
    ensureDir(bundleDir);
    const bundlePath = path.join(bundleDir, `${mapping.output}.xml`);
    fs.writeFileSync(bundlePath, stripFrontmatterAndFence(compiled.xml), 'utf8');

    const relCompiledPath = path.relative(path.join(outRoot, installFolder), compiledPath).replace(/\\/g, '/');
    const persona = parsed?.agent?.persona || {};
    agentManifestEntries.push({
      name: mapping.output,
      module: mapping.module,
      path: relCompiledPath,
      title: compiled.metadata?.title || compiled.metadata?.name || '',
      icon: compiled.metadata?.icon || '',
      role: persona.role || '',
      identity: persona.identity || '',
    });

    results.push({ mapping, compiledPath, bundlePath });
  }

  writeAgentManifest(outRoot, installFolder, agentManifestEntries);

  return results;
}

module.exports = { buildAll };
