#!/bin/bash
# Policy Validation Script
# Validates that policy scenarios are properly structured and can be enforced

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
POLICIES_DIR="$REPO_ROOT/tests/policies"

echo "🔍 Validating policy scenarios..."

# Check if policies directory exists
if [ ! -d "$POLICIES_DIR" ]; then
  echo "❌ Policies directory not found: $POLICIES_DIR"
  exit 1
fi

# Find all policy scenario directories
POLICY_SCENARIOS=$(find "$POLICIES_DIR" -mindepth 1 -maxdepth 1 -type d ! -name ".*")

if [ -z "$POLICY_SCENARIOS" ]; then
  echo "⚠️  No policy scenarios found in $POLICIES_DIR"
  exit 0
fi

ERRORS=0

# Validate each policy scenario
for SCENARIO_DIR in $POLICY_SCENARIOS; do
  SCENARIO_NAME=$(basename "$SCENARIO_DIR")
  echo ""
  echo "📋 Validating scenario: $SCENARIO_NAME"
  
  # Check required files
  REQUIRED_FILES=("prompt.md" "expected-output.md" "validation.md")
  MISSING_FILES=()
  
  for FILE in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$SCENARIO_DIR/$FILE" ]; then
      MISSING_FILES+=("$FILE")
    fi
  done
  
  if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    echo "  ❌ Missing required files: ${MISSING_FILES[*]}"
    ERRORS=$((ERRORS + 1))
    continue
  fi
  
  # Validate prompt.md contains a prompt
  if ! grep -q "\`\`\`" "$SCENARIO_DIR/prompt.md" 2>/dev/null; then
    echo "  ⚠️  prompt.md may not contain a code block with the prompt"
  fi
  
  # Validate validation.md contains checkboxes
  if ! grep -q "\[ \]" "$SCENARIO_DIR/validation.md" 2>/dev/null; then
    echo "  ⚠️  validation.md may not contain validation checkboxes"
  fi
  
  # Validate expected-output.md references rules
  if ! grep -q "\.cursor/rules" "$SCENARIO_DIR/expected-output.md" 2>/dev/null; then
    echo "  ⚠️  expected-output.md should reference relevant .cursor/rules files"
  fi
  
  echo "  ✅ Scenario structure valid"
done

echo ""
if [ $ERRORS -eq 0 ]; then
  echo "✅ All policy scenarios are properly structured"
  exit 0
else
  echo "❌ Found $ERRORS scenario(s) with errors"
  exit 1
fi

