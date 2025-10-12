# TypeScript Guide

- **Compiler:** `strict` mode, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`.
- **Tooling:** ESLint + Prettier; ts-node or tsx; Vitest/Jest.
- **Patterns:** Ports/Adapters; CQRS where helpful; DI via constructor injection.
- **Testing:** Unit + integration; coverage ≥ 90%; use fakes for IO.
- **Runtime Safety:** zod/io-ts for runtime validation at edges.

## tsconfig baseline
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": false,
    "outDir": "dist"
  }
}
```

