const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

function parseFrontmatter(content) {
  const parts = content.split('---');
  if (parts.length < 3) {
    return { frontmatter: {}, body: content };
  }
  const frontmatterRaw = parts[1];
  const body = parts.slice(2).join('---').trimStart();
  const frontmatter = yaml.load(frontmatterRaw) || {};
  return { frontmatter, body };
}

function parseSections(body) {
  const sections = {};
  const lines = body.split(/\r?\n/);
  let current = null;
  for (const line of lines) {
    const headerMatch = line.match(/^\[(.+)]\s*$/);
    if (headerMatch) {
      current = headerMatch[1].trim().toUpperCase();
      sections[current] = [];
      continue;
    }
    if (current) {
      sections[current].push(line);
    }
  }
  const normalized = {};
  for (const [key, value] of Object.entries(sections)) {
    const text = value.join('\n').trim();
    normalized[key] = text;
  }
  return normalized;
}

function loadAegisAgent(filePath) {
  const resolved = path.resolve(filePath);
  const content = fs.readFileSync(resolved, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);
  const sections = parseSections(body);
  return { frontmatter, sections, raw: content };
}

module.exports = { loadAegisAgent };
