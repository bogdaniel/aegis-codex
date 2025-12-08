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

  function numericPrefix(relativePath) {
    const base = relativePath.split("/").pop();
    const match = base && base.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  }

  return rules.sort((a, b) => {
    const aNum = numericPrefix(a.relativePath);
    const bNum = numericPrefix(b.relativePath);
    if (aNum !== bNum) return aNum - bNum;

    const nameCompare = a.name.localeCompare(b.name);
    if (nameCompare !== 0) return nameCompare;

    return a.relativePath.localeCompare(b.relativePath);
  });
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
