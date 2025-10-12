# Aegis Codex

**A comprehensive, tool-agnostic ruleset and agent suite for enterprise‑grade and “military‑grade” code generation.**
Targets Cursor, Aider, Continue, and similar tools via production-ready guardrails, prompts, and documentation.

## Why Aegis Codex?
- **Security-first:** Aligns with OWASP ASVS L2/L3, NIST SSDF (SP 800‑218), supply‑chain controls (SLSA ≥ 3), SBOMs (CycloneDX).
- **Architecture-true:** Enforces Clean Architecture, SOLID, DDD, and pragmatic design patterns.
- **Testable by design:** High coverage targets, deterministic outputs, and golden tests for prompts.

## Layout
```
aegis-codex/
├── .cursor/
│   └── rules
├── agents.md
├── docs/
│   ├── architecture-patterns.md
│   ├── security-standards.md
│   ├── language-guides/
│   │   ├── python.md
│   │   ├── typescript.md
│   │   ├── java.md
│   │   ├── go.md
│   │   └── csharp.md
│   ├── testing-standards.md
│   ├── code-review-checklist.md
│   ├── threat-model.md
│   ├── adr/
│   │   └── 0001-record-architecture-decisions.md
│   ├── contributing.md
│   └── security.md
├── examples/
│   └── before-after/
│       ├── python-before.py
│       ├── python-after.py
│       ├── typescript-before.ts
│       └── typescript-after.ts
└── LICENSE
```

## Quick Start
1. Read **docs/architecture-patterns.md** and **docs/security-standards.md**.
2. Configure your editor/agent to respect **.cursor/rules**.
3. Use **agents.md** prompts for task‑specialized assistance.
4. Enforce **docs/testing-standards.md** in CI.
5. Apply **docs/code-review-checklist.md** on every PR.

## Versioning
- Ruleset: `v1.0.0` (2025-10-11)
- Breaking rule changes follow SemVer; see ADRs for rationale.

## License
MIT — see [LICENSE](LICENSE).
