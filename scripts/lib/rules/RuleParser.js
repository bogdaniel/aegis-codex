#!/usr/bin/env node
/**
 * RuleParser - Parse frontmatter and rule body sections
 */

/**
 * Parse YAML frontmatter from rule file
 * @param {string} raw - Raw file content
 * @returns {{meta: Object, body: string}} Parsed metadata and body
 */
function parseFrontMatter(raw) {
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {
    return { body: raw, meta: {} };
  }

  const metaText = parts[1];
  const body = parts.slice(2).join("---\n");
  const meta = parseYamlMetadata(metaText);

  return { meta, body };
}

/**
 * Parse YAML metadata (simple parser for frontmatter)
 * @param {string} yamlText - YAML text between --- markers
 * @returns {Object} Parsed metadata
 */
function parseYamlMetadata(yamlText) {
  const meta = {};
  const lines = yamlText.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Parse key: value
    const match = trimmed.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();

      // Ensure value is a string before string operations
      if (typeof value !== "string") {
        meta[key] = value;
        continue;
      }

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse boolean values
      if (value === "true") value = true;
      else if (value === "false") value = false;

      // Parse arrays (simple list format) - only if still a string
      if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""));
      }

      meta[key] = value;
    } else if (trimmed.startsWith("-")) {
      // Handle list items (for globs)
      const itemMatch = trimmed.match(/^-\s*"(.+)"$/);
      if (itemMatch) {
        if (!meta.globs) meta.globs = [];
        meta.globs.push(itemMatch[1]);
      }
    }
  }

  return meta;
}

/**
 * Parse rule body into sections
 * @param {string} body - Rule body content
 * @returns {Array<{title: string, content: string[]}>} Array of sections
 */
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

/**
 * Parse a complete rule file
 * @param {string} filePath - Path to rule file
 * @param {string} content - File content
 * @returns {{meta: Object, sections: Array}} Parsed rule
 */
function parseRule(filePath, content) {
  const { meta, body } = parseFrontMatter(content);
  const sections = parseSections(body);
  return { meta, sections };
}

module.exports = {
  parseFrontMatter,
  parseYamlMetadata,
  parseSections,
  parseRule,
};

