# API Standards
- **Purpose:** Consistent, secure, and evolvable HTTP/GraphQL APIs.
- **Scope:** Applies to all external and internal service APIs.

## Design Principles
- Model resources and operations explicitly; use nouns for resources and HTTP methods for actions.
- Prefer predictable, RESTful URIs (`/users/{id}/orders`) and consistent naming.
- Maintain backward compatibility; introduce new versions instead of breaking changes.

## HTTP Conventions
- Use standard methods: GET (read), POST (create/action), PUT/PATCH (update), DELETE (delete).
- Status codes: 2xx (success), 4xx (client errors), 5xx (server errors). Be consistent (e.g., 400/401/403/404/409/422).
- Responses: JSON by default; include `Content-Type: application/json`.

## Requests & Responses
- Validate all inputs; reject invalid payloads with structured error responses.
- Use consistent error format (e.g., `{ "error": { "code": "invalid_input", "message": "...", "details": [...] } }`).
- Support filtering, sorting, and pagination via query parameters; document defaults and limits.

## Pagination
- Limit page size; provide `page`/`pageSize` or cursor-based pagination for large collections.
- Include pagination metadata (e.g., total count, next/prev cursors) where needed.

## Versioning
- Version APIs (`/v1/...` or `Accept` header) and document deprecation timelines.
- Avoid silent behavior changes between versions; keep contracts stable.

## Security & Rate Limiting
- Require auth for non-public endpoints; enforce RBAC/ABAC at the boundary.
- Avoid leaking sensitive fields; apply least privilege and field-level filtering where needed.
- Apply rate limiting and abuse protections on public endpoints.

## GraphQL (if used)
- Model a clear schema with types, queries, and mutations; avoid one-off generic fields.
- Implement pagination via connections/cursors; avoid unbounded lists.

## Verification
- Generate and maintain OpenAPI/GraphQL schema; validate examples against schema.
- Include API contract tests; run them in CI as part of integration/smoke tests.
