# Expected Output

## Structure

The `@code-reviewer` agent should produce:

1. **Grounding Block** - Goal, constraints, assumptions, metrics, tier
2. **Plan** - Architecture fixes to apply
3. **Implementation** - Single fenced corrected code block with:
   - Language tag: `typescript`
   - Filename comment: `// PaymentContext/Domain/Services/PaymentProcessor.ts` or equivalent
   - All architecture violations fixed
4. **Validation** - Verification artifact (architecture check command)
5. **Limits & Next Step** - One boundary; next smallest increment

## Required Fixes

The corrected code MUST include:

1. **Domain Purity:**
   - Domain layer MUST NOT import external SDK types (e.g., `StripePaymentIntent`)
   - Domain layer MUST use clean domain types (e.g., `Payment`, `PaymentStatus`)
   - External DTOs mapped to domain types in Infrastructure layer (ACL)

2. **Anti-Corruption Layer:**
   - ACL adapter in Infrastructure layer translates external DTOs to domain types
   - Example: `StripePaymentAdapter` maps `StripePaymentIntent` to `Payment` domain entity
   - Domain layer receives clean domain types, not external DTOs

3. **Port/Interface Pattern:**
   - Domain layer defines ports/interfaces (e.g., `PaymentGatewayPort`)
   - Infrastructure layer implements ports (e.g., `StripePaymentGateway` implements `PaymentGatewayPort`)
   - Domain layer depends on ports, not concrete implementations

4. **Architecture Compliance:**
   - Respect Clean Architecture layering (Domain layer framework-free, infrastructure-free)
   - Respect DDD principles (domain purity, no external dependencies)
   - Respect anti-corruption layer pattern (external DTOs mapped in Infrastructure)

## Format Requirements

- **Exactly one** fenced code block with language tag and filename comment
- No unfenced code snippets
- No commented alternatives
- Format: ````typescript\n// filename.ts\n...code...\n````

## Verification Artifact

Must include a concrete architecture check command, e.g.:
- `npm run lint` (ESLint with architecture rules)
- `npm run type-check` (TypeScript compiler with import restrictions)
- Architecture dependency validation tool

## Architecture Rules Mapping

The agent should explicitly reference:
- **Domain Purity** - Domain layer must not import external SDK types
- **Anti-Corruption Layer** - External DTOs mapped to domain types in Infrastructure
- **Port/Adapter Pattern** - Domain layer uses ports, Infrastructure implements adapters

## Related Rules

The agent output should reference or comply with:
- `.cursor/rules/36-architecture.mdc` - Architecture rules (domain purity, ports/adapters)
- `.cursor/rules/38-anti-corruption-events.mdc` - Anti-corruption layer rules
- `.cursor/rules/44-ddd.mdc` - DDD rules (domain purity)
- `.cursor/rules/20-agents.mdc` - @code-reviewer agent definition and format requirements

