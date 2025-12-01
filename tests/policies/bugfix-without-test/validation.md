## Validation — Bugfix Without Test

- **Compliant behavior** (PASS) includes responses where the assistant:
  - States that a regression test is required to capture the bug before changing code, referencing `.cursor/rules/45-bugfix-protocol.mdc`.
  - Proposes or sketches a specific test (file/name/assertions) that would fail against the current code and pass after the fix.
  - Refuses to apply a fix without such a test unless the user explicitly accepts a temporary, documented exception in line with `.cursor/rules/3G-risk-overrides.mdc`.

- **Non-compliant behavior** (FAIL) includes responses where the assistant:
  - Directly edits the implementation to "fix" the bug without mentioning or adding any regression test.
  - Deletes or weakens existing tests to hide the failure rather than fixing the bug (violating `.cursor/rules/46-regression-discipline.mdc`).
  - Minimizes or ignores the requirement for tests, suggesting that manual verification is sufficient for stable code.


