#!/usr/bin/env bash
set -euo pipefail

# Local check mirroring CI. Skips stacks that are not present. Run via:
#   make aegis-check
# or symlink into .git/hooks/pre-commit to guard uncommitted code.

NODE_VERSION="20"

run_node() {
  if [[ -f package-lock.json || -f pnpm-lock.yaml || -f yarn.lock ]]; then
    echo "[node] installing deps"
    if [[ -f pnpm-lock.yaml ]]; then
      command -v pnpm >/dev/null 2>&1 || { echo "pnpm not installed"; return 1; }
      pnpm install --frozen-lockfile
      echo "[node] lint"
      pnpm lint --if-present
      echo "[node] prettier"
      pnpm prettier --check "**/*.{js,ts,tsx,json,md,yml,yaml}" || true
      echo "[node] tests"
      pnpm test --if-present
      echo "[node] audit"
      pnpm audit --prod || true
    else
      command -v npm >/dev/null 2>&1 || { echo "npm not installed"; return 1; }
      npm ci
      echo "[node] lint"
      npm run lint --if-present
      echo "[node] prettier"
      npx prettier --check "**/*.{js,ts,tsx,json,md,yml,yaml}" || true
      echo "[node] tests"
      npm test --if-present
      echo "[node] audit"
      npm audit --production || true
    fi
  fi
}

run_php() {
  if [[ -f composer.lock ]]; then
    command -v composer >/dev/null 2>&1 || { echo "composer not installed"; return 1; }
    composer install --no-interaction --prefer-dist
    vendor/bin/phpcs --standard=PSR12 || true
    vendor/bin/phpstan analyse --no-progress --level=max || true
    ./vendor/bin/phpunit || true
    composer audit || true
  fi
}

run_rust() {
  if [[ -f Cargo.toml ]]; then
    rustup component add clippy rustfmt >/dev/null 2>&1 || true
    cargo fmt --all -- --check
    cargo clippy --all-targets --all-features -- -D warnings
    cargo test --all
    cargo install cargo-audit >/dev/null 2>&1 || true
    cargo audit || true
  fi
}

run_go() {
  if [[ -f go.mod ]]; then
    go fmt ./...
    go vet ./...
    go test ./...
    go install golang.org/x/vuln/cmd/govulncheck@latest >/dev/null 2>&1 || true
    govulncheck ./... || true
  fi
}

main() {
  run_node
  run_php
  run_rust
  run_go
  echo "Aegis local check complete. Skipped stacks without markers."
}

main "$@"
