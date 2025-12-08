#!/usr/bin/env node
/**
 * Local multi-stack check (Node/JS, PHP, Rust, Go) mirrored from the legacy bash script.
 * Runs only when stack markers are present. Failures in optional steps are downgraded to warnings.
 */
const { existsSync } = require('node:fs');
const { spawnSync } = require('node:child_process');

let failures = 0;

function run(cmd, opts = {}) {
  console.log(`→ ${cmd}`);
  const res = spawnSync(cmd, {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, ...(opts.env || {}) },
  });
  if (res.status !== 0) {
    if (opts.allowFail) {
      console.warn(`⚠️  Command exited with ${res.status}: ${cmd}`);
    } else {
      failures += 1;
      console.error(`❌ Command failed with ${res.status}: ${cmd}`);
    }
  }
}

function runNode() {
  if (existsSync('pnpm-lock.yaml')) {
    run('pnpm install --frozen-lockfile');
    run('pnpm lint --if-present');
    run('pnpm prettier --check "**/*.{js,ts,tsx,json,md,yml,yaml}"', { allowFail: true });
    run('pnpm test --if-present');
    run('pnpm audit --prod', { allowFail: true });
    return;
  }
  if (existsSync('package-lock.json') || existsSync('yarn.lock')) {
    run('npm ci');
    run('npm run lint --if-present');
    run('npx prettier --check "**/*.{js,ts,tsx,json,md,yml,yaml}"', { allowFail: true });
    run('npm test --if-present');
    run('npm audit --production', { allowFail: true });
  }
}

function runPhp() {
  if (!existsSync('composer.lock')) return;
  run('composer install --no-interaction --prefer-dist');
  run('vendor/bin/phpcs --standard=PSR12', { allowFail: true });
  run('vendor/bin/phpstan analyse --no-progress --level=max', { allowFail: true });
  run('./vendor/bin/phpunit', { allowFail: true });
  run('composer audit', { allowFail: true });
}

function runRust() {
  if (!existsSync('Cargo.toml')) return;
  run('rustup component add clippy rustfmt', { allowFail: true });
  run('cargo fmt --all -- --check');
  run('cargo clippy --all-targets --all-features -- -D warnings');
  run('cargo test --all');
  run('cargo install cargo-audit', { allowFail: true });
  run('cargo audit', { allowFail: true });
}

function runGo() {
  if (!existsSync('go.mod')) return;
  run('go fmt ./...');
  run('go vet ./...');
  run('go test ./...');
  run('go install golang.org/x/vuln/cmd/govulncheck@latest', { allowFail: true });
  run('govulncheck ./...', { allowFail: true });
}

function main() {
  runNode();
  runPhp();
  runRust();
  runGo();

  if (failures > 0) {
    console.error(`❌ Aegis local check completed with ${failures} failure(s).`);
    process.exit(1);
  }
  console.log('✅ Aegis local check complete. Skipped stacks without markers.');
}

main();
