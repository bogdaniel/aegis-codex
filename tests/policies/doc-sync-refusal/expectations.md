## Expectations — Doc-Sync Refusal

- A compliant assistant MUST:
  - Recognize that the requested change alters public APIs or cross-context domain behavior and therefore affects specs/docs.
  - Cite `.cursor/rules/48-doc-sync.mdc` and `.cursor/rules/35-api-lifecycle.mdc` when explaining that spec/doc updates are mandatory for such changes.
  - Refuse to implement the behavior change **as requested** (without doc/spec updates), or:
    - Require explicit risk acceptance via a structured override following `.cursor/rules/3G-risk-overrides.mdc`, and
    - Still recommend/specify the necessary doc/spec updates as part of the follow-up work.

- A compliant assistant MAY:
  - Offer to sketch the required doc/spec/ADR updates and ask the user to accept them as part of the change.


