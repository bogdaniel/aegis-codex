# Go Guide

- **Style:** go fmt; golangci-lint; staticcheck.
- **Errors:** Wrap with `%w`; sentinel errors sparingly; check errors.
- **Concurrency:** Context propagation; bounded goroutines; avoid shared mutable state.
- **Testing:** `go test -race -cover`; table-driven tests; benchmarks for hot paths.
- **Layout:** Internal packages; cmd/* for binaries; pkg/* for shared libs.
