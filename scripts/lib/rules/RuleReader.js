#!/usr/bin/env node
/**
 * RuleReader - Read rule files from rules/ directory
 */

const fs = require("fs");
const path = require("path");

/**
 * Read all rule files from a directory recursively
 * @param {string} rulesDir - Path to rules directory
 * @returns {Array<{filePath: string, relativePath: string, name: string}>} Array of rule file info
 */
function readRuleFiles(rulesDir) {
  if (!fs.existsSync(rulesDir)) {
    throw new Error(`Rules directory does not exist: ${rulesDir}`);
  }

  const rules = [];
  const rulesPath = path.resolve(rulesDir);

  function traverseDir(dir, relativePrefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        // Recursively traverse subdirectories (e.g., patterns/)
        traverseDir(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".mdc")) {
        rules.push({
          filePath: fullPath,
          relativePath,
          name: entry.name,
        });
      }
    }
  }

  traverseDir(rulesPath);
  return rules.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

/**
 * Read rule file content
 * @param {string} filePath - Path to rule file
 * @returns {string} File content
 */
function readRuleFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Rule file does not exist: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

module.exports = {
  readRuleFiles,
  readRuleFile,
};

