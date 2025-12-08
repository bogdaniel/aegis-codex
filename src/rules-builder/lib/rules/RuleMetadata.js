#!/usr/bin/env node
/**
 * RuleMetadata - Extract and validate rule metadata
 */

/**
 * Extract metadata from parsed rule
 * @param {Object} rule - Parsed rule object { meta, sections }
 * @param {string} fileName - Rule file name
 * @returns {Object} Extracted metadata
 */
function extractMetadata(rule, fileName) {
  const meta = rule.meta || {};

  // Infer category from filename if not in frontmatter
  if (!meta.category) {
    if (fileName.startsWith("00-") || fileName.startsWith("10-") || fileName.startsWith("20-")) {
      meta.category = "core";
    } else if (fileName.includes("architecture/")) {
      meta.category = "architecture";
    } else if (fileName.startsWith("30-") || fileName.startsWith("3")) {
      meta.category = "topic";
    } else if (fileName.startsWith("40-") || fileName.startsWith("4")) {
      meta.category = "methodology";
    } else if (fileName.startsWith("50-lang-")) {
      meta.category = "language";
      meta.subcategory = fileName.replace(/^50-lang-(.+)\.mdc$/, "$1");
    } else if (fileName.includes("patterns/")) {
      meta.category = "pattern";
      // Extract pattern category from path
      const patternMatch = fileName.match(/patterns\/([^/]+)\//);
      if (patternMatch) {
        meta.subcategory = patternMatch[1];
      }
    }
  }

  // Infer subcategory for topics if not specified
  if (meta.category === "topic" && !meta.subcategory) {
    const topicMap = {
      "32-observability": "observability",
      "33-performance": "performance",
      "35-api": "api",
      "38-anti-corruption-events": "anti-corruption",
      "39-accessibility": "accessibility",
      "39-observability-security": "observability-security",
    };
    meta.subcategory = topicMap[fileName] || fileName.replace(/\.mdc$/, "");
  }

  // Infer subcategory for methodologies if not specified
  if (meta.category === "methodology" && !meta.subcategory) {
    const methodMap = {
      "40-atdd": "atdd",
      "41-bdd": "bdd",
      "42-tdd": "tdd",
      "43-fdd": "fdd",
    };
    meta.subcategory = methodMap[fileName] || fileName.replace(/\.mdc$/, "");
  }

  // Handle legacy alwaysApply field (map to required)
  if (meta.alwaysApply === true && meta.required === undefined) {
    meta.required = true;
  }

  // Set required flag (default to true for core rules, false for optional)
  if (meta.required === undefined) {
    // Mandatory rules based on plan
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
    meta.required = mandatoryFiles.some((f) => fileName.includes(f));
  }

  return meta;
}

/**
 * Validate rule metadata completeness
 * @param {Object} metadata - Rule metadata
 * @param {string} fileName - Rule file name
 * @returns {{valid: boolean, warnings: string[]}} Validation result
 */
function validateMetadata(metadata, fileName) {
  const warnings = [];

  if (!metadata.category) {
    warnings.push(`Rule ${fileName} missing category metadata`);
  }

  if (metadata.category === "language" && !metadata.subcategory) {
    warnings.push(`Language rule ${fileName} missing subcategory`);
  }

  if (metadata.category === "topic" && !metadata.subcategory) {
    warnings.push(`Topic rule ${fileName} missing subcategory`);
  }

  if (metadata.required === undefined) {
    warnings.push(`Rule ${fileName} missing required flag`);
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}

module.exports = {
  extractMetadata,
  validateMetadata,
};
