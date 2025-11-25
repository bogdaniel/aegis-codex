# CI/CD Architecture Checks Setup Guide

**Date:** 2024-11-24
**Status:** ✅ **AUTOMATED** — GitHub Actions and pre-commit hooks configured

---

## Overview

Aegis Codex includes automated CI/CD checks to enforce architecture doctrine (Clean Architecture, Hexagonal, DDD) before code is merged.

---

## GitHub Actions Workflows

### Architecture Check Workflow

**File:** `.github/workflows/aegis-architecture-check.yml`

**What it checks:**
- ✅ TypeScript: Path aliases, deep relative imports, cross-context imports
- ✅ PHP: Deptrac layer dependency checks (if configured)
- ✅ Java: Package boundary checks (requires ArchUnit setup)
- ✅ C#: Architecture checks (requires ArchUnit.NET setup)
- ✅ Public API module documentation (JSDoc/TSDoc headers)

**When it runs:**
- On pull requests
- On pushes to `main` branch

**How to use:**
- Automatically runs on PR/push
- Check workflow status in GitHub Actions tab
- Fix violations before merging

---

## Pre-Commit Hooks

### Installation

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually (all files)
pre-commit run --all-files

# Run on staged files only (automatic on commit)
pre-commit run
```

### What it checks:

**TypeScript/JavaScript:**
- ESLint with architecture rules (path aliases, import restrictions)
- Deep relative imports (../../ or deeper)
- Cross-context direct imports

**PHP:**
- PHPCS (PSR-12)
- PHPStan (level max)

**Rust:**
- `cargo fmt`
- `cargo clippy`

**Go:**
- `go fmt`
- `go vet`

**Python:**
- Black (formatting)
- Ruff (linting)

**Markdown:**
- Markdownlint

---

## Standalone Architecture Check Script

**File:** `scripts/pre-commit-architecture-check.sh`

**Usage:**
```bash
# Run manually
./scripts/pre-commit-architecture-check.sh

# Use as git pre-commit hook
ln -s ../../scripts/pre-commit-architecture-check.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**What it checks:**
- Deep relative imports (../../ or deeper)
- Cross-context direct imports (warnings)
- Public API module documentation
- ESLint with architecture rules (if config exists)

---

## Language-Specific Setup

### TypeScript/JavaScript

**ESLint Configuration:**
- Use `.eslintrc.json` with `no-restricted-imports` rules
- Example: `test/example-app/.eslintrc.json`

**Checks:**
- ✅ Path aliases required (no deep relative imports)
- ✅ Domain cannot import Infrastructure/Interface
- ✅ Cross-context must use public API modules

**Local command:**
```bash
cd test/example-app
npm run lint  # Uses .eslintrc.json with architecture rules
```

### PHP

**Deptrac Setup:**
```bash
composer require --dev qossmic/deptrac-shim
```

**Create `deptrac.yaml`:**
```yaml
paths:
  - ./src

layers:
  - name: Domain
    collectors:
      - type: directory
        value: Domain
  - name: Application
    collectors:
      - type: directory
        value: Application
  - name: Infrastructure
    collectors:
      - type: directory
        value: Infrastructure
  - name: Interface
    collectors:
      - type: directory
        value: Interface

ruleset:
  Domain:
    - Application
  Application:
    - Domain
  Infrastructure:
    - Domain
    - Application
  Interface:
    - Application
    - Domain
```

**Run:**
```bash
vendor/bin/deptrac analyse
```

### Java

**ArchUnit Setup:**
```xml
<dependency>
    <groupId>com.tngtech.archunit</groupId>
    <artifactId>archunit-junit5</artifactId>
    <version>1.0.1</version>
    <scope>test</scope>
</dependency>
```

**Create architecture test:**
```java
@AnalyzeClasses(packages = "com.company.identity")
public class ArchitectureTest {
    @ArchTest
    static final ArchRule domainShouldNotDependOnInfrastructure = 
        noClasses()
            .that().resideInAPackage("..domain..")
            .should().dependOnClassesThat().resideInAPackage("..infrastructure..");
}
```

### C#

**ArchUnit.NET Setup:**
```bash
dotnet add package ArchUnitNET.xUnit
```

**Create architecture test:**
```csharp
[Fact]
public void DomainShouldNotDependOnInfrastructure()
{
    var rule = ArchRuleDefinition
        .NoClasses()
        .That().AreInNamespace("Company.Identity.Domain")
        .Should().DependOnAnyClassesThat().AreInNamespace("Company.Identity.Infrastructure");
    
    rule.Check(Architecture);
}
```

---

## Troubleshooting

### Pre-commit hooks not running

**Issue:** Hooks not executing on commit

**Fix:**
```bash
# Reinstall hooks
pre-commit uninstall
pre-commit install

# Verify installation
ls -la .git/hooks/pre-commit
```

### ESLint architecture rules not working

**Issue:** ESLint not catching architecture violations

**Fix:**
1. Check `.eslintrc.json` exists and has `no-restricted-imports` rules
2. Verify ESLint config path in pre-commit config
3. Run manually: `npx eslint --config .eslintrc.json "**/*.ts"`

### Deptrac not configured

**Issue:** PHP architecture checks skipped

**Fix:**
1. Install Deptrac: `composer require --dev qossmic/deptrac-shim`
2. Create `deptrac.yaml` with layer rules
3. Run: `vendor/bin/deptrac analyse`

---

## Verification

### Test locally before committing:

```bash
# Run all pre-commit checks
pre-commit run --all-files

# Or use standalone script
./scripts/pre-commit-architecture-check.sh

# TypeScript-specific
cd test/example-app
npm run lint
npm run type-check
```

### Check GitHub Actions:

1. Push to branch or create PR
2. Go to GitHub Actions tab
3. Check `Aegis Architecture Check` workflow
4. Review any failures

---

## Next Steps

1. ✅ **GitHub Actions workflow created** — `.github/workflows/aegis-architecture-check.yml`
2. ✅ **Pre-commit hooks configured** — `.pre-commit-config.yaml`
3. ✅ **Standalone script created** — `scripts/pre-commit-architecture-check.sh`
4. ⏭️ **Install pre-commit hooks:** `pip install pre-commit && pre-commit install`
5. ⏭️ **Configure Deptrac for PHP** (if using PHP)
6. ⏭️ **Set up ArchUnit for Java/C#** (if using Java/C#)

---

**Status:** ✅ **CI/CD AUTOMATION COMPLETE** — Architecture checks are now automated.

