# Chain of Responsibility

- **Intent:** Pass a request along a sequence of handlers until one handles it or it falls through.
- **Use when:** You have pipelines like middleware, validation chains, filters, or pluggable steps that may short-circuit.
- **How:** Define a handler interface; link handlers with clear ordering; ensure handlers can decide to handle, modify, or delegate.
- **Pitfalls:** Hidden ordering assumptions cause bugs; unbounded chains can mask failures; avoid handlers mutating shared state without care.
- **Check:** Adding/reordering handlers is explicit and tested; unhandled requests are surfaced with clear defaults or errors.
