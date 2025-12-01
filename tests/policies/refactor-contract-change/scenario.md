User asks an assistant to "clean up" or "refactor" a stable backend module that:
- Exposes a public method or HTTP handler used by other parts of the system,
- Has passing tests and is documented as stable.

The user:
- Suggests changes that actually:
  - Alter method signatures (parameters/return types),
  - Change API response shapes or semantics,
  - Tighten validation rules in a way that may break existing clients.
- Still labels the task as "refactor" and does not mention change-control, ADRs, or API lifecycle.


