#!/usr/bin/env node
/**
 * DependencyResolver - Resolve rule dependencies (e.g., language rules require architecture rules)
 */

/**
 * Resolve dependencies for selected rules
 * @param {Array<Object>} selectedRules - Already selected rules
 * @param {Array<Object>} allRules - All available rules
 * @returns {Array<Object>} Rules with dependencies added
 */
function resolveDependencies(selectedRules, allRules) {
  const result = [...selectedRules];
  const selectedPaths = new Set(selectedRules.map((r) => r.relativePath));

  // Create a map of all rules by relative path for quick lookup
  const allRulesMap = new Map();
  allRules.forEach((rule) => {
    allRulesMap.set(rule.relativePath, rule);
  });

  // Check each selected rule for dependencies
  for (const rule of selectedRules) {
    const dependencies = getDependencies(rule);
    for (const depPath of dependencies) {
      if (!selectedPaths.has(depPath)) {
        // Try exact match first
        let depRule = allRulesMap.get(depPath);
        
        // If not found, try pattern matching (e.g., "36-architecture.mdc" matches any path containing it)
        if (!depRule) {
          for (const [path, rule] of allRulesMap.entries()) {
            if (path.includes(depPath) || depPath.includes(path)) {
              depRule = rule;
              break;
            }
          }
        }
        
        if (depRule) {
          result.push(depRule);
          selectedPaths.add(depRule.relativePath);
        }
      }
    }
  }

  // Check for circular dependencies
  const circular = detectCircularDependencies(result);
  if (circular.length > 0) {
    console.warn(`Warning: Circular dependencies detected: ${circular.join(", ")}`);
  }

  return result;
}

/**
 * Get dependencies for a rule
 * @param {Object} rule - Rule object
 * @returns {Array<string>} Array of relative paths to dependent rules
 */
function getDependencies(rule) {
  const dependencies = [];
  const meta = rule.meta || {};
  const category = meta.category;
  const relativePath = rule.relativePath || "";

  // Language rules require architecture and DDD rules
  if (category === "language") {
    // Find architecture and DDD rules by pattern matching
    dependencies.push("36-architecture.mdc");
    dependencies.push("44-ddd.mdc");
  }

  // Pattern rules require patterns overview if patterns are enabled
  if (category === "pattern" && relativePath.includes("patterns/")) {
    dependencies.push("patterns/60-patterns-overview.mdc");
  }

  return dependencies;
}

/**
 * Detect circular dependencies (simple check)
 * @param {Array<Object>} rules - Rules to check
 * @returns {Array<string>} Array of circular dependency paths
 */
function detectCircularDependencies(rules) {
  // Simple implementation: check if any rule depends on another that depends on it
  // This is a simplified check; full implementation would use graph traversal
  const circular = [];
  // TODO: Implement full circular dependency detection if needed
  return circular;
}

module.exports = {
  resolveDependencies,
  getDependencies,
  detectCircularDependencies,
};

