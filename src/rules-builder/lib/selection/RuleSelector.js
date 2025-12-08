#!/usr/bin/env node
/**
 * RuleSelector - Select rules based on config (mandatory + optional)
 */

/**
 * Select rules based on configuration
 * @param {Array<{filePath: string, relativePath: string, name: string, meta: Object}>} allRules - All available rules with metadata
 * @param {Object} config - Configuration object
 * @returns {Array} Selected rules
 */
function selectRules(allRules, config) {
  const selected = [];

  for (const rule of allRules) {
    const meta = rule.meta || {};

    // Always include mandatory rules
    if (meta.required === true) {
      selected.push(rule);
      continue;
    }

    // If required is undefined, check if it's a mandatory file by name
    if (meta.required === undefined) {
      const mandatoryFiles = [
        "00-persona.mdc",
        "10-global.mdc",
        "20-agents.mdc",
        "21-orchestration.mdc",
        "30-security.mdc",
        "31-testing.mdc",
        "32-observability.mdc",
        "34-ci.mdc",
        "36-architecture.mdc",
        "37-code-structure.mdc",
        "38-anti-corruption-events.mdc",
        "38-compliance.mdc",
        "44-ddd.mdc",
        "45-solid-principles.mdc",
        "3A-anti-patterns.mdc",
      ];
      const isMandatory = mandatoryFiles.some((f) => rule.relativePath.includes(f));
      if (isMandatory) {
        selected.push(rule);
        continue;
      }
    }

    // Check optional rules
    if (shouldIncludeOptional(rule, config)) {
      selected.push(rule);
    }
  }

  return selected;
}

/**
 * Check if an optional rule should be included based on config
 * @param {Object} rule - Rule object with metadata
 * @param {Object} config - Configuration object
 * @returns {boolean} Whether to include the rule
 */
function shouldIncludeOptional(rule, config) {
  const meta = rule.meta || {};
  const category = meta.category;
  const subcategory = meta.subcategory;

  if (!config.optional) {
    return false;
  }

  // Check topics
  if (category === "topic" && config.optional.topics) {
    if (subcategory && config.optional.topics[subcategory] === true) {
      return true;
    }
  }

  // Check methodologies
  if (category === "methodology" && config.optional.methodologies) {
    if (subcategory && config.optional.methodologies[subcategory] === true) {
      return true;
    }
  }

  // Check languages
  if (category === "language" && config.optional.languages) {
    if (subcategory && config.optional.languages[subcategory] === true) {
      return true;
    }
  }

  // Check patterns
  if (category === "pattern") {
    if (!config.optional.patterns || !config.optional.patterns.enabled) {
      return false;
    }

    // Check pattern categories
    if (config.optional.patterns.categories) {
      if (subcategory && config.optional.patterns.categories[subcategory] === true) {
        return true;
      }
    }

    // Check specific patterns
    if (config.optional.patterns.specific && Array.isArray(config.optional.patterns.specific)) {
      const ruleName = rule.name.replace(/\.mdc$/, "");
      if (config.optional.patterns.specific.includes(ruleName)) {
        return true;
      }
    }
  }

  return false;
}

module.exports = {
  selectRules,
  shouldIncludeOptional,
};

