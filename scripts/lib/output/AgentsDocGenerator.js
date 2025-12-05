#!/usr/bin/env node
/**
 * AgentsDocGenerator - Generate AGENTS.md from selected rules
 */

/**
 * Render a single rule
 * @param {string} name - Rule file name
 * @param {Object} rule - Parsed rule object { meta, sections }
 * @returns {string} Rendered rule markdown
 */
function renderRule(name, rule) {
  const lines = [];
  const displayName = name.split("/").pop();
  const desc = rule.meta.description ? ` — ${rule.meta.description}` : "";
  lines.push(`## ${displayName}${desc}`.trim());
  if (rule.meta.globs && rule.meta.globs.length) {
    lines.push(`- Globs: ${rule.meta.globs.join(", ")}`);
  }
  for (const section of rule.sections) {
    lines.push("");
    lines.push(`### [${section.title}]`);
    const content = section.content.join("\n").trimEnd();
    if (content) lines.push(content);
  }
  lines.push("");
  return lines.join("\n");
}

/**
 * Generate AGENTS.md document from selected rules
 * @param {Array<{name: string, relativePath: string, data: Object}>} rules - Selected rules with parsed data
 * @param {string} sourceDir - Source directory (for header comment)
 * @returns {string} Generated markdown document
 */
function generateAgentsDoc(rules, sourceDir = ".cursor/rules") {
  const lines = [];
  lines.push(`# AGENTS (generated from ${sourceDir})`);
  lines.push(`> Do not edit by hand. Run: node scripts/build-agents-doc.js`);
  lines.push("");

  lines.push(`[RULE FILE ORDER]`);
  lines.push(
    "- Cursor loads rules by filename priority: `00-persona.mdc` (system bootstrap/handshake) → `10-global.mdc` → `20-agents.mdc` → `30-38*.mdc` (security, testing, observability, performance, CI, API, architecture, code-structure, compliance) → `40-44*.mdc` (ATDD, BDD, TDD, FDD, DDD) → `50-lang-*.mdc` (language-specific). Keep this ordering when adding/updating rules."
  );
  lines.push("");

  // Extract core agents from 20-agents.mdc rule
  const agentsRule = rules.find((r) => r.name.includes("20-agents.mdc"));
  if (agentsRule && agentsRule.data && agentsRule.data.meta && agentsRule.data.meta.coreAgents) {
    lines.push(`[CORE (MANDATORY) AGENTS]`);
    lines.push("");
    lines.push(`These agents are **non-optional** for serious backend work. They enforce the spine rules:`);
    lines.push("");
    lines.push(`- **Architecture** (\`.cursor/rules/36-architecture.mdc\`): Clean Architecture, Hexagonal, DDD, bounded contexts`);
    lines.push(`- **Security** (\`.cursor/rules/30-security.mdc\`): OWASP Top 10, defense-in-depth, supply chain`);
    lines.push(`- **Testing** (\`.cursor/rules/31-testing.mdc\`): Domain + Application tests, coverage, determinism`);
    lines.push(`- **CI/CD** (\`.cursor/rules/34-ci.mdc\`): Architecture checks, supply chain, rollout safety`);
    lines.push(`- **Change Discipline** (\`.cursor/rules/23-change-control.mdc\`, \`.cursor/rules/45-bugfix-protocol.mdc\`, etc.): Classification, regression tests, diff scope`);
    lines.push(`- **Risk Overrides** (\`.cursor/rules/3G-risk-overrides.mdc\`): Explicit exceptions to core rules`);
    lines.push("");
    lines.push(`**Core Agents:**`);
    for (const agent of agentsRule.data.meta.coreAgents) {
      lines.push(`- ${agent} — Mandatory for backend/domain work`);
    }
    lines.push("");
    lines.push(`**MANDATORY:** Multi-agent workflows MUST NOT skip or bypass these core agents for Tier M/H contexts. Missing core agent involvement is a blocking issue unless a valid risk override per \`.cursor/rules/3G-risk-overrides.mdc\` is explicitly provided.`);
    lines.push("");
  }

  // Group rules by category
  const groups = [
    {
      title: "[PERSONA/GLOBAL/AGENTS] (00-29)",
      match: (name) => {
        const baseName = name.split("/").pop(); // Get filename from path
        return /^0[0-9]-/.test(baseName) || /^1[0-9]-/.test(baseName) || /^20-/.test(baseName) || /^21-/.test(baseName);
      },
    },
    {
      title: "[ARCHITECTURE]",
      match: (name) => {
        const baseName = name.split("/").pop();
        const architectureFiles = new Set([
          "36-architecture.mdc",
          "3C-frontend-architecture.mdc",
          "37-code-structure.mdc",
          "3B-data-persistence.mdc",
          "3E-config-environments.mdc",
          "38-anti-corruption-events.mdc",
        ]);
        return name.includes("architecture/") || architectureFiles.has(baseName);
      },
    },
    {
      title: "[TOPIC STANDARDS] (LLM-facing mirrors in .cursor/rules/30-38)",
      match: (name) => {
        const baseName = name.split("/").pop();
        return /^3[0-9A]-/.test(baseName) && 
               !baseName.startsWith("30-") && 
               !baseName.startsWith("31-") && 
               !baseName.startsWith("32-") && 
               !baseName.startsWith("34-") && 
               !baseName.startsWith("36-") && 
               !baseName.startsWith("37-") && 
               !baseName.includes("38-compliance");
      },
    },
    {
      title: "[METHODOLOGIES] (ATDD/BDD/TDD/FDD/DDD)",
      match: (name) => {
        const baseName = name.split("/").pop();
        return /^4[0-4]-/.test(baseName);
      },
    },
    {
      title: "[LANGUAGE STANDARDS] (50-lang-*.mdc)",
      match: (name) => {
        const baseName = name.split("/").pop();
        return /^50-lang-/.test(baseName);
      },
    },
    {
      title: "[PATTERNS]",
      match: (name) => name.includes("patterns/"),
    },
  ];

  let currentGroup = null;
  for (const { name, data } of rules) {
    // Determine which group this rule belongs to
    let group = groups.find((g) => g.match(name));
    
    // Handle patterns differently (they have paths)
    if (name.includes("patterns/")) {
      group = groups.find((g) => g.title === "[PATTERNS]");
    }

    if (group && group !== currentGroup) {
      lines.push(group.title);
      lines.push("");
      currentGroup = group;
    }
    lines.push(renderRule(name, data));
  }

  return lines.join("\n");
}

module.exports = {
  generateAgentsDoc,
  renderRule,
};
