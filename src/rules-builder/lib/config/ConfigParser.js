#!/usr/bin/env node
/**
 * ConfigParser - Parse and validate Aegis Codex rule selection configuration
 */

const fs = require("fs");
const path = require("path");

/**
 * Default config (all rules enabled)
 */
const DEFAULT_CONFIG = {
  version: "1.0.0",
  optional: {
    topics: {
      performance: true,
      api: true,
      accessibility: true,
      "observability-security": false,
      "feature-flags-rollouts": true,
      "multi-tenancy": false,
    },
    methodologies: {
      atdd: true,
      bdd: true,
      tdd: true,
      fdd: true,
    },
    languages: {},
    patterns: {
      enabled: true,
      categories: {
        "architectural-enterprise": true,
        behavioural: true,
        creational: true,
        structural: true,
      },
      specific: [],
    },
  },
};

/**
 * Find config file in project root or .cursor directory
 * @returns {string|null} Path to config file or null if not found
 */
function findConfigFile() {
  const root = process.cwd();
  const candidates = [
    path.join(root, ".aegis-rules.json"),
    path.join(root, ".cursor", "rules-config.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Parse config file
 * @param {string|null} configPath - Path to config file (null = use default)
 * @returns {Object} Parsed config object
 */
function parseConfig(configPath = null) {
  if (!configPath) {
    configPath = findConfigFile();
  }

  if (!configPath || !fs.existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const content = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(content);

    // Merge with defaults to ensure all fields exist
    return mergeWithDefaults(config);
  } catch (error) {
    throw new Error(`Failed to parse config file ${configPath}: ${error.message}`);
  }
}

/**
 * Merge user config with defaults
 * @param {Object} userConfig - User-provided config
 * @returns {Object} Merged config
 */
function mergeWithDefaults(userConfig) {
  const merged = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

  if (userConfig.version) {
    merged.version = userConfig.version;
  }

  if (userConfig.optional) {
    if (userConfig.optional.topics) {
      merged.optional.topics = { ...merged.optional.topics, ...userConfig.optional.topics };
    }
    if (userConfig.optional.methodologies) {
      merged.optional.methodologies = {
        ...merged.optional.methodologies,
        ...userConfig.optional.methodologies,
      };
    }
    if (userConfig.optional.languages) {
      merged.optional.languages = { ...merged.optional.languages, ...userConfig.optional.languages };
    }
    if (userConfig.optional.patterns) {
      merged.optional.patterns = {
        ...merged.optional.patterns,
        ...userConfig.optional.patterns,
      };
      if (userConfig.optional.patterns.categories) {
        merged.optional.patterns.categories = {
          ...merged.optional.patterns.categories,
          ...userConfig.optional.patterns.categories,
        };
      }
    }
  }

  return merged;
}

/**
 * Merge CLI flags with config
 * @param {Object} config - Base config
 * @param {Object} cliFlags - CLI flags (e.g., { langs: ['typescript', 'php'] })
 * @returns {Object} Merged config
 */
function mergeCliFlags(config, cliFlags) {
  const merged = JSON.parse(JSON.stringify(config));

  if (cliFlags.langs) {
    // Initialize languages object if needed
    if (!merged.optional.languages) {
      merged.optional.languages = {};
    }

    // Set all languages to false first
    const allLangs = [
      "typescript",
      "php",
      "javascript",
      "python",
      "go",
      "rust",
      "java",
      "csharp",
      "html",
      "css",
      "gdscript",
    ];
    allLangs.forEach((lang) => {
      merged.optional.languages[lang] = false;
    });

    // Set requested languages to true
    if (Array.isArray(cliFlags.langs)) {
      cliFlags.langs.forEach((lang) => {
        merged.optional.languages[lang] = true;
      });
    }
  }

  return merged;
}

module.exports = {
  parseConfig,
  findConfigFile,
  mergeCliFlags,
  DEFAULT_CONFIG,
};
