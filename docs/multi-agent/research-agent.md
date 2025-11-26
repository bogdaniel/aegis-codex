# Research Agent Documentation

## Overview

The `@researcher` agent gathers data from external sources (APIs, databases, web) and provides research reports with sources, findings, and recommendations aligned with Aegis Codex architecture doctrine.

## Role

**Research Agent:** Gather data from external sources and validate findings against Phase 0 rules

## Capabilities

- Research best practices and patterns
- Gather data from external APIs
- Query databases for information
- Search documentation and web resources
- Aggregate research findings
- Validate findings against Phase 0 rules
- Provide actionable recommendations

## Research Sources (Priority Order)

1. **Official documentation** (framework, language, tool docs)
2. **Industry best practices** (OWASP, Clean Architecture, DDD resources)
3. **Stack Overflow, GitHub discussions** (recent, high-voted)
4. **Academic papers** (when relevant, peer-reviewed)
5. **Vendor documentation** (AWS, Azure, GCP, etc.)
6. **Blog posts and articles** (from reputable sources)

## Research Methodology

1. **Start with official documentation** — Always prioritize official sources
2. **Cross-reference with industry standards** — Validate against established best practices
3. **Validate against Phase 0 rules** — Ensure alignment with:
   - 36-architecture.mdc (Clean/Hex/DDD)
   - 44-ddd.mdc (domain purity, bounded contexts)
   - 50-lang-*.mdc (language-specific rules)
4. **Prioritize recent sources** — Within 12-24 months for volatile topics
5. **Cite all sources** — Include URLs and dates for all sources

## Output Format

### Executive Summary
- Key findings in 2-3 bullets
- High-level recommendations

### Detailed Findings
- Comprehensive research results
- Analysis of each source
- Comparison and synthesis

### Sources
- All sources cited with URLs and dates
- Source credibility assessment
- Recency validation

### Recommendations
- Actionable recommendations aligned with Phase 0 rules
- Implementation guidance
- Risk assessment

### Validation
- How findings align with 36-architecture.mdc
- How findings align with 44-ddd.mdc
- How findings align with 50-lang-*.mdc
- Conflicts with established architecture doctrine (if any)

## Validation Requirements

**MUST validate:**
- Sources are credible and recent
- Findings align with Phase 0 rules (36-architecture.mdc, 44-ddd.mdc)
- Recommendations are actionable
- No conflicts with established architecture doctrine

## Delegation Capabilities

**Can delegate to:**
- @architect (for architecture design based on research)
- @security-auditor (for security validation of research findings)
- @api-designer (for API design based on research)
- @supervisor (for validation of research recommendations)

**Delegation syntax:**
```
After research, delegate to @[AGENT] for [PURPOSE]
```

**Context passing:**
- Research findings formatted as Context Block for easy handoff
- Includes Executive Summary, Detailed Findings, Sources, Recommendations, Validation

**When to delegate:**
- After research → @architect (for architecture design based on research)
- After research → @security-auditor (for security validation)
- After research → @api-designer (for API design)
- After research → @supervisor (for validation)

## Example Prompts

### Best Practices Research
```
@researcher Research best practices for implementing CQRS in TypeScript following Clean Architecture.
```

### Security Research
```
@researcher Gather information about OWASP Top 10 2024 updates and validate against 30-security.mdc.
```

### Performance Research
```
@researcher Research performance optimization patterns for Node.js microservices and ensure alignment with 33-performance.mdc.
```

### Architecture Pattern Research
```
@researcher Research bounded context patterns in DDD and validate against 44-ddd.mdc.
```

### Research with Delegation
```
@researcher Research Event Sourcing patterns. After research, delegate to @architect for architecture design.
```

## Integration with Multi-Agent Workflows

The research agent can be used in multi-agent workflows:

### Sequential Workflow
```
1. @researcher Research [TOPIC]
2. @architect Design architecture based on research
3. @supervisor Validate architecture
```

### Parallel Workflow
```
@orchestrator Research [TOPIC] with parallel analysis:
- @researcher: Best practices research
- @security-auditor: Security implications
- @perf-optimizer: Performance considerations
```

### Conditional Workflow
```
@orchestrator Research [TOPIC]. If findings conflict with Phase 0 rules, delegate to @architect for alternative approach.
```

## See Also

- `docs/agent-prompts/templates.md` — Research agent templates
- `.cursor/rules/20-agents.mdc` — Research agent definition
- `docs/multi-agent/overview.md` — Multi-agent system overview
- `docs/multi-agent/delegation-matrix.md` — Delegation capabilities


