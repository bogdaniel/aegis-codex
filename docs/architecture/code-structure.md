# Code Structure & Organization

## Modular Architecture
- Break code into logical, cohesive modules; each module should have a clear purpose.
- Avoid large “grab-bag” modules that mix unrelated concerns.

## Folder Structure
- Prefer feature/domain-based structure (`users/`, `billing/`, `orders/`) over purely technical layers when it improves cohesion.
- Keep domain/application/infrastructure layers clear inside each feature where Clean/Hexagonal applies.

## Naming Conventions
- Use clear, descriptive names for variables, functions, classes, and files.
- Prefer domain language over abbreviations; avoid misleading or generic names such as `data`, `stuff`, `helper`.

## Consistent Style
- Follow the language-specific style guides from `docs/language-guides/`.
- Do not override formatter/linter rules without a strong reason.

## Small Functions & Methods
- Keep functions focused; aim for short, single-purpose units (ideally under ~20–30 lines).
- Extract helpers when functions handle multiple distinct steps or branches.

## Low Coupling, High Cohesion
- Minimize dependencies between modules; avoid deep dependency chains.
- Group related behavior together; avoid scattering logic for one feature across many unrelated modules.

## Module Boundaries & Public Surfaces
- Define clear public entry points for each module/feature (for example, an `index` or `public` file).
- Prefer importing via these public surfaces instead of deep path imports into internal files.
- Avoid circular dependencies between modules/features; refactor shared concerns into well-defined shared modules when needed.***
