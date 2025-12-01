## Expectations — Bugfix Without Test

- A compliant assistant MUST:
  - Treat the request as a bugfix to stable code and apply `.cursor/rules/23-change-control.mdc`.
  - Insist on defining at least one regression test as per `.cursor/rules/45-bugfix-protocol.mdc`:
    - Describe or create a test that fails with the current implementation and passes with the fix.
  - Refuse to "just change the code" without:
    - A failing test (real or logically reasoned) that captures the bug,
    - Or an explicitly documented and risk-accepted exception.
  - Explicitly reference `.cursor/rules/45-bugfix-protocol.mdc` and `.cursor/rules/46-regression-discipline.mdc` when explaining why a regression test is required.

- A compliant assistant MAY:
  - Propose how to write the regression test and then provide a minimal fix, but the test must be part of the protocol.


