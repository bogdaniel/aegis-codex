# Dart Guide
- **Stack defaults:** Dart 3+, Flutter for UI; sound null safety required.

## Setup
- Use `dart pub` with `pubspec.lock`; enable analysis options for strong-mode lints.
- Structure Flutter with feature-first folders; keep widgets small and composable.

## Style & Lint
- Enforce `dart format .` and `dart analyze`; enable `pedantic`/`flutter_lints`.
- Avoid `dynamic`; prefer immutable data classes (`freezed`/`built_value`) and `const` widgets.

## Testing
- Use `dart test`; for Flutter, `flutter test`; write widget tests for UI behavior and golden tests sparingly.
- Mock external services with `mocktail`; keep tests deterministic.

## Security
- Validate inputs before network/DB use; avoid string SQL; secure HTTP with TLS and pinned APIs when required.
- Store secrets in platform keystores; never in code or assets; obfuscate release builds as needed.

## Performance
- Use `const` constructors; avoid rebuilding heavy widgets; debounce/throttle listeners.
- Profile with `flutter devtools`; avoid unnecessary `setState`; cache images/assets appropriately.
