# JavaScript Guide
- **Stack defaults:** Node 20+, ESM preferred; favor TypeScript when possible.

## Setup
- Use `npm`/`pnpm` with lockfile; avoid unpinned deps and `latest`.
- Configure `"type": "module"` for new projects; use `.mjs` for ESM if mixed.

## Style & Lint
- Enforce `eslint` + `prettier`; command: `npm run lint && npm run format`.
- Prefer const/let, arrow functions, and small modules; avoid implicit globals.

## Testing
- Use `vitest`/`jest`; keep fast unit tests; command: `npm test`.
- Mock external IO; add integration tests for APIs with `supertest`/`undici`.

## Security
- Validate inputs with `zod`/`ajv`; never string-concat SQL; sanitize outputs; set `helmet`.
- Secrets via env/secret manager; no `.env` in git; use `npm audit --production --audit-level=high`.
- Secure cookies: `httpOnly`, `secure`, `SameSite`; enable CSRF where stateful.

## Performance
- Avoid unbounded concurrency; set timeouts/retries; reuse connections.
- Use streaming where applicable; paginate large responses.
