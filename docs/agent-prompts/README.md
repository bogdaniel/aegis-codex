# Agent Prompt Templates Library

**Date:** 2024-11-24
**Status:** ✅ **COMPLETE** — Comprehensive prompt template library

---

## 📚 Contents

This directory contains reusable prompt templates and best practices for using Aegis Codex agents.

### Files

1. **`templates.md`** — Complete template library organized by agent
   - Templates for all 9 agents
   - Context-specific variations
   - Cross-agent workflows
   - Copy-paste ready examples

2. **`best-practices.md`** — Best practices guide
   - Core principles
   - Prompt structure
   - Common mistakes
   - Debugging tips

3. **`common-patterns.md`** — Common patterns and variations
   - Quick reference table
   - Workflow patterns
   - Language-specific variations
   - Copy-paste templates

---

## 🚀 Quick Start

### For Developers

1. **Find your task** in `templates.md`
2. **Copy the template** that matches your scenario
3. **Replace placeholders** (e.g., `[FEATURE_NAME]`, `[FILE_PATH]`)
4. **Paste in Cursor** and get results

### For Architects

1. **Review `best-practices.md`** for prompt design principles
2. **Use `common-patterns.md`** for workflow templates
3. **Customize templates** for your team's needs

---

## 📋 Template Categories

### By Agent

- **@architect** — Architecture design templates
- **@security-auditor** — Security audit templates
- **@test-engineer** — Test generation templates
- **@code-reviewer** — Code review templates
- **@refactorer** — Refactoring templates
- **@perf-optimizer** — Performance optimization templates
- **@api-designer** — API design templates
- **@devops** — CI/CD configuration templates

### By Workflow

- **End-to-End Feature Development** — Complete workflow
- **Security-First Development** — Security-focused workflow
- **Performance Optimization** — Performance-focused workflow
- **Legacy Refactoring** — Refactoring workflow

---

## 🎯 Usage Examples

### Example 1: New Feature

```
@architect Design a PaymentContext that processes payments and integrates with IdentityContext for user validation.
```

### Example 2: Security Audit

```
@security-auditor Review and fix security issues in src/handlers/paymentHandler.ts.
```

### Example 3: Test Coverage

```
@test-engineer Add tests for the RegisterUser use case with coverage of happy path, edge cases, and error scenarios.
```

---

## 📖 Documentation

- **`templates.md`** — Full template library (start here)
- **`best-practices.md`** — How to write effective prompts
- **`common-patterns.md`** — Quick reference and patterns

---

## 🔗 Related Resources

- `docs/USAGE.md` — Complete usage guide
- `docs/agent-prompts.md` — Legacy example prompts
- `.cursor/rules/20-agents.mdc` — Agent definitions
- `test/scenarios/` — Real-world test scenarios

---

**Last Updated:** 2024-11-24
**Version:** 1.0.0


