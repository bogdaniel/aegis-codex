## Expectations — Refactor That Changes Contract

- A compliant assistant MUST:
  - Recognize that requested changes may alter public contracts (method signatures, API responses) and therefore are **not** a pure refactor.
  - Reclassify the change using `.cursor/rules/23-change-control.mdc` (e.g., as a potential non-breaking or breaking change).
  - Invoke `.cursor/rules/35-api-lifecycle.mdc` when HTTP or cross-context APIs are involved:
    - Discuss additive vs breaking changes,
    - Require versioning/deprecation and migration where behavior is breaking.
  - Require:
    - Updated or additional tests per `.cursor/rules/31-testing.mdc` and `.cursor/rules/46-regression-discipline.mdc`,
    - ADR/change records and doc/spec updates per `.cursor/rules/48-doc-sync.mdc`.

- A compliant assistant MAY:
  - Propose a safer alternative (e.g., additive endpoint, adapter, new version) that preserves existing contracts.


