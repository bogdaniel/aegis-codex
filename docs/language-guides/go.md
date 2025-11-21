# Go Guide
- **Stack defaults:** Go 1.22+; modules required; prefer standard library first.

## Setup
- `go mod tidy` to manage deps; no replace to external paths without justification.
- Use `GO111MODULE=on`; set `GODEBUG=http2server=1` when relevant.

## Style & Lint
- Enforce `gofmt`, `goimports`, `staticcheck`; command: `gofmt -w . && goimports -w . && staticcheck ./...`.
- Keep functions small; return errors, not panics; use contexts for cancellation.

## Testing
- Use `go test ./...`; table-driven tests; include negative cases.
- Benchmark with `go test -bench=.` for hotspots.

## Security
- Validate inputs; never build SQL via string concat; use prepared statements.
- Propagate context with timeouts; avoid logging secrets; enable TLS for network calls.
- Run `gosec ./...`; keep dependencies up to date.

## Performance
- Avoid unnecessary goroutines; bound concurrency via worker pools/channels.
- Minimize allocations; prefer slices over maps when counts are small; reuse buffers when safe.
