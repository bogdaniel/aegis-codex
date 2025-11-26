# Rule Builder Testing Guide

This document describes how to test the Aegis Codex rule builder.

## Prerequisites

- Node.js 18+ installed and in PATH
- All rule files updated with metadata (`required`, `category`, `subcategory`)
- Example config files present (`.aegis-rules.example-*.json`)

## Quick Test

```bash
# Run structure validation
./scripts/test-rule-builder.sh

# Test with minimal config (dry run)
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run

# Test with TypeScript backend config
node scripts/build-agents-doc.js --config .aegis-rules.example-typescript-backend.json --dry-run
```

## Test Scenarios

### 1. Minimal Config Test

**Config:** `.aegis-rules.example-minimal.json`

**Expected:**
- All 15 mandatory rules included
- Only TypeScript language rule included
- No optional topics/methodologies/patterns
- Total: ~16 rules

**Command:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run
```

**Verify:**
- Output shows 15 mandatory rules
- Only `50-lang-typescript.mdc` in language rules
- No optional topics/methodologies/patterns

### 2. TypeScript Backend Config Test

**Config:** `.aegis-rules.example-typescript-backend.json`

**Expected:**
- All 15 mandatory rules included
- TypeScript language rule included
- Performance, API, Observability-Security topics included
- All methodologies included
- All pattern categories included
- Total: ~80+ rules

**Command:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-typescript-backend.json --dry-run
```

**Verify:**
- Output shows all mandatory rules
- TypeScript language rule present
- Performance, API topics present
- All methodologies present
- Pattern rules present

### 3. Full Stack Config Test

**Config:** `.aegis-rules.example-full-stack.json`

**Expected:**
- All 15 mandatory rules included
- TypeScript, JavaScript, HTML, CSS language rules included
- All topics including Accessibility
- All methodologies
- All patterns
- Total: ~85+ rules

**Command:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-full-stack.json --dry-run
```

**Verify:**
- Multiple language rules (TypeScript, JavaScript, HTML, CSS)
- Accessibility topic included
- All other topics included

### 4. PHP Laravel Config Test

**Config:** `.aegis-rules.example-php-laravel.json`

**Expected:**
- All 15 mandatory rules included
- PHP language rule included
- PHP Laravel guidelines included
- All topics/methodologies/patterns
- Total: ~80+ rules

**Command:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-php-laravel.json --dry-run
```

**Verify:**
- PHP language rule present
- PHP Laravel guidelines present
- No TypeScript/JavaScript rules

### 5. Pattern-Specific Config Test

**Config:** `.aegis-rules.example-patterns-specific.json`

**Expected:**
- All 15 mandatory rules included
- TypeScript language rule included
- Only architectural-enterprise patterns
- Only specific patterns listed (layered-architecture, aggregate, value-object, domain-event, cqrs)
- Total: ~20 rules

**Command:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-patterns-specific.json --dry-run
```

**Verify:**
- Only architectural-enterprise patterns
- Only 5 specific patterns included
- No behavioural/creational/structural patterns

## Integration Tests

### Test 1: Generate Rules and AGENTS.md

```bash
# Generate .cursor/rules/ and AGENTS.md
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --both

# Verify output
ls -la .cursor/rules/ | head -20
cat AGENTS.md | head -50
```

**Expected:**
- `.cursor/rules/` directory created with selected rules
- `AGENTS.md` generated with rule documentation
- Only mandatory + TypeScript rules in `.cursor/rules/`

### Test 2: Dependency Resolution

**Test:** Language rules should automatically include architecture rules

```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run | grep -i "dependency"
```

**Expected:**
- TypeScript rule includes `36-architecture.mdc` and `44-ddd.mdc` as dependencies
- Dependency resolver adds them automatically

### Test 3: Backward Compatibility

**Test:** `--langs` flag should still work

```bash
node scripts/build-agents-doc.js --langs typescript,php --dry-run
```

**Expected:**
- All mandatory rules included
- TypeScript and PHP language rules included
- Works without config file

## Validation Checks

### Metadata Validation

All rules should have:
- `required: true` or `required: false`
- `category: "core" | "topic" | "methodology" | "language" | "pattern"`
- `subcategory: "<specific-subcategory>"`

**Check:**
```bash
# Count rules with metadata
grep -l "required:" rules/*.mdc | wc -l
grep -l "category:" rules/*.mdc | wc -l

# Check for missing metadata
find rules -name "*.mdc" -type f -exec grep -L "required:" {} \;
```

### Rule Selection Validation

**Check mandatory rules are always included:**
```bash
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run | grep "00-persona\|10-global\|20-agents"
```

**Check optional rules are filtered:**
```bash
# Should NOT include PHP rule
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run | grep "50-lang-php" && echo "ERROR: PHP rule included" || echo "OK: PHP rule excluded"
```

## Error Cases

### Invalid Config File

```bash
# Create invalid JSON
echo '{"invalid": json}' > /tmp/invalid.json
node scripts/build-agents-doc.js --config /tmp/invalid.json --dry-run
```

**Expected:** Error message about invalid JSON

### Missing Config File

```bash
node scripts/build-agents-doc.js --config /tmp/nonexistent.json --dry-run
```

**Expected:** Error message or fallback to default config

### Missing Rules Directory

```bash
# Temporarily rename rules directory
mv rules rules.backup
node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run
mv rules.backup rules
```

**Expected:** Error message about missing rules directory

## Performance Tests

### Large Config Test

```bash
# Test with all languages and patterns
node scripts/build-agents-doc.js --config .aegis-rules.example-full-stack.json --both

# Measure time
time node scripts/build-agents-doc.js --config .aegis-rules.example-full-stack.json --both
```

**Expected:** Completes in < 5 seconds for 80+ rules

## Continuous Integration

Add to CI pipeline:

```yaml
# .github/workflows/test-rule-builder.yml
- name: Test Rule Builder
  run: |
    ./scripts/test-rule-builder.sh
    node scripts/build-agents-doc.js --config .aegis-rules.example-minimal.json --dry-run
    node scripts/build-agents-doc.js --config .aegis-rules.example-typescript-backend.json --dry-run
```

## Troubleshooting

### "Module not found" errors

**Solution:** Ensure all modules are in `scripts/lib/`:
```bash
ls -la scripts/lib/*/
```

### "Config validation failed"

**Solution:** Check config JSON syntax:
```bash
python3 -m json.tool .aegis-rules.example-minimal.json
```

### "Rule metadata missing"

**Solution:** Update rule frontmatter:
```bash
# Check which rules are missing metadata
find rules -name "*.mdc" -exec grep -L "required:" {} \;
```

### "Dependency resolution failed"

**Solution:** Check `DependencyResolver.js` logic matches rule structure.

## Next Steps

After successful testing:
1. Document any issues found
2. Proceed with Phase 2 (Backward Compatibility & Dry-Run) if needed
3. Proceed with Phase 3 (Interactive Mode) if needed

