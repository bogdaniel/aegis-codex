#!/usr/bin/env node
/**
 * RuleValidator - Validate selected rules (existence, dependencies, metadata)
 */

/**
 * Validate selected rules
 * @param {Array<Object>} selectedRules - Selected rules
 * @param {Array<Object>} allRules - All available rules
 * @returns {{valid: boolean, errors: string[], warnings: string[]}} Validation result
 */
function validateRules(selectedRules, allRules) {
  const errors = [];
  const warnings = [];

  // Check mandatory rules exist
  const mandatoryRules = [
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

  const selectedPaths = new Set(selectedRules.map((r) => r.relativePath));

  for (const mandatory of mandatoryRules) {
    const found = selectedRules.some((r) => r.relativePath.includes(mandatory));
    if (!found) {
      errors.push(`Mandatory rule missing: ${mandatory}`);
    }
  }

  // Check for missing optional rules (warnings only)
  for (const rule of selectedRules) {
    if (!rule.meta || !rule.meta.category) {
      warnings.push(`Rule ${rule.relativePath} missing category metadata`);
    }

    if (rule.meta && rule.meta.required === undefined) {
      warnings.push(`Rule ${rule.relativePath} missing required flag`);
    }
  }

  // Check dependencies are satisfied
  for (const rule of selectedRules) {
    const meta = rule.meta || {};
    if (meta.category === "language") {
      if (!selectedPaths.has("36-architecture.mdc") && !selectedPaths.has("44-ddd.mdc")) {
        warnings.push(
          `Language rule ${rule.relativePath} should have architecture and DDD rules (will be auto-included)`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

module.exports = {
  validateRules,
};

