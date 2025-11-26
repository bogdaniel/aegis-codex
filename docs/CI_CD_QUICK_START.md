# CI/CD Architecture Checks - Quick Start

**Status:** ✅ **READY TO USE**

---

## 🚀 Quick Setup (5 minutes)

### 1. Install Pre-Commit Hooks

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Test it works
pre-commit run --all-files
```

### 2. Verify GitHub Actions

GitHub Actions workflow (`.github/workflows/aegis-architecture-check.yml`) runs automatically on:
- Pull requests
- Pushes to `main` branch

**No setup needed** — it's already configured!

### 3. Test Locally

```bash
# Run architecture checks manually
./scripts/pre-commit-architecture-check.sh

# Or use pre-commit
pre-commit run --all-files
```

---

## ✅ What Gets Checked

### TypeScript/JavaScript
- ✅ Path aliases required (no `../../` imports)
- ✅ Domain cannot import Infrastructure/Interface
- ✅ Cross-context must use public API modules

### PHP
- ✅ PHPCS (PSR-12)
- ✅ PHPStan (level max)
- ✅ Deptrac (if configured)

### Other Languages
- ✅ Rust: fmt + clippy
- ✅ Go: fmt + vet
- ✅ Python: Black + Ruff

---

## 📋 Files Created

1. **`.github/workflows/aegis-architecture-check.yml`** — GitHub Actions workflow
2. **`.pre-commit-config.yaml`** — Pre-commit hooks configuration
3. **`scripts/pre-commit-architecture-check.sh`** — Standalone check script
4. **`docs/CI_CD_SETUP.md`** — Detailed setup guide

---

## 🎯 Next Steps

1. **Install pre-commit hooks:** `pip install pre-commit && pre-commit install`
2. **Test locally:** `pre-commit run --all-files`
3. **Create a PR** to see GitHub Actions in action

---

**Status:** ✅ **CI/CD AUTOMATION COMPLETE** — Architecture checks are now automated!


