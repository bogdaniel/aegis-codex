#!/usr/bin/env node
/**
 * ConfigWriter - Write configuration to file
 */

const fs = require("fs");
const path = require("path");

/**
 * Write config to file
 * @param {Object} config - Configuration object
 * @param {string} filePath - Path to config file
 * @param {boolean} dryRun - If true, don't actually write
 * @returns {Promise<void>}
 */
function writeConfig(config, filePath, dryRun = false) {
  const json = JSON.stringify(config, null, 2) + "\n";

  if (dryRun) {
    console.log(`[DRY RUN] Would write config to ${filePath}:`);
    console.log(json);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(filePath, json, "utf8");
      console.log(`✓ Config written to ${filePath}`);
      resolve();
    } catch (error) {
      reject(new Error(`Failed to write config file: ${error.message}`));
    }
  });
}

/**
 * Find default config path
 * @returns {string} Path to default config file
 */
function getDefaultConfigPath() {
  const root = process.cwd();
  return path.join(root, ".aegis-rules.json");
}

module.exports = {
  writeConfig,
  getDefaultConfigPath,
};



