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
  let currentListKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Parse key: value (with or without value)
    const keyMatch = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1].trim();
      let value = keyMatch[2].trim();
      
      // If value is empty, this might be the start of a list
      if (value === "") {
        currentListKey = key;
        meta[key] = [];
        continue;
      }

      // Ensure value is a string before string operations
      if (typeof value !== "string") {
        meta[key] = value;
        currentListKey = null;
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
      currentListKey = null;
    } else if (trimmed.startsWith("-") && trimmed !== "---") {
      // Handle list items (for globs, coreAgents, etc.)
      // Skip lines that are just "---" (YAML frontmatter delimiter)
      const itemMatch = trimmed.match(/^-\s*(.+)$/);
      if (itemMatch) {
        let itemValue = itemMatch[1].trim();
        // Remove quotes if present
        if ((itemValue.startsWith('"') && itemValue.endsWith('"')) || (itemValue.startsWith("'") && itemValue.endsWith("'"))) {
          itemValue = itemValue.slice(1, -1);
        }
        
        // Use currentListKey if set, otherwise default to globs for backward compatibility
        const listKey = currentListKey || "globs";
        if (!meta[listKey]) meta[listKey] = [];
        meta[listKey].push(itemValue);
      }
    } else {
      // If we see a non-list line, reset currentListKey
      currentListKey = null;
    }
  }

  // Clean up temporary tracking
  delete meta._currentListKey;

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

