#!/usr/bin/env node
/**
 * RepositoryCleaner - Clean up non-essential files after rule generation
 * 
 * Removes builder-related files that aren't needed in the final project:
 * - rules/ (source rules)
 * - scripts/ (build scripts)
 * - docs/ (builder documentation)
 * - tests/ (test files)
 * - examples/ (examples)
 * - test/ (test app)
 * - Example config files
 */

const fs = require("fs");
const path = require("path");

/**
 * Files and directories to remove during cleanup
 */
const CLEANUP_PATHS = [
  "rules/",
  "scripts/",
  "docs/",
  "tests/",
  "examples/",
  "test/",
  ".github/", // CI workflows for the builder
  "Makefile", // Builder makefile
  "CONTRIBUTING.md", // Builder contribution guide
];

/**
 * Files to keep (even if in cleanup paths)
 */
const KEEP_FILES = [
  ".aegis-rules.json", // User's config
  "README.md", // Project README (will be updated)
  "LICENSE", // License file
  ".gitignore", // Git ignore
  ".git/", // Git directory
  ".cursor/", // Generated rules
  "AGENTS.md", // Generated agents doc
];

/**
 * Clean up repository after rule generation
 * @param {string} rootDir - Root directory of the project
 * @param {boolean} dryRun - If true, don't actually delete, just log what would be deleted
 * @returns {Object} Cleanup result { removed: number, errors: string[] }
 */
function cleanRepository(rootDir, dryRun = false) {
  const result = {
    removed: 0,
    errors: [],
  };

  console.log("\nCleaning up repository...");
  console.log("Removing builder-related files and directories...\n");

  for (const item of CLEANUP_PATHS) {
    const itemPath = path.join(rootDir, item);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(itemPath)) {
      continue;
    }

    // Skip if in keep list
    if (shouldKeep(itemPath, rootDir)) {
      continue;
    }

    try {
      const stats = fs.statSync(itemPath);
      
      if (dryRun) {
        console.log(`[DRY RUN] Would remove: ${item}`);
        result.removed++;
      } else {
        if (stats.isDirectory()) {
          fs.rmSync(itemPath, { recursive: true, force: true });
          console.log(`✓ Removed directory: ${item}`);
        } else {
          fs.unlinkSync(itemPath);
          console.log(`✓ Removed file: ${item}`);
        }
        result.removed++;
      }
    } catch (error) {
      const errorMsg = `Failed to remove ${item}: ${error.message}`;
      result.errors.push(errorMsg);
      console.error(`✗ ${errorMsg}`);
    }
  }

  // Also remove example config files from docs/ if docs/ still exists
  if (fs.existsSync(path.join(rootDir, "docs"))) {
    try {
      const docsDir = path.join(rootDir, "docs");
      const files = fs.readdirSync(docsDir);
      
      for (const file of files) {
        if (file.startsWith(".aegis-rules.example-")) {
          const filePath = path.join(docsDir, file);
          if (dryRun) {
            console.log(`[DRY RUN] Would remove: docs/${file}`);
            result.removed++;
          } else {
            fs.unlinkSync(filePath);
            console.log(`✓ Removed: docs/${file}`);
            result.removed++;
          }
        }
      }
    } catch (error) {
      // Ignore errors if docs/ was already removed
    }
  }

  return result;
}

/**
 * Check if a path should be kept
 * @param {string} itemPath - Full path to the item
 * @param {string} rootDir - Root directory
 * @returns {boolean} True if should keep
 */
function shouldKeep(itemPath, rootDir) {
  const relativePath = path.relative(rootDir, itemPath);
  
  for (const keepPattern of KEEP_FILES) {
    if (relativePath.startsWith(keepPattern) || relativePath === keepPattern.replace(/\/$/, "")) {
      return true;
    }
  }
  
  return false;
}

/**
 * Update README.md to be project-specific (remove builder references)
 * @param {string} rootDir - Root directory
 * @param {boolean} dryRun - If true, don't actually update
 */
function updateReadme(rootDir, dryRun = false) {
  const readmePath = path.join(rootDir, "README.md");
  
  if (!fs.existsSync(readmePath)) {
    return;
  }

  if (dryRun) {
    console.log("[DRY RUN] Would update README.md to remove builder references");
    return;
  }

  try {
    let content = fs.readFileSync(readmePath, "utf8");
    
    // Remove or simplify builder-related sections
    // Keep basic project info but remove detailed builder docs
    const newContent = `# Project Rules

This project uses Aegis Codex rules for AI coding assistants.

## Rules

Rules are located in \`.cursor/rules/\` and are automatically loaded by Cursor IDE.

${fs.existsSync(path.join(rootDir, "AGENTS.md")) ? "See \`AGENTS.md\` for a human-readable summary of all rules." : ""}

## Configuration

Your rule configuration is stored in \`.aegis-rules.json\`.

## License

See LICENSE file for details.
`;

    fs.writeFileSync(readmePath, newContent, "utf8");
    console.log("✓ Updated README.md");
  } catch (error) {
    console.warn(`⚠ Could not update README.md: ${error.message}`);
  }
}

module.exports = {
  cleanRepository,
  updateReadme,
};

