# Examples

Small, focused examples to illustrate how to use the agents and rules in this repo.

## 1. TypeScript Express Handler (Before/After)
- `before-after/ts-express-handler-before.ts` — Minimal handler with missing validation, security, and observability.
- `before-after/ts-express-handler-after.ts` — Improved handler produced by an agent chain.

### Suggested Flow
1. `@architect` — Sketch service boundaries and responsibilities.
2. `@api-designer` — Define the REST API (paths, methods, schemas).
3. `@security-auditor` — Audit and fix security issues.
4. `@test-engineer` — Design and add tests.
5. `@perf-optimizer` — Optimize hot paths, if needed.
6. `@devops` — Add CI/CD and runtime configuration.
7. `@code-reviewer` — Final review and merge gate.

You can reproduce this flow in Cursor by opening the `before` file and driving agents one by one with short, task‑oriented prompts (e.g., “Act as the @security-auditor. Fix this handler.”).***
