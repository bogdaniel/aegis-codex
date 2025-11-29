# Expected Output

## Structure

The `@code-reviewer` agent should produce:

1. **Grounding Block** - Goal, constraints, assumptions, metrics, tier
2. **Plan** - Architecture fixes to apply
3. **Implementation** - Single fenced corrected code block with:
   - Language tag: `typescript`
   - Filename comment: `// OrdersContext/Application/UseCases/PlaceOrder.ts` or equivalent
   - All architecture violations fixed
4. **Validation** - Verification artifact (architecture check command)
5. **Limits & Next Step** - One boundary; next smallest increment

## Required Fixes

The corrected code MUST include:

1. **Public API Module Usage:**
   - Use public API modules for cross-context access (e.g., `@identity/app`)
   - Import from `IdentityContext/Application/index.ts` (public API), not direct domain/infrastructure imports
   - Example: `import { GetUser } from '@identity/app'` instead of `import { User } from '@identity/domain/Entities/User.js'`

2. **Port/Interface Usage:**
   - Use ports/interfaces for cross-context dependencies (e.g., `IdentityPort`)
   - Inject dependencies via constructor (dependency injection)
   - Example: `constructor(private identityPort: IdentityPort) {}`

3. **No Direct Domain/Infrastructure Imports:**
   - Must NOT import from `@identity/domain/*` or `@identity/infra/*` directly
   - Must NOT import concrete implementations (e.g., `InMemoryUserRepository`)
   - Must use public API modules or ports/interfaces only

4. **Architecture Compliance:**
   - Respect Clean Architecture layering (Application layer uses ports, not concrete implementations)
   - Respect bounded context boundaries (cross-context via public API modules)
   - Respect DDD principles (no shared domain entities across contexts)

## Format Requirements

- **Exactly one** fenced code block with language tag and filename comment
- No unfenced code snippets
- No commented alternatives
- Format: ````typescript\n// filename.ts\n...code...\n````

## Verification Artifact

Must include a concrete architecture check command, e.g.:
- `npm run lint` (ESLint with architecture rules)
- `npm run type-check` (TypeScript compiler with path alias checks)
- Architecture dependency validation tool

## Architecture Rules Mapping

The agent should explicitly reference:
- **Bounded Context Boundaries** - Cross-context imports must use public API modules
- **Clean Architecture Layering** - Application layer uses ports, not concrete implementations
- **DDD Principles** - No shared domain entities across contexts

## Related Rules

The agent output should reference or comply with:
- `.cursor/rules/36-architecture.mdc` - Architecture rules (bounded contexts, public API modules)
- `.cursor/rules/44-ddd.mdc` - DDD rules (bounded context boundaries)
- `.cursor/rules/20-agents.mdc` - @code-reviewer agent definition and format requirements

