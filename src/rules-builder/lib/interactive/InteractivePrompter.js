#!/usr/bin/env node
/**
 * InteractivePrompter - Interactive prompts for rule selection
 */

const readline = require("readline");

/**
 * Create readline interface
 * @returns {readline.Interface}
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Prompt for yes/no question
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to ask
 * @param {boolean} defaultValue - Default value
 * @returns {Promise<boolean>}
 */
function promptYesNo(rl, question, defaultValue = false) {
  const defaultText = defaultValue ? "Y/n" : "y/N";
  return new Promise((resolve) => {
    rl.question(`${question} [${defaultText}]: `, (answer) => {
      const normalized = answer.trim().toLowerCase();
      if (normalized === "") {
        resolve(defaultValue);
      } else if (normalized === "y" || normalized === "yes") {
        resolve(true);
      } else if (normalized === "n" || normalized === "no") {
        resolve(false);
      } else {
        // Invalid input, use default
        resolve(defaultValue);
      }
    });
  });
}

/**
 * Prompt for multiple choice
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to ask
 * @param {Array<{value: string, label: string}>} choices - Available choices
 * @param {string|null} defaultValue - Default value
 * @returns {Promise<string>}
 */
function promptChoice(rl, question, choices, defaultValue = null) {
  console.log(`\n${question}`);
  choices.forEach((choice, index) => {
    const marker = defaultValue === choice.value ? " (default)" : "";
    console.log(`  ${index + 1}. ${choice.label}${marker}`);
  });

  return new Promise((resolve) => {
    rl.question(`\nEnter choice [1-${choices.length}]${defaultValue ? ` (default: ${defaultValue})` : ""}: `, (answer) => {
      const normalized = answer.trim();
      if (normalized === "" && defaultValue) {
        resolve(defaultValue);
        return;
      }

      const num = parseInt(normalized, 10);
      if (num >= 1 && num <= choices.length) {
        resolve(choices[num - 1].value);
      } else {
        // Invalid input, use default or first choice
        resolve(defaultValue || choices[0].value);
      }
    });
  });
}

/**
 * Prompt for multiple selections (checkboxes)
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to ask
 * @param {Array<{value: string, label: string, default: boolean}>} options - Available options
 * @returns {Promise<Array<string>>}
 */
async function promptMultiple(rl, question, options) {
  console.log(`\n${question}`);
  console.log("(Enter numbers separated by commas, e.g., 1,3,5)");
  options.forEach((option, index) => {
    const marker = option.default ? " [default: ON]" : "";
    console.log(`  ${index + 1}. [${option.default ? "x" : " "}] ${option.label}${marker}`);
  });

  return new Promise((resolve) => {
    rl.question(`\nEnter selections (comma-separated, or 'all' for all, or 'none' for none): `, (answer) => {
      const normalized = answer.trim().toLowerCase();
      
      if (normalized === "all") {
        resolve(options.map((o) => o.value));
        return;
      }
      
      if (normalized === "none") {
        resolve([]);
        return;
      }

      if (normalized === "") {
        // Use defaults
        resolve(options.filter((o) => o.default).map((o) => o.value));
        return;
      }

      const selected = normalized
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n >= 1 && n <= options.length)
        .map((n) => options[n - 1].value);

      resolve(selected);
    });
  });
}

/**
 * Interactive rule selection
 * @param {Array<Object>} allRules - All available rules with metadata
 * @returns {Promise<Object>} Selected configuration
 */
async function interactiveSelection(allRules) {
  const rl = createInterface();
  const config = {
    version: "1.0.0",
    optional: {
      topics: {},
      methodologies: {},
      languages: {},
      patterns: {
        enabled: false,
        categories: {},
        specific: [],
      },
    },
  };

  try {
    console.log("\n=== Aegis Codex Rule Builder - Interactive Mode ===\n");
    console.log("Mandatory rules (15) will always be included:");
    console.log("  - Persona, Global, Agents, Orchestration");
    console.log("  - Security, Testing, Observability, CI");
    console.log("  - Architecture, Code Structure, ACL, Compliance");
    console.log("  - DDD, SOLID, Anti-patterns\n");

    // Topics
    console.log("\n--- Optional Topics ---");
    config.optional.topics.performance = await promptYesNo(
      rl,
      "Include Performance standards?",
      false
    );
    config.optional.topics.api = await promptYesNo(rl, "Include API design standards?", false);
    config.optional.topics.accessibility = await promptYesNo(
      rl,
      "Include Accessibility & UX standards?",
      false
    );
    config.optional.topics["observability-security"] = await promptYesNo(
      rl,
      "Include Extended Observability-Security?",
      false
    );

    // Methodologies
    console.log("\n--- Methodologies ---");
    config.optional.methodologies.atdd = await promptYesNo(
      rl,
      "Include ATDD (Acceptance Test-Driven Development)?",
      false
    );
    config.optional.methodologies.bdd = await promptYesNo(
      rl,
      "Include BDD (Behavior-Driven Discovery)?",
      false
    );
    config.optional.methodologies.tdd = await promptYesNo(
      rl,
      "Include TDD (Test-Driven Development)?",
      false
    );
    config.optional.methodologies.fdd = await promptYesNo(
      rl,
      "Include FDD (Feature-Driven Development)?",
      false
    );

    // Languages
    console.log("\n--- Languages ---");
    const languageOptions = [
      { value: "typescript", label: "TypeScript", default: false },
      { value: "javascript", label: "JavaScript", default: false },
      { value: "php", label: "PHP", default: false },
      { value: "python", label: "Python", default: false },
      { value: "go", label: "Go", default: false },
      { value: "rust", label: "Rust", default: false },
      { value: "java", label: "Java", default: false },
      { value: "csharp", label: "C# / .NET", default: false },
      { value: "html", label: "HTML", default: false },
      { value: "css", label: "CSS", default: false },
      { value: "gdscript", label: "GDScript", default: false },
    ];

    const selectedLangs = await promptMultiple(
      rl,
      "Select languages to include:",
      languageOptions
    );

    // Initialize all languages to false, then set selected to true
    languageOptions.forEach((lang) => {
      config.optional.languages[lang.value] = selectedLangs.includes(lang.value);
    });

    // Patterns
    console.log("\n--- Design Patterns ---");
    config.optional.patterns.enabled = await promptYesNo(
      rl,
      "Include design patterns?",
      false
    );

    if (config.optional.patterns.enabled) {
      config.optional.patterns.categories["architectural-enterprise"] = await promptYesNo(
        rl,
        "Include Architectural-Enterprise patterns?",
        false
      );
      config.optional.patterns.categories.behavioural = await promptYesNo(
        rl,
        "Include Behavioural patterns?",
        false
      );
      config.optional.patterns.categories.creational = await promptYesNo(
        rl,
        "Include Creational patterns?",
        false
      );
      config.optional.patterns.categories.structural = await promptYesNo(
        rl,
        "Include Structural patterns?",
        false
      );

      // Ask about specific patterns if any category is enabled
      const hasAnyCategory = Object.values(config.optional.patterns.categories).some((v) => v);
      if (hasAnyCategory) {
        const useSpecific = await promptYesNo(
          rl,
          "Select specific patterns only (instead of all in categories)?",
          false
        );

        if (useSpecific) {
          // Get available patterns from rules
          const patternRules = allRules.filter(
            (r) => r.meta && r.meta.category === "pattern" && r.meta.subcategory
          );
          const patternOptions = patternRules.map((r) => {
            const name = r.name.replace(/\.mdc$/, "").replace(/.*\//, "");
            return {
              value: name,
              label: name,
              default: false,
            };
          });

          if (patternOptions.length > 0) {
            const selectedPatterns = await promptMultiple(
              rl,
              "Select specific patterns:",
              patternOptions
            );
            config.optional.patterns.specific = selectedPatterns;
            // Disable categories if using specific patterns
            Object.keys(config.optional.patterns.categories).forEach((key) => {
              config.optional.patterns.categories[key] = false;
            });
          }
        }
      }
    }

    return config;
  } finally {
    rl.close();
  }
}

module.exports = {
  interactiveSelection,
  promptYesNo,
  promptChoice,
  promptMultiple,
};



