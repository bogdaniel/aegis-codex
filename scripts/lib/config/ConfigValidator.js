#!/usr/bin/env node
/**
 * ConfigValidator - Validate Aegis Codex rule selection configuration schema
 */

/**
 * Validate config structure
 * @param {Object} config - Config object to validate
 * @returns {Object} Validation result { valid: boolean, errors: string[] }
 */
function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== "object") {
    errors.push("Config must be an object");
    return { valid: false, errors };
  }

  if (config.version && typeof config.version !== "string") {
    errors.push("Config version must be a string");
  }

  if (config.optional) {
    if (typeof config.optional !== "object") {
      errors.push("Config optional must be an object");
    } else {
      // Validate topics
      if (config.optional.topics) {
        if (typeof config.optional.topics !== "object") {
          errors.push("Config optional.topics must be an object");
        } else {
          const validTopics = ["performance", "api", "accessibility", "observability-security"];
          Object.keys(config.optional.topics).forEach((key) => {
            if (!validTopics.includes(key)) {
              errors.push(`Unknown topic: ${key}. Valid topics: ${validTopics.join(", ")}`);
            }
            if (typeof config.optional.topics[key] !== "boolean") {
              errors.push(`Topic ${key} must be a boolean`);
            }
          });
        }
      }

      // Validate methodologies
      if (config.optional.methodologies) {
        if (typeof config.optional.methodologies !== "object") {
          errors.push("Config optional.methodologies must be an object");
        } else {
          const validMethods = ["atdd", "bdd", "tdd", "fdd"];
          Object.keys(config.optional.methodologies).forEach((key) => {
            if (!validMethods.includes(key)) {
              errors.push(`Unknown methodology: ${key}. Valid methodologies: ${validMethods.join(", ")}`);
            }
            if (typeof config.optional.methodologies[key] !== "boolean") {
              errors.push(`Methodology ${key} must be a boolean`);
            }
          });
        }
      }

      // Validate languages
      if (config.optional.languages) {
        if (typeof config.optional.languages !== "object") {
          errors.push("Config optional.languages must be an object");
        } else {
          const validLangs = [
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
          Object.keys(config.optional.languages).forEach((key) => {
            if (!validLangs.includes(key)) {
              errors.push(`Unknown language: ${key}. Valid languages: ${validLangs.join(", ")}`);
            }
            if (typeof config.optional.languages[key] !== "boolean") {
              errors.push(`Language ${key} must be a boolean`);
            }
          });
        }
      }

      // Validate patterns
      if (config.optional.patterns) {
        if (typeof config.optional.patterns !== "object") {
          errors.push("Config optional.patterns must be an object");
        } else {
          if (typeof config.optional.patterns.enabled !== "boolean") {
            errors.push("Config optional.patterns.enabled must be a boolean");
          }

          if (config.optional.patterns.categories) {
            if (typeof config.optional.patterns.categories !== "object") {
              errors.push("Config optional.patterns.categories must be an object");
            } else {
              const validCategories = [
                "architectural-enterprise",
                "behavioural",
                "creational",
                "structural",
              ];
              Object.keys(config.optional.patterns.categories).forEach((key) => {
                if (!validCategories.includes(key)) {
                  errors.push(
                    `Unknown pattern category: ${key}. Valid categories: ${validCategories.join(", ")}`
                  );
                }
                if (typeof config.optional.patterns.categories[key] !== "boolean") {
                  errors.push(`Pattern category ${key} must be a boolean`);
                }
              });
            }
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateConfig,
};

