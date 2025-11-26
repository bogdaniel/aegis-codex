#!/usr/bin/env node
/**
 * Aegis Codex Rule Builder - Catalog-level builder
 * 
 * Reads from rules/ (canonical source) and outputs to .cursor/rules/ (artifact/export)
 * Generates AGENTS.md from selected rules based on configuration.
 * 
 * Usage:
 *   node scripts/build-agents-doc.js [--config .aegis-rules.json] [--copy-rules] [--generate-agents] [--both] [--dry-run] [--langs typescript,php]
 */

const fs = require("fs");
const path = require("path");

// Import modules
const ConfigParser = require("./lib/config/ConfigParser");
const ConfigValidator = require("./lib/config/ConfigValidator");
const RuleReader = require("./lib/rules/RuleReader");
const RuleParser = require("./lib/rules/RuleParser");
const RuleMetadata = require("./lib/rules/RuleMetadata");
const RuleSelector = require("./lib/selection/RuleSelector");
const DependencyResolver = require("./lib/selection/DependencyResolver");
const RuleValidator = require("./lib/selection/RuleValidator");
const RuleCopier = require("./lib/output/RuleCopier");
const AgentsDocGenerator = require("./lib/output/AgentsDocGenerator");

/**
 * Parse CLI arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    config: null,
    copyRules: false,
    generateAgents: false,
    both: false,
    dryRun: false,
    langs: null,
    src: null,
    out: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--config":
        result.config = args[++i];
        break;
      case "--copy-rules":
        result.copyRules = true;
        break;
      case "--generate-agents":
        result.generateAgents = true;
        break;
      case "--both":
        result.both = true;
        break;
      case "--dry-run":
        result.dryRun = true;
        break;
      case "--langs":
        const langsValue = args[++i];
        if (langsValue && !langsValue.startsWith("--")) {
          result.langs = langsValue.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
        }
        break;
      case "--src":
        result.src = args[++i];
        break;
      case "--out":
        result.out = args[++i];
        break;
    }
  }

  // Default behavior: if no output mode specified, generate AGENTS.md
  if (!result.copyRules && !result.generateAgents && !result.both) {
    result.generateAgents = true;
  }

  // If --both, enable both modes
  if (result.both) {
    result.copyRules = true;
    result.generateAgents = true;
  }

  return result;
}

/**
 * Main orchestration function
 */
async function main() {
  try {
    const args = parseArgs();

    // Determine source and output directories
    const root = process.cwd();
    const sourceDir = args.src ? path.resolve(root, args.src) : path.resolve(root, "rules");
    const outputDir = path.resolve(root, ".cursor/rules");
    const agentsOutPath = args.out
      ? path.resolve(root, args.out)
      : path.resolve(root, "AGENTS.md");

    console.log(`Aegis Codex Rule Builder`);
    console.log(`Source: ${sourceDir}`);
    console.log(`Output: ${outputDir}`);
    console.log("");

    // Step 1: Parse and validate config
    console.log("Step 1: Parsing configuration...");
    let config = ConfigParser.parseConfig(args.config);
    if (args.langs) {
      config = ConfigParser.mergeCliFlags(config, { langs: args.langs });
    }

    const validation = ConfigValidator.validateConfig(config);
    if (!validation.valid) {
      console.error("Config validation failed:");
      validation.errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }
    console.log("✓ Configuration valid");

    // Step 2: Read all rule files
    console.log("Step 2: Reading rule files...");
    const ruleFiles = RuleReader.readRuleFiles(sourceDir);
    console.log(`✓ Found ${ruleFiles.length} rule files`);

    // Step 3: Parse rules and extract metadata
    console.log("Step 3: Parsing rules and extracting metadata...");
    const allRules = ruleFiles.map((file) => {
      const content = RuleReader.readRuleFile(file.filePath);
      const parsed = RuleParser.parseRule(file.filePath, content);
      const metadata = RuleMetadata.extractMetadata(parsed, file.name);
      return {
        ...file,
        meta: metadata,
        data: parsed,
      };
    });
    console.log(`✓ Parsed ${allRules.length} rules`);

    // Step 4: Select rules based on config
    console.log("Step 4: Selecting rules based on configuration...");
    let selectedRules = RuleSelector.selectRules(allRules, config);
    console.log(`✓ Selected ${selectedRules.length} rules`);

    // Step 5: Resolve dependencies
    console.log("Step 5: Resolving dependencies...");
    selectedRules = DependencyResolver.resolveDependencies(selectedRules, allRules);
    console.log(`✓ Resolved dependencies (${selectedRules.length} rules total)`);

    // Step 6: Validate selected rules
    console.log("Step 6: Validating selected rules...");
    const ruleValidation = RuleValidator.validateRules(selectedRules, allRules);
    if (!ruleValidation.valid) {
      console.error("Rule validation failed:");
      ruleValidation.errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }
    if (ruleValidation.warnings.length > 0) {
      console.warn("Warnings:");
      ruleValidation.warnings.forEach((warn) => console.warn(`  - ${warn}`));
    }
    console.log("✓ Rules validated");

    // Step 7: Copy rules (if requested)
    if (args.copyRules) {
      console.log("Step 7: Copying rules to .cursor/rules/...");
      const copyResult = RuleCopier.copyRules(selectedRules, sourceDir, outputDir, args.dryRun);
      if (copyResult.errors.length > 0) {
        console.error("Copy errors:");
        copyResult.errors.forEach((err) => console.error(`  - ${err}`));
      }
      console.log(
        `✓ ${args.dryRun ? "[DRY RUN] Would copy" : "Copied"} ${copyResult.copied} rules (${copyResult.skipped} skipped)`
      );
    }

    // Step 8: Generate AGENTS.md (if requested)
    if (args.generateAgents) {
      console.log("Step 8: Generating AGENTS.md...");
      const rulesForDoc = selectedRules.map((rule) => ({
        name: rule.relativePath,
        data: rule.data,
      }));
      const agentsDoc = AgentsDocGenerator.generateAgentsDoc(rulesForDoc, outputDir);
      
      if (!args.dryRun) {
        fs.writeFileSync(agentsOutPath, agentsDoc + "\n", "utf8");
        console.log(`✓ Generated ${agentsOutPath}`);
      } else {
        console.log(`[DRY RUN] Would generate ${agentsOutPath}`);
      }
    }

    console.log("");
    console.log("✓ Build complete!");
    if (args.dryRun) {
      console.log("(Dry run mode - no files were modified)");
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
