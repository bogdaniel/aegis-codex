#!/usr/bin/env node
/**
 * Generate AGENTS.md from .cursor/rules/*.mdc so rules are single-sourced.
 * Usage: node scripts/build-agents-doc.js [--out AGENTS.md] [--src .cursor/rules]
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

function readFileSafe(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseFrontMatter(raw) {
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {
    return { body: raw, meta: {} };
  }
  const metaText = parts[1];
  const body = parts.slice(2).join("---\n");
  const meta = {};
  const desc = metaText.match(/description:\s*"?(.+?)"?\s*$/m);
  if (desc) meta.description = desc[1];
  const globs = Array.from(metaText.matchAll(/-\s*"(.+?)"/g)).map((m) => m[1]);
  if (globs.length) meta.globs = globs;
  return { meta, body };
}

function parseSections(body) {
  const lines = body.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    const header = line.match(/^\[(.+?)\]\s*$/);
    if (header) {
      current = { title: header[1], content: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;
    current.content.push(line);
  }
  return sections;
}

function parseRule(filePath) {
  const raw = readFileSafe(filePath);
  const { meta, body } = parseFrontMatter(raw);
  const sections = parseSections(body);
  return { meta, sections };
}

function renderRule(name, rule) {
  const lines = [];
  const desc = rule.meta.description ? ` — ${rule.meta.description}` : "";
  lines.push(`## ${name}${desc}`.trim());
  if (rule.meta.globs && rule.meta.globs.length) {
    lines.push(`- Globs: ${rule.meta.globs.join(", ")}`);
  }
  for (const section of rule.sections) {
    lines.push("");
    lines.push(`### [${section.title}]`);
    const content = section.content.join("\n").trimEnd();
    if (content) lines.push(content);
  }
  lines.push("");
  return lines.join("\n");
}

function renderDocument(rules) {
  const lines = [];
  lines.push(`# AGENTS (generated from .cursor/rules)`);
  lines.push(`> Do not edit by hand. Run: node scripts/build-agents-doc.js`);
  lines.push("");

  lines.push(`[RULE FILE ORDER]`);
  lines.push(
    "- Cursor loads rules by filename priority: `00-persona.mdc` (system bootstrap/handshake) → `10-global.mdc` → `20-agents.mdc` → `30-38*.mdc` (security, testing, observability, performance, CI, API, architecture, code-structure, compliance) → `40-44*.mdc` (ATDD, BDD, TDD, FDD, DDD) → `50-lang-*.mdc` (language-specific). Keep this ordering when adding/updating rules."
  );
  lines.push("");

  const groups = [
    { title: "[PERSONA/GLOBAL/AGENTS] (00-29)", match: (name) => /^0[0-9]-/.test(name) || /^1[0-9]-/.test(name) || /^20-/.test(name) },
    { title: "[TOPIC STANDARDS] (LLM-facing mirrors in .cursor/rules/30-38)", match: (name) => /^3[0-8]-/.test(name) },
    { title: "[METHODOLOGIES] (ATDD/BDD/TDD/FDD/DDD)", match: (name) => /^4[0-4]-/.test(name) },
    { title: "[LANGUAGE STANDARDS] (50-lang-*.mdc)", match: (name) => /^50-lang-/.test(name) },
  ];

  let currentGroup = null;
  for (const { name, data } of rules) {
    const group = groups.find((g) => g.match(name));
    if (group && group !== currentGroup) {
      lines.push(group.title);
      lines.push("");
      currentGroup = group;
    }
    lines.push(renderRule(name, data));
  }
  return lines.join("\n");
}

async function promptLangs(available) {
  return await new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const prompt = `Select languages (comma-separated) from [${available.join(", ")}], or press Enter for all: `;
    rl.question(prompt, (answer) => {
      rl.close();
      const trimmed = answer.trim();
      if (!trimmed) return resolve(null);
      const set = new Set(
        trimmed
          .split(/[,\s]+/)
          .map((s) => s.trim())
          .filter(Boolean)
      );
      resolve(set);
    });
  });
}

function resolveOutPath(args) {
  const outIdx = args.indexOf("--out");
  const candidate = outIdx !== -1 ? args[outIdx + 1] : null;
  // If --out is provided without a value or followed by another flag, default to AGENTS.generated.md to avoid accidental overwrite.
  if (outIdx !== -1 && (!candidate || candidate.startsWith("--"))) {
    return path.resolve(process.cwd(), "AGENTS.generated.md");
  }
  if (candidate) return path.resolve(process.cwd(), candidate);
  return path.resolve(process.cwd(), "AGENTS.md");
}

async function main() {
  const args = process.argv.slice(2);
  const srcIdx = args.indexOf("--src");
  const langsIdx = args.indexOf("--langs");
  const sourceDir = path.resolve(
    process.cwd(),
    srcIdx !== -1 && args[srcIdx + 1] ? args[srcIdx + 1] : ".cursor/rules"
  );
  const outPath = resolveOutPath(args);

  const files = fs
    .readdirSync(sourceDir)
    .filter((f) => f.endsWith(".mdc"))
    .sort();

  const availableLangs = files
    .map((f) => f.match(/^50-lang-(.+)\.mdc$/))
    .filter(Boolean)
    .map((m) => m[1]);

  let requestedLangs = null;
  if (langsIdx !== -1) {
    const val = args[langsIdx + 1];
    if (val && !val.startsWith("--")) {
      requestedLangs = new Set(
        val
          .split(/[,\s]+/)
          .map((s) => s.trim())
          .filter(Boolean)
      );
    } else {
      requestedLangs = await promptLangs(availableLangs);
    }
  }

  const rules = files
    .filter((file) => {
      if (!requestedLangs) return true;
      const langMatch = file.match(/^50-lang-(.+)\.mdc$/);
      if (!langMatch) return true;
      return requestedLangs.has(langMatch[1]);
    })
    .map((file) => {
      const filePath = path.join(sourceDir, file);
      return { name: file, data: parseRule(filePath) };
    });

  const output = renderDocument(rules);
  fs.writeFileSync(outPath, output + "\n", "utf8");
  const langNote = requestedLangs ? ` (langs: ${[...requestedLangs].join(", ") || "all"})` : "";
  console.log(`Generated ${outPath} from ${rules.length} rule files${langNote}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
