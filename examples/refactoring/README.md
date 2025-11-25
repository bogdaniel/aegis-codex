# Refactoring Examples

This directory contains before/after refactoring examples that demonstrate SOLID principles, Clean Architecture patterns, and DDD practices.

## Structure

### SOLID Principles
- `srp-god-class/` — Single Responsibility Principle: splitting god classes
- `ocp-extension/` — Open/Closed Principle: extension via interfaces
- `lsp-contracts/` — Liskov Substitution Principle: contract preservation
- `isp-segregation/` — Interface Segregation Principle: focused interfaces
- `dip-inversion/` — Dependency Inversion Principle: inverting dependencies

### Clean Architecture
- `clean-architecture/` — Clean Architecture refactoring examples
  - `fat-controller/` — Moving business logic from controllers to use cases

## Usage

These examples are referenced by:
- `.cursor/rules/45-solid-principles.mdc`
- `.cursor/rules/36-architecture.mdc`
- Agent prompts (`@refactorer`, `@code-reviewer`)

## Adding New Examples

1. Create a new directory: `examples/refactoring/{pattern-name}/`
2. Include:
   - `before.{ext}` — Original code with issues
   - `after.{ext}` — Refactored code
   - `README.md` — Explanation of the refactoring
3. Link from relevant rule files
