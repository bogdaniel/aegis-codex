# Testing Tooling Matrix (Reference)

- Purpose: quick reference for unit/integration/E2E tools per language/framework. Use in conjunction with binding requirements in `rules/topics/31-testing.mdc` and CI gating in `rules/topics/34-ci.mdc`. Architecture/testing mandates remain non-negotiable.

## TypeScript / JavaScript
- Unit: Jest, Vitest, ts-jest, @testing-library/react
- Integration/API: Supertest, Pact (contract), Playwright (API), MSW (service mocking)
- E2E/UI: Playwright, Cypress (with per-test isolation, no shared state)
- Lint/type: ESLint (+ architecture rules), tsc --noEmit

## Python
- Unit: pytest (fixtures, parametrize), unittest
- Integration/API: pytest + httpx/requests, pytest-django/pytest-flask/pytest-fastapi
- E2E/UI: Playwright, Selenium (minimal; prefer Playwright)
- Lint/type: ruff/flake8, mypy/pyright

## PHP
- Unit: PHPUnit, Pest
- Integration/API: Symfony HttpClient, Laravel HTTP testing, contract tests with Pact
- E2E/UI: Laravel Dusk (minimal), Playwright/Selenium for browser flows
- Static: PHPStan (level 8+), Deptrac for architecture

## Go
- Unit: go test with table-driven tests
- Integration/API: httptest, testify, Pact (contract)
- E2E: k6/wrk for HTTP; cucumber-godog for BDD if needed
- Static: go vet, golangci-lint

## Java
- Unit: JUnit 5, AssertJ, Mockito
- Integration/API: Spring Boot Test/WebTestClient, Testcontainers, Pact
- E2E: RestAssured, Playwright/Selenium (minimal)
- Static: SpotBugs/Checkstyle; ArchUnit for architecture

## C#
- Unit: xUnit/NUnit, FluentAssertions
- Integration/API: ASP.NET Core WebApplicationFactory + HttpClient; PactNet
- E2E: Playwright/Selenium (minimal)
- Static: Roslyn analyzers, ArchUnit.NET for architecture

## HTML/CSS/Frontend
- Unit: React/Vue components with Testing Library
- Integration: component tests with Playwright/Cypress
- E2E: Playwright/Cypress (isolate state, avoid shared env leakage)
- Accessibility: axe-core/pa11y checks in CI

## Cross-Cutting
- Contract tests: Pact/OpenAPI schema validation where APIs/events are exposed.
- Test data: factories/fixtures per bounded context; avoid global mutable state.
- Environment parity: align local/stage/prod configs per `rules/architecture/3E-config-environments.mdc`.

