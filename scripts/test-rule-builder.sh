#!/bin/bash
# Test script for rule builder (validates structure and logic)
# Note: Requires Node.js to run actual tests

set -e

echo "🧪 Testing Aegis Codex Rule Builder"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is available
NODE_PATH="/Users/m3tagh0st/.nvm/versions/node/v22.18.0/bin/node"
if [ -f "$NODE_PATH" ]; then
    export PATH="/Users/m3tagh0st/.nvm/versions/node/v22.18.0/bin:$PATH"
    NODE_AVAILABLE=true
    echo -e "${GREEN}✅ Node.js found: $($NODE_PATH --version)${NC}"
    echo ""
elif command -v node &> /dev/null; then
    NODE_AVAILABLE=true
    echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
    echo ""
else
    echo -e "${YELLOW}⚠️  Node.js not found in PATH${NC}"
    echo "   Running structure validation only..."
    echo ""
    NODE_AVAILABLE=false
fi

# Test 1: Check module structure
echo "Test 1: Module Structure"
echo "------------------------"
MODULES=(
    "lib/config/ConfigParser.js"
    "lib/config/ConfigValidator.js"
    "lib/rules/RuleReader.js"
    "lib/rules/RuleParser.js"
    "lib/rules/RuleMetadata.js"
    "lib/selection/RuleSelector.js"
    "lib/selection/DependencyResolver.js"
    "lib/selection/RuleValidator.js"
    "lib/output/RuleCopier.js"
    "lib/output/AgentsDocGenerator.js"
)

MISSING=0
for module in "${MODULES[@]}"; do
    if [ -f "scripts/$module" ]; then
        echo -e "  ${GREEN}✅${NC} $module"
    else
        echo -e "  ${RED}❌${NC} $module (missing)"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ All modules present${NC}"
else
    echo -e "${RED}❌ $MISSING modules missing${NC}"
    exit 1
fi
echo ""

# Test 2: Check example configs
echo "Test 2: Example Config Files"
echo "----------------------------"
CONFIGS=(
    "docs/.aegis-rules.example-minimal.json"
    "docs/.aegis-rules.example-typescript-backend.json"
    "docs/.aegis-rules.example-full-stack.json"
    "docs/.aegis-rules.example-php-laravel.json"
    "docs/.aegis-rules.example-java-spring.json"
    "docs/.aegis-rules.example-csharp-dotnet.json"
    "docs/.aegis-rules.example-backend-only.json"
    "docs/.aegis-rules.example-patterns-specific.json"
)

MISSING_CONFIGS=0
for config in "${CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        echo -e "  ${GREEN}✅${NC} $config"
        # Validate JSON syntax
        if command -v python3 &> /dev/null; then
            if python3 -m json.tool "$config" > /dev/null 2>&1; then
                echo -e "     ${GREEN}✓${NC} Valid JSON"
            else
                echo -e "     ${RED}✗${NC} Invalid JSON"
                MISSING_CONFIGS=$((MISSING_CONFIGS + 1))
            fi
        fi
    else
        echo -e "  ${RED}❌${NC} $config (missing)"
        MISSING_CONFIGS=$((MISSING_CONFIGS + 1))
    fi
done

if [ $MISSING_CONFIGS -eq 0 ]; then
    echo -e "${GREEN}✅ All config files present and valid${NC}"
else
    echo -e "${RED}❌ $MISSING_CONFIGS config files missing or invalid${NC}"
    exit 1
fi
echo ""

# Test 3: Check rules directory structure
echo "Test 3: Rules Directory Structure"
echo "---------------------------------"
if [ -d "rules" ]; then
    echo -e "  ${GREEN}✅${NC} rules/ directory exists"
    
    # Count rule files
    RULE_COUNT=$(find rules -name "*.mdc" -type f | wc -l | tr -d ' ')
    echo "     Found $RULE_COUNT rule files"
    
    # Check for required rules
    REQUIRED_RULES=(
        "00-persona.mdc"
        "10-global.mdc"
        "20-agents.mdc"
        "30-security.mdc"
        "36-architecture.mdc"
        "44-ddd.mdc"
    )
    
    MISSING_RULES=0
    for rule in "${REQUIRED_RULES[@]}"; do
        if find rules -name "$rule" -type f | grep -q .; then
            echo -e "     ${GREEN}✓${NC} $rule"
        else
            echo -e "     ${RED}✗${NC} $rule (missing)"
            MISSING_RULES=$((MISSING_RULES + 1))
        fi
    done
    
    if [ $MISSING_RULES -eq 0 ]; then
        echo -e "  ${GREEN}✅ All required rules present${NC}"
    else
        echo -e "  ${RED}❌ $MISSING_RULES required rules missing${NC}"
    fi
else
    echo -e "  ${RED}❌ rules/ directory missing${NC}"
    exit 1
fi
echo ""

# Test 4: Check metadata in rules
echo "Test 4: Rule Metadata"
echo "---------------------"
REQUIRED_METADATA=0
OPTIONAL_METADATA=0
NO_METADATA=0

while IFS= read -r file; do
    if grep -q "required: true" "$file"; then
        REQUIRED_METADATA=$((REQUIRED_METADATA + 1))
    elif grep -q "required: false" "$file"; then
        OPTIONAL_METADATA=$((OPTIONAL_METADATA + 1))
    else
        NO_METADATA=$((NO_METADATA + 1))
    fi
done < <(find rules -name "*.mdc" -type f)

echo "  Required rules (required: true): $REQUIRED_METADATA"
echo "  Optional rules (required: false): $OPTIONAL_METADATA"
if [ $NO_METADATA -gt 0 ]; then
    echo -e "  ${YELLOW}⚠️  Rules without metadata: $NO_METADATA${NC}"
else
    echo -e "  ${GREEN}✅ All rules have metadata${NC}"
fi
echo ""

# Test 5: Run Node.js tests if available
if [ "$NODE_AVAILABLE" = true ]; then
    echo "Test 5: Node.js Module Tests"
    echo "----------------------------"
    
    # Test config parsing
    echo "  Testing config parsing..."
    if $NODE_PATH -e "
        const ConfigParser = require('./scripts/lib/config/ConfigParser');
        const config = ConfigParser.readConfig('docs/.aegis-rules.example-minimal.json');
        console.log('    ✓ Config parsed successfully');
        console.log('    ✓ Version:', config.version);
        console.log('    ✓ Optional topics:', Object.keys(config.optional.topics).length);
    " 2>&1; then
        echo -e "  ${GREEN}✅ Config parsing works${NC}"
    else
        echo -e "  ${RED}❌ Config parsing failed${NC}"
        exit 1
    fi
    
    # Test rule reading
    echo "  Testing rule reading..."
    if $NODE_PATH -e "
        const RuleReader = require('./scripts/lib/rules/RuleReader');
        const rules = RuleReader.readRules('rules');
        console.log('    ✓ Rules read:', rules.length);
        console.log('    ✓ Sample rule:', rules[0]?.name || 'none');
    " 2>&1; then
        echo -e "  ${GREEN}✅ Rule reading works${NC}"
    else
        echo -e "  ${RED}❌ Rule reading failed${NC}"
        exit 1
    fi
    
    # Test metadata extraction
    echo "  Testing metadata extraction..."
    if $NODE_PATH -e "
        const RuleReader = require('./scripts/lib/rules/RuleReader');
        const RuleParser = require('./scripts/lib/rules/RuleParser');
        const RuleMetadata = require('./scripts/lib/rules/RuleMetadata');
        const rules = RuleReader.readRules('rules');
        if (rules.length > 0) {
            const parsed = RuleParser.parseRule(rules[0].content, rules[0].name);
            const meta = RuleMetadata.extractMetadata(parsed, rules[0].name);
            console.log('    ✓ Metadata extracted');
            console.log('    ✓ Category:', meta.category || 'none');
            console.log('    ✓ Required:', meta.required !== undefined ? meta.required : 'undefined');
        }
    " 2>&1; then
        echo -e "  ${GREEN}✅ Metadata extraction works${NC}"
    else
        echo -e "  ${RED}❌ Metadata extraction failed${NC}"
        exit 1
    fi
    
    echo ""
fi

# Summary
echo "===================================="
echo "Test Summary"
echo "===================================="
echo -e "${GREEN}✅ Structure validation: PASSED${NC}"
if [ "$NODE_AVAILABLE" = true ]; then
    echo -e "${GREEN}✅ Node.js tests: PASSED${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Test with example config: node scripts/build-agents-doc.js --config docs/.aegis-rules.example-minimal.json --dry-run"
    echo "  2. Generate rules: node scripts/build-agents-doc.js --config docs/.aegis-rules.example-minimal.json --both"
else
    echo -e "${YELLOW}⚠️  Node.js tests: SKIPPED (Node.js not available)${NC}"
    echo ""
    echo "To run full tests, install Node.js and run:"
    echo "  export PATH=\"/Users/m3tagh0st/.nvm/versions/node/v22.18.0/bin:\$PATH\""
    echo "  node scripts/build-agents-doc.js --config docs/.aegis-rules.example-minimal.json --dry-run"
fi
echo ""

