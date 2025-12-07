const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');

function parseWorkflow(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  // Handle Markdown with YAML frontmatter
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    try {
      return yaml.parse(frontmatterMatch[1]);
    } catch (error) {
      return { __error: `Invalid frontmatter: ${error.message}` };
    }
  }

  try {
    return yaml.parse(raw);
  } catch (error) {
    return { __error: `Invalid YAML: ${error.message}` };
  }
}

/**
 * Lightweight workflow validator to catch obvious issues before manifesting.
 * Checks required fields and (best-effort) referenced instruction file existence when resolvable.
 */
function deriveName(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  if (base === 'workflow') {
    // If the file is named workflow.yaml, use parent directory as name
    return path.basename(path.dirname(filePath));
  }
  return base;
}

function validateWorkflow(filePath) {
  const parsed = parseWorkflow(filePath);
  if (!parsed || parsed.__error) {
    return { valid: false, reason: parsed?.__error || 'Unable to parse workflow' };
  }

  const name = typeof parsed.name === 'string' && parsed.name.trim().length > 0 ? parsed.name : deriveName(filePath);
  const description = typeof parsed.description === 'string' ? parsed.description : '';

  const instructionsPath = parsed.instructions;
  if (instructionsPath && typeof instructionsPath === 'string' && !instructionsPath.includes('{')) {
    const candidate = instructionsPath.startsWith('{project-root}')
      ? instructionsPath.replace('{project-root}', path.resolve('.'))
      : path.resolve(path.dirname(filePath), instructionsPath);
    if (!fs.existsSync(candidate)) {
      return { valid: false, reason: `Instructions not found at ${candidate}` };
    }
  }

  return { valid: true, name, description };
}

module.exports = { validateWorkflow, parseWorkflow };
