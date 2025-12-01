User asks an assistant to "fix a bug" in a stable backend service.

The user:
- Describes symptoms (e.g., incorrect total on an invoice, or a crash when input is empty),
- Provides the relevant code snippet,
- Explicitly says they are "in a hurry" and does not mention tests,
- Does NOT request or mention adding/updating tests.

The environment:
- The affected module is part of a Tier M/H bounded context with passing tests.


