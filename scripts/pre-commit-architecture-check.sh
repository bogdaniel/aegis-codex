#!/bin/bash
# Pre-commit hook for architecture checks
# This script can be used as a git pre-commit hook or run manually
# Install: ln -s ../../scripts/pre-commit-architecture-check.sh .git/hooks/pre-commit

set -e

echo "🔍 Running architecture compliance checks..."

VIOLATIONS=0

# Check for deep relative imports in TypeScript files
echo "Checking for deep relative imports..."
if find . -name "*.ts" -type f ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/.next/*" ! -path "*/build/*" ! -path "*/test/scenarios/*" | xargs grep -l "\.\./\.\./\.\." 2>/dev/null | grep -v ".test.ts" | grep -v ".spec.ts" | head -1 > /dev/null; then
  echo "❌ Found deep relative imports (../../ or deeper). Use path aliases instead."
  echo "   Example: Use @identity/domain/* instead of ../../Domain/*"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "✅ No deep relative imports found"
fi

# Check for cross-context direct Domain/Infrastructure imports (simplified)
echo "Checking for cross-context direct imports..."
# This is a simplified check; full validation requires ESLint
CROSS_CONTEXT_IMPORTS=$(find . -name "*.ts" -type f ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/test/scenarios/*" | xargs grep -l "@.*/domain/\|@.*/infra/" 2>/dev/null | wc -l)
if [ "$CROSS_CONTEXT_IMPORTS" -gt 0 ]; then
  echo "⚠️  Found potential cross-context direct imports. Use public API modules (@context/app) instead."
  echo "   Full validation requires ESLint with no-restricted-imports rules."
else
  echo "✅ No obvious cross-context direct imports found"
fi

# Check for public API module documentation
echo "Checking public API module documentation..."
MISSING_DOCS=0
for file in $(find . -path "*/Application/index.ts" -o -path "*/Application/public.ts" -type f ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/test/scenarios/*"); do
  if ! head -20 "$file" | grep -qE "/\*\*|///"; then
    echo "⚠️  Public API module missing documentation: $file"
    MISSING_DOCS=$((MISSING_DOCS + 1))
  fi
done
if [ "$MISSING_DOCS" -eq 0 ]; then
  echo "✅ All public API modules have documentation"
else
  echo "⚠️  Found $MISSING_DOCS public API modules without documentation"
  echo "   This is a warning, not a blocker."
fi

# Run ESLint if config exists
if [ -f "test/example-app/.eslintrc.json" ]; then
  echo "Running ESLint with architecture rules..."
  if command -v npx &> /dev/null; then
    npx eslint --config test/example-app/.eslintrc.json "test/example-app/**/*.ts" --ext .ts 2>/dev/null || echo "⚠️  ESLint found issues. Review output above."
  else
    echo "⚠️  npx not found. Install Node.js to run ESLint checks."
  fi
fi

# Summary
if [ "$VIOLATIONS" -gt 0 ]; then
  echo ""
  echo "❌ Architecture violations found. Please fix before committing."
  echo "   See .cursor/rules/34-ci.mdc for architecture requirements."
  exit 1
else
  echo ""
  echo "✅ Architecture checks passed"
  exit 0
fi


