# Rust Guide
- **Stack defaults:** Stable Rust, edition 2021+; prefer Cargo workspaces for multi-crate projects.

## Setup
- Pin toolchain via `rust-toolchain.toml`; use `cargo fmt`, `cargo clippy`, `cargo check`.
- Feature-gate experimental code; keep dependencies minimal and audited.

## Style & Lint
- Enforce `cargo fmt --all` and `cargo clippy --all-targets --all-features -D warnings`.
- Prefer explicit lifetimes/ownership choices; avoid unnecessary `clone`.

## Testing
- Use `cargo test --all`; separate unit tests (`mod tests`) from integration (`tests/`).
- Add property-based tests with `proptest` where invariants exist.

## Security
- Avoid `unsafe`; if required, isolate and justify; wrap with safe interfaces.
- Handle errors with `Result` and `thiserror`; avoid panics in library code.
- Validate inputs; avoid SQL concat; use prepared statements/ORM; run `cargo audit`.

## Performance
- Measure before optimizing; use iterators over allocations; watch for needless clones.
- Use `tokio`/`async` carefully; bound concurrency with semaphores; set timeouts.
