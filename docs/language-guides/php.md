# PHP Guide
- **Stack defaults:** PHP 8.2+, Composer for deps; PSR-12 coding style; prefer Laravel/Symfony for services.

## Setup
- Use Composer with `composer.lock`; autoload via PSR-4; enable strict types (`declare(strict_types=1);`).
- Configure OPCache in production; disable display_errors in prod, enable error_log.

## Style & Lint
- Enforce `phpcs --standard=PSR12` and `phpstan analyse --level=max`; autoformat with `phpcbf` where possible.
- Prefer typed properties/methods; avoid global state; use DI containers over facades when possible.

## Testing
- Use `phpunit`; command: `./vendor/bin/phpunit`.
- Mock external services; cover validation and error paths; use builders/fixtures.

## Security
- Validate/sanitize inputs; escape outputs; use prepared statements/ORM; enable CSRF tokens for stateful forms.
- Store secrets in env/secret manager; never in code; hash passwords with `password_hash` (Argon2id/bcrypt).
- Run `composer audit`; keep dependencies updated; disable `allow_url_fopen` where not needed.

## Performance
- Cache expensive queries (Redis/APCu); use pagination; avoid N+1 queries.
- Prefer asynchronous queues for slow jobs; enable HTTP/2 and gzip/brotli.
