# Why Use Path Aliases?

## Benefits for Clean Architecture

Path aliases make the **bounded contexts and layers explicit** in imports:

### Before (Relative Imports)
```typescript
import { User } from '../../Domain/Entities/User.js';
import { UserRepository } from '../../Domain/Ports/UserRepository.js';
import { RegisterUser } from '../UseCases/RegisterUser.js';
```

**Problems:**
- Hard to see which context/layer you're importing from
- Fragile when files move (relative paths break)
- No clear architecture boundaries in code

### After (Path Aliases)
```typescript
import { User } from '@identity/domain/Entities/User.js';
import { UserRepository } from '@identity/domain/Ports/UserRepository.js';
import { RegisterUser } from '@identity/app/UseCases/RegisterUser.js';
```

**Benefits:**
- ✅ **Explicit bounded context**: `@identity` vs `@orders` is clear
- ✅ **Explicit layer**: `domain`, `app`, `infra`, `interface` are visible
- ✅ **Maintainable**: Moving files doesn't break imports
- ✅ **Self-documenting**: Code shows architecture structure
- ✅ **Aligns with Clean Architecture**: Layers and contexts are first-class

## Architecture Compliance

Path aliases enforce:
- **Bounded Context boundaries**: `@identity/*` vs `@orders/*`
- **Layer boundaries**: `domain`, `app`, `infra`, `interface`
- **Dependency rules**: Can't accidentally import wrong layer/context

## Implementation

The `tsconfig.json` now includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@identity/domain/*": ["IdentityContext/Domain/*"],
      "@identity/app/*": ["IdentityContext/Application/*"],
      "@identity/infra/*": ["IdentityContext/Infrastructure/*"],
      "@identity/interface/*": ["IdentityContext/Interface/*"],
      "@orders/domain/*": ["OrdersContext/Domain/*"],
      "@orders/app/*": ["OrdersContext/Application/*"],
      "@orders/infra/*": ["OrdersContext/Infrastructure/*"],
      "@orders/interface/*": ["OrdersContext/Interface/*"]
    }
  }
}
```

## Runtime Support

- **Development** (`tsx`): Automatically resolves path aliases
- **Production** (`node`): TypeScript compiles paths to relative imports
- **Tests** (`vitest`): Configured to resolve paths

## Migration

To migrate existing code:
1. Replace relative imports with path aliases
2. Keep `.js` extensions (ESM requirement)
3. Example: `../../Domain/Entities/User.js` → `@identity/domain/Entities/User.js`

## Why I Didn't Use Them Initially

I chose relative imports initially for:
- **Simplicity**: No extra tooling needed
- **Quick setup**: Works out of the box
- **Demonstration**: Focus on architecture, not tooling

But path aliases are **better for production** because they:
- Make architecture explicit
- Improve maintainability
- Align with Clean Architecture principles
- Are recommended in TypeScript best practices

