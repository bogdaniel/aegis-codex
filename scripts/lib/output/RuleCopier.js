#!/usr/bin/env node
/**
 * RuleCopier - Copy selected rules from rules/ to .cursor/rules/ (artifact/export)
 */

const fs = require("fs");
const path = require("path");

/**
 * Copy selected rules to output directory
 * @param {Array<Object>} selectedRules - Rules to copy
 * @param {string} sourceDir - Source directory (rules/)
 * @param {string} outputDir - Output directory (.cursor/rules/)
 * @param {boolean} dryRun - If true, don't actually copy, just log what would be copied
 * @returns {Object} Copy result { copied: number, skipped: number, errors: string[] }
 */
function copyRules(selectedRules, sourceDir, outputDir, dryRun = false) {
  const result = {
    copied: 0,
    skipped: 0,
    errors: [],
  };

  // Ensure output directory exists
  if (!dryRun) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }

  for (const rule of selectedRules) {
    const sourcePath = rule.filePath;
    const relativePath = rule.relativePath;
    // Flatten core/topics/methodologies/languages into root to preserve legacy .cursor paths,
    // but keep agents and patterns in their subdirectories to avoid name collisions.
    const isPattern = relativePath.startsWith("patterns/");
    const isAgent = relativePath.startsWith("agents/");
    const baseName = path.basename(relativePath);
    const flattenExceptions = ["3A-anti-patterns.mdc"];
    const targetRelativePath =
      isAgent
        ? relativePath
        : isPattern && !flattenExceptions.includes(baseName)
        ? relativePath
        : baseName;
    const outputPath = path.join(outputDir, targetRelativePath);
    const outputDirPath = path.dirname(outputPath);

    try {
      if (dryRun) {
        console.log(`[DRY RUN] Would copy: ${relativePath}`);
        result.copied++;
        continue;
      }

      // Ensure subdirectory exists
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Copy file
      fs.copyFileSync(sourcePath, outputPath);
      result.copied++;
    } catch (error) {
      result.errors.push(`Failed to copy ${relativePath}: ${error.message}`);
      result.skipped++;
    }
  }

  return result;
}

module.exports = {
  copyRules,
};
