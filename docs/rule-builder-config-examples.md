# Rule Builder Config Examples

This document provides example configuration files for the Aegis Codex rule builder. Copy the appropriate example to `.aegis-rules.json` in your project root.

## Available Examples

1. **`.aegis-rules.example-minimal.json`** - Minimal TypeScript-only setup
2. **`.aegis-rules.example-typescript-backend.json`** - TypeScript backend with patterns
3. **`.aegis-rules.example-full-stack.json`** - Full-stack TypeScript/JavaScript/HTML/CSS
4. **`.aegis-rules.example-php-laravel.json`** - PHP/Laravel backend
5. **`.aegis-rules.example-java-spring.json`** - Java/Spring Boot backend
6. **`.aegis-rules.example-csharp-dotnet.json`** - C#/.NET backend
7. **`.aegis-rules.example-backend-only.json`** - All backend languages (no frontend)
8. **`.aegis-rules.example-patterns-specific.json`** - TypeScript with specific architectural patterns only

## Usage

### Copy an example to your project:

```bash
# For a TypeScript backend project
cp .aegis-rules.example-typescript-backend.json .aegis-rules.json

# For a PHP/Laravel project
cp .aegis-rules.example-php-laravel.json .aegis-rules.json

# For a full-stack project
cp .aegis-rules.example-full-stack.json .aegis-rules.json
```

### Run the builder:

```bash
# Generate AGENTS.md only
node scripts/build-agents-doc.js --config .aegis-rules.json

# Copy rules to .cursor/rules/ and generate AGENTS.md
node scripts/build-agents-doc.js --config .aegis-rules.json --both

# Dry run to see what would be included
node scripts/build-agents-doc.js --config .aegis-rules.json --both --dry-run
```

## Config Structure

All configs follow this structure:

```json
{
  "version": "1.0.0",
  "optional": {
    "topics": {
      "performance": true|false,
      "api": true|false,
      "accessibility": true|false,
      "observability-security": true|false
    },
    "methodologies": {
      "atdd": true|false,
      "bdd": true|false,
      "tdd": true|false,
      "fdd": true|false
    },
    "languages": {
      "typescript": true|false,
      "php": true|false,
      "javascript": true|false,
      "python": true|false,
      "go": true|false,
      "rust": true|false,
      "java": true|false,
      "csharp": true|false,
      "html": true|false,
      "css": true|false,
      "gdscript": true|false
    },
    "patterns": {
      "enabled": true|false,
      "categories": {
        "architectural-enterprise": true|false,
        "behavioural": true|false,
        "creational": true|false,
        "structural": true|false
      },
      "specific": ["pattern-name-1", "pattern-name-2"]
    }
  }
}
```

## Mandatory Rules

The following rules are **always included** regardless of config (mandatory):

- `00-persona.mdc`
- `10-global.mdc`
- `20-agents.mdc`
- `21-orchestration.mdc`
- `30-security.mdc`
- `31-testing.mdc`
- `32-observability.mdc`
- `34-ci.mdc`
- `36-architecture.mdc`
- `37-code-structure.mdc`
- `38-anti-corruption-events.mdc`
- `38-compliance.mdc`
- `44-ddd.mdc`
- `45-solid-principles.mdc`
- `3A-anti-patterns.mdc`

## Dependencies

When you enable a language rule (e.g., `50-lang-typescript.mdc`), the builder automatically includes:
- `36-architecture.mdc` (required for architecture enforcement)
- `44-ddd.mdc` (required for DDD patterns)

## Pattern Selection

Patterns can be selected in two ways:

1. **By category**: Enable entire categories (e.g., all architectural-enterprise patterns)
2. **By specific pattern**: List specific pattern files in `specific` array

Example with specific patterns:
```json
"patterns": {
  "enabled": true,
  "categories": {
    "architectural-enterprise": false
  },
  "specific": [
    "91-layered-architecture",
    "92-aggregate",
    "93-value-object"
  ]
}
```

## CLI Override

You can override language selection via CLI:

```bash
# Use config file but override languages
node scripts/build-agents-doc.js --config .aegis-rules.json --langs typescript,php
```

## Default Behavior

If no config file is provided, the builder uses a default config that includes:
- All topics enabled
- All methodologies enabled
- All languages enabled
- All pattern categories enabled

This is equivalent to the "full stack" example.

