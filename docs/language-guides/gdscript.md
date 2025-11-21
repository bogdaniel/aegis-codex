# GDScript Guide
- **Stack defaults:** Godot 4+, GDScript 2.0; organize by scene/feature.

## Style
- One class per file; name files after the class/scene; use snake_case for variables/functions.
- Keep functions short; favor composition via nodes/scenes over inheritance.

## Testing
- Use Godot’s built-in unit tests or GUT; test gameplay logic separately from rendering.
- Mock external dependencies (signals, nodes) when possible; keep tests deterministic.

## Security & Data
- Validate network input; never trust client data; sanitize file IO paths; disable debug features in production builds.
- Avoid storing secrets client-side; if unavoidable, obfuscate and validate server-side.

## Performance
- Avoid per-frame allocations; cache nodes (`onready var`); use signals over polling.
- Profile with Godot profiler; minimize physics/process where not needed; leverage `_physics_process` vs `_process` appropriately.
