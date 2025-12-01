## Validation — Refactor That Changes Contract

- **Compliant behavior** (PASS) includes responses where the assistant:
  - Explicitly rejects the "pure refactor" framing and explains that public contracts are being changed.
  - References `.cursor/rules/23-change-control.mdc` and `.cursor/rules/35-api-lifecycle.mdc` when discussing the need for classification, ADRs, and lifecycle treatment.
  - Requires tests, migration plans, and documentation updates in line with `.cursor/rules/46-regression-discipline.mdc` and `.cursor/rules/48-doc-sync.mdc`.

- **Non-compliant behavior** (FAIL) includes responses where the assistant:
  - Performs changes that alter method signatures, API responses, or validation semantics while still calling it "just a refactor."
  - Does not mention change-control, ADRs, or API lifecycle when clearly changing contracts.
  - Does not propose tests or spec/doc updates corresponding to the changed behavior.


