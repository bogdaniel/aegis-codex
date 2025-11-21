# TypeScript Guide
- **Stack defaults:** Node 20+, TS strict mode, ESM where possible, React/Vite on frontend, Express/Fastify on backend.

## Setup
- Use `npm` or `pnpm` with lockfile; target `"module": "esnext"`, `"strict": true`.
- Enable path aliases via `tsconfig` `paths`; avoid default exports for shared libs.

## Style & Lint
- Enforce `eslint` (typescript-eslint) + `prettier`; command: `npm run lint && npm run format`.
- No `any`/`!`; prefer discriminated unions; enable `noImplicitAny`, `noUncheckedIndexedAccess`.

## Testing
- Use `vitest` or `jest`; keep tests colocated; command: `npm test`.
- Mock boundaries; favor integration tests for API contracts with `supertest`/`undici`.

## Security
- Validate inputs with `zod`/`yup`; never string-concat SQL; use parameterized queries/ORM.
- Sanitize/escape output; set `helmet` for HTTP headers; enforce `httpOnly`, `secure`, `SameSite`.
- Secrets via env/secret manager; forbid committing `.env`; run `npm audit --production --audit-level=high`.

## Performance
- Avoid unbounded Promises; add timeouts/retries with backoff; use pools for DB/HTTP.
- Memoize/paginate where appropriate; watch bundle size and tree-shake.
