# Design Patterns

Patterns provide shared vocabulary. Prefer simple, well‑known patterns over ad‑hoc structures.

## Creational
- Factory / Abstract Factory — encapsulate complex or environment‑dependent object creation.
- Builder — build complex objects step‑by‑step, especially when many optional parameters exist.
- Singleton (use sparingly) — only for stateless, process‑wide dependencies that are easy to test; prefer DI containers instead.

## Structural
- Adapter — wrap external APIs or legacy components behind project‑owned interfaces.
- Facade — expose a simple API over a complex subsystem.
- Decorator — layer cross‑cutting concerns (logging, caching, retries) around core behavior.

## Behavioral
- Strategy — swap algorithms/behaviors at runtime behind a common interface.
- Observer / Pub‑Sub — propagate events to multiple listeners without hard coupling.
- Command — represent operations as objects (useful for queues, retries, or undo).

## When to Avoid Patterns
- Do not introduce patterns just to “use a pattern”.
- Prefer straightforward functions and data structures until complexity or variability demands more structure.***
