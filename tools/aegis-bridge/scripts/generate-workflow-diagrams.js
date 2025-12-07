#!/usr/bin/env node
/**
 * Generate simple Mermaid diagrams for each workflow in .aegis/_cfg/workflow-manifest.csv.
 * Output: docs/workflow-diagrams/<module>/<workflow-name>.md
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');

const ROOT = process.cwd();
const Aegis_DIR = path.join(ROOT, '.aegis');
const MANIFEST = path.join(Aegis_DIR, '_cfg', 'workflow-manifest.csv');
const OUT_DIR = path.join(ROOT, 'docs', 'workflow-diagrams');
const INSTALL_FOLDER_NAME = path.basename(Aegis_DIR);

function readManifest() {
  if (!fs.existsSync(MANIFEST)) {
    throw new Error(`Manifest not found at ${MANIFEST}`);
  }
  const lines = fs.readFileSync(MANIFEST, 'utf8').trim().split(/\r?\n/);
  const rows = lines.slice(1); // skip header
  return rows
    .map((line) => line.split(','))
    .filter((cols) => cols.length >= 3)
    .map((cols) => ({
      name: cols[0],
      module: cols[1],
      relPath: cols[2],
      description: cols[3] || '',
    }));
}

function readWorkflow(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    return yaml.parse(content);
  }

  // Markdown with frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    try {
      return yaml.parse(match[1]);
    } catch {
      return {};
    }
  }
  return {};
}

function labelFromFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    // Drop frontmatter if present
    if (content.startsWith('---')) {
      const end = content.indexOf('\n---', 3);
      if (end !== -1) {
        content = content.slice(end + 4);
      }
    }
    const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return path.basename(filePath);
    // Prefer heading
    const heading = lines.find((l) => /^#+\s+/.test(l));
    const firstLine = heading ? heading.replace(/^#+\s+/, '') : lines[0];
    const cleaned = firstLine === '---' || firstLine === '' ? path.basename(filePath, path.extname(filePath)) : firstLine;
    return cleaned.length > 80 ? `${cleaned.slice(0, 77)}...` : cleaned;
  } catch {
    return path.basename(filePath);
  }
}

function extractStepsFromInstructions(instrPath) {
  if (!instrPath || !fs.existsSync(instrPath)) return [];
  const content = fs.readFileSync(instrPath, 'utf8');
  const steps = [];
  const ext = path.extname(instrPath).toLowerCase();

  if (ext === '.xml') {
    const regex = /<step[^>]*>([\s\S]*?)<\/step>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim().replace(/\s+/g, ' ');
      if (text) steps.push(text);
      if (steps.length >= 15) break;
    }
  } else {
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const heading = line.match(/^#+\s+(.*)/);
      if (heading) {
        const text = heading[1].trim();
        if (text) steps.push(text);
        continue;
      }
      const numbered = line.match(/^\s*\d+\.\s+(.*)/);
      if (numbered) {
        const text = numbered[1].trim();
        if (text) steps.push(text);
      }
      if (steps.length >= 15) break;
    }
  }

  const normalized = steps
    .map((s) => (s === '---' || s === '' ? null : s))
    .filter(Boolean);

  return normalized.map((label, idx) => ({ order: idx + 1, file: path.basename(instrPath), label }));
}

function collectSteps(srcPath) {
  const stepsDir = path.join(path.dirname(srcPath), 'steps');
  if (!fs.existsSync(stepsDir)) return [];

  const files = fs
    .readdirSync(stepsDir)
    .filter((f) => /\.(md|yaml|yml|xml)$/i.test(f))
    .sort();

  return files.map((file, idx) => ({
    order: idx + 1,
    file,
    label: labelFromFile(path.join(stepsDir, file)),
  }));
}

function resolveInstructionPath(instrValue, srcPath) {
  if (!instrValue || typeof instrValue !== 'string') return null;
  const baseDir = path.dirname(srcPath);
  let candidate = instrValue
    .replace(/{installed_path}/g, baseDir)
    .replace(/{project-root}/g, ROOT)
    .replace(/{aegis_folder}/g, INSTALL_FOLDER_NAME);
  if (!path.isAbsolute(candidate)) {
    candidate = path.join(baseDir, candidate);
  }
  return candidate;
}

function cleanId(input) {
  if (typeof input !== 'string') {
    input = String(input || '');
  }
  const cleaned = input.replace(/[^a-zA-Z0-9_]/g, '_');
  // Mermaid ids cannot start with a digit; prefix if needed.
  if (/^[0-9]/.test(cleaned)) return `wf_${cleaned}`;
  return cleaned || 'wf_node';
}

function mermaidForWorkflow(meta) {
  const nodes = [];
  const edges = [];
  const workflowId = cleanId(meta.name || meta.fileBase || 'workflow');
  const wfLabel = String(meta.name || meta.fileBase || 'workflow').replace(/"/g, "'");
  nodes.push(`  ${workflowId}["${wfLabel}"]`);

  const addNode = (label, value) => {
    if (!value) return;
    const id = cleanId(`${label}_${value}`).slice(0, 48) || `${label}_node`;
    const nodeLabel = `${label}: ${value}`.replace(/"/g, "'");
    nodes.push(`  ${id}["${nodeLabel}"]`);
    edges.push(`  ${workflowId} -->|${label}| ${id}`);
  };

  addNode('instructions', meta.instructions);
  addNode('template', meta.template);
  addNode('path_files', meta.path_files);
  addNode('default_output', meta.default_output_file);

  if (meta.input_file_patterns && typeof meta.input_file_patterns === 'object') {
    Object.entries(meta.input_file_patterns).forEach(([key, value]) => {
      const valText = Array.isArray(value) ? value.join('; ') : String(value);
      addNode(`input:${key}`, valText);
    });
  }

  if (Array.isArray(meta.steps) && meta.steps.length > 0) {
    let prev = workflowId;
    meta.steps.forEach((step) => {
      const stepId = cleanId(`step_${step.order}_${step.file}`);
      const label = `Step ${step.order}: ${step.label}`;
      nodes.push(`  ${stepId}["${label.replace(/"/g, "'")}"]`);
      edges.push(`  ${prev} --> ${stepId}`);
      prev = stepId;
    });
  }

  // If no edges, add placeholder note to make diagram non-empty
  if (edges.length === 0) {
    const noteId = cleanId(`${workflowId}_details`);
    nodes.push(`  ${noteId}["No additional metadata"]`);
    edges.push(`  ${workflowId} --> ${noteId}`);
  }

  return ['```mermaid', 'flowchart TD', ...nodes, ...edges, '```'].join('\n');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeDiagram(entry) {
  const srcPath = path.join(Aegis_DIR, entry.relPath);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skip missing workflow: ${entry.relPath}`);
    return;
  }

  const wf = readWorkflow(srcPath) || {};
  const fileBase = path.basename(srcPath, path.extname(srcPath));
  const stepsFromDir = collectSteps(srcPath);
  let steps = stepsFromDir;
  if (steps.length === 0 && wf.instructions) {
    const resolvedInstr = resolveInstructionPath(wf.instructions, srcPath);
    const inferred = extractStepsFromInstructions(resolvedInstr);
    if (inferred.length > 0) {
      steps = inferred;
    }
  }

  const diagram = mermaidForWorkflow({
    name: wf.name || entry.name || fileBase,
    fileBase,
    description: wf.description || entry.description || '',
    instructions: wf.instructions,
    template: wf.template,
    path_files: wf.path_files,
    default_output_file: wf.default_output_file,
    input_file_patterns: wf.input_file_patterns,
    steps,
  });

  const outDir = path.join(OUT_DIR, entry.module || 'workflows');
  ensureDir(outDir);
  const outPath = path.join(outDir, `${fileBase}.md`);

  const lines = [
    `# ${wf.name || entry.name || fileBase}`,
    '',
    entry.description || wf.description || '',
    '',
    diagram,
    '',
    `Source: ${entry.relPath}`,
  ]
    .filter(Boolean)
    .join('\n');

  fs.writeFileSync(outPath, lines, 'utf8');
}

function main() {
  const entries = readManifest();
  // Clean output directory
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }

  entries.forEach(writeDiagram);
  console.log(`Generated diagrams for ${entries.length} workflows into ${OUT_DIR}`);
}

main();
