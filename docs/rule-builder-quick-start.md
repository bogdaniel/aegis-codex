# Rule Builder Quick Start

## How to Choose Rules

The rule builder lets you select which rules to include in your project. You have two main options:

### Option 1: Using a Config File (Recommended)

1. **Copy an example config** that matches your project:
   ```bash
   # For TypeScript backend
   cp docs/.aegis-rules.example-typescript-backend.json .aegis-rules.json
   
   # For PHP/Laravel
   cp docs/.aegis-rules.example-php-laravel.json .aegis-rules.json
   
   # For minimal TypeScript-only
   cp docs/.aegis-rules.example-minimal.json .aegis-rules.json
   ```

2. **Edit the config** to customize what you want:
   ```json
   {
     "version": "1.0.0",
     "optional": {
       "topics": {
         "performance": true,      // Include performance rules
         "api": true,              // Include API design rules
         "accessibility": false,   // Exclude accessibility
         "observability-security": false
       },
       "methodologies": {
         "atdd": true,            // Include ATDD
         "bdd": false,            // Exclude BDD
         "tdd": true,
         "fdd": false
       },
       "languages": {
         "typescript": true,       // Include TypeScript rules
         "php": false,            // Exclude PHP rules
         "javascript": false
       },
       "patterns": {
         "enabled": true,          // Enable patterns
         "categories": {
           "architectural-enterprise": true,
           "behavioural": false,
           "creational": false,
           "structural": false
         },
         "specific": ["layered-architecture", "aggregate"]  // Only these patterns
       }
     }
   }
   ```

3. **Choose output mode** (important: choose one to avoid loading both in Cursor IDE):
   ```bash
   # For Cursor IDE: Copy rules to .cursor/rules/ (recommended)
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules
   
   # For human-readable summary: Generate AGENTS.md only
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --generate-agents
   
   # Generate both (not recommended - Cursor IDE will load .cursor/rules/ automatically)
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both
   ```

4. **Clean up repository** (remove builder files after generation):
   ```bash
   # Generate rules and clean up in one command
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules --cleanup
   ```

5. **Preview what will be included** (dry run):
   ```bash
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules --cleanup --dry-run
   ```

### Option 2: Using --interactive Flag (Interactive Selection)

For interactive rule selection with prompts:

```bash
# Interactive mode - prompts you to select rules
# Choose output mode: --copy-rules (for Cursor IDE) or --generate-agents (for summary)
node src/rules-builder/build-agents-doc.js --interactive --copy-rules

# With cleanup (removes builder files after generation)
node src/rules-builder/build-agents-doc.js --interactive --copy-rules --cleanup
```

The interactive mode will:
1. Prompt you to select optional topics (performance, API, accessibility, etc.)
2. Prompt you to select methodologies (ATDD, BDD, TDD, FDD)
3. Prompt you to select languages (TypeScript, PHP, JavaScript, etc.)
4. Prompt you to select design patterns (all categories or specific patterns)
5. Ask if you want to save the configuration to `.aegis-rules.json`

**Note:** All mandatory rules (15) are always included regardless of your selections.

### Option 3: Using --langs Flag (Simple, Backward Compatible)

For quick selection of languages only:

```bash
# Include TypeScript and PHP rules (includes all mandatory rules + these languages)
node src/rules-builder/build-agents-doc.js --langs typescript,php --both
```

**Note:** This includes all mandatory rules plus the specified languages. For more control, use a config file or interactive mode.

## Command Options

### Interactive Mode

```bash
# Interactive rule selection with prompts
node src/rules-builder/build-agents-doc.js --interactive --both

# Interactive mode with dry run (preview only)
node src/rules-builder/build-agents-doc.js --interactive --both --dry-run
```

### Output Modes

```bash
# Generate only AGENTS.md (default if no mode specified)
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --generate-agents

# Copy rules only to .cursor/rules/
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules

# Do both (recommended)
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both
```

### Preview Mode

```bash
# See what would be included without actually generating files
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both --dry-run
```

## What Gets Included

### Always Included (Mandatory Spine for Backend/Server-Side Profiles)

These rules are **always** included for backend/server-side profiles, regardless of your config:

- Persona & Governance:
  - `00-persona.mdc` - Persona bootstrap
  - `10-global.mdc` - Global invariants
  - `11-meta-map.mdc` - Meta-map of rule groups and precedence
  - `20-agents.mdc` - Agent roles
  - `21-orchestration.mdc` - Multi-agent orchestration
  - `22-ai-assistants.mdc` - AI/code-assistant governance
  - `3G-risk-overrides.mdc` - Risk override protocol
- Security, Testing, Observability, CI/CD:
  - `30-security.mdc`, `30-threat-modeling.mdc`
  - `31-testing.mdc`
  - `32-observability.mdc`
  - `34-ci.mdc`
- Architecture & DDD & Anti-corruption:
  - `36-architecture.mdc` - Architecture (Clean/Hex/DDD)
  - `37-code-structure.mdc` - Code structure
  - `38-anti-corruption-events.mdc` - ACL & events
  - `38-compliance.mdc` - Compliance checklist
  - `44-ddd.mdc` - Domain-Driven Design
  - `45-solid-principles.mdc` - SOLID principles
  - `3A-anti-patterns.mdc` - Anti-patterns catalog
- Change Discipline & Contracts:
  - `23-change-control.mdc` - Change classification & contracts
  - `45-bugfix-protocol.mdc` - Bugfix protocol
  - `46-regression-discipline.mdc` - Tests-as-contracts discipline
  - `47-diff-discipline.mdc` - Diff scope & blast-radius discipline
  - `48-doc-sync.mdc` - Spec/doc sync discipline
  - `35-api-lifecycle.mdc` - API lifecycle, compatibility, deprecation
- Data, Config, Flags, Ops:
  - `3B-data-persistence.mdc` - Data & persistence
  - `3E-config-environments.mdc` - Config & environments
  - `3F-feature-flags-rollouts.mdc` - Feature flags & rollouts
  - `3D-operations.mdc` - Operations & runbooks

### Optional Rules (Selected by Config)

- **Topics**: Performance, API design, accessibility, extended observability-security
- **Methodologies**: ATDD, BDD, TDD, FDD
- **Languages**: TypeScript, JavaScript, PHP, Python, Go, Rust, Java, C#, HTML, CSS, GDScript
- **Patterns**: Architectural-enterprise, behavioural, creational, structural

## Examples

### Example 1: TypeScript Backend with Patterns

```bash
# Use the TypeScript backend example
cp docs/.aegis-rules.example-typescript-backend.json .aegis-rules.json

# Generate rules
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both
```

This includes:
- All mandatory rules
- TypeScript language rules
- Performance, API topics
- All methodologies (ATDD, BDD, TDD, FDD)
- All pattern categories

### Example 2: Minimal TypeScript-Only

```bash
# Use the minimal example
cp docs/.aegis-rules.example-minimal.json .aegis-rules.json

# Generate rules
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both
```

This includes:
- All mandatory rules
- TypeScript language rules only
- No optional topics, methodologies, or patterns

### Example 3: Custom Config

1. Create `.aegis-rules.json`:
   ```json
   {
     "version": "1.0.0",
     "optional": {
       "topics": {
         "performance": true,
         "api": true
       },
       "methodologies": {
         "tdd": true
       },
       "languages": {
         "typescript": true,
         "javascript": true
       },
       "patterns": {
         "enabled": true,
         "categories": {
           "architectural-enterprise": true,
           "behavioural": false,
           "creational": false,
           "structural": false
         }
       }
     }
   }
   ```

2. Generate:
   ```bash
   node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --both
   ```

## Quick Reference

```bash
# Preview with minimal config
node src/rules-builder/build-agents-doc.js --config docs/.aegis-rules.example-minimal.json --both --dry-run

# Generate with TypeScript backend config
node src/rules-builder/build-agents-doc.js --config docs/.aegis-rules.example-typescript-backend.json --both

# Quick language selection (backward compatible)
node src/rules-builder/build-agents-doc.js --langs typescript,php --both

# Generate only AGENTS.md
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --generate-agents

# Copy rules only
node src/rules-builder/build-agents-doc.js --config .aegis-rules.json --copy-rules
```

## Available Example Configs

- `docs/.aegis-rules.example-minimal.json` - Minimal TypeScript-only
- `docs/.aegis-rules.example-typescript-backend.json` - TypeScript backend with patterns
- `docs/.aegis-rules.example-full-stack.json` - Full-stack TypeScript/JavaScript/HTML/CSS
- `docs/.aegis-rules.example-php-laravel.json` - PHP/Laravel backend
- `docs/.aegis-rules.example-java-spring.json` - Java/Spring Boot backend
- `docs/.aegis-rules.example-csharp-dotnet.json` - C#/.NET backend
- `docs/.aegis-rules.example-backend-only.json` - All backend languages
- `docs/.aegis-rules.example-patterns-specific.json` - TypeScript with specific patterns

## Need More Details?

- **Config Examples**: See `docs/rule-builder-config-examples.md` for detailed configuration documentation
- **Testing Guide**: See `docs/rule-builder-testing.md` for comprehensive testing instructions

