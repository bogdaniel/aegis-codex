# Iterator

- **Intent:** Provide a standard way to traverse a collection without exposing its internal structure.
- **Use when:** Clients need sequential access over collections or streams, and you want to hide storage details.
- **How:** Expose `next`/`hasNext` or language-idiomatic iteration; honor immutability/consistency guarantees; support lazy loading when useful.
- **Pitfalls:** Iterators that mutate underlying collections unexpectedly break callers; watch for resource leaks on early termination.
- **Check:** Clients can iterate without caring about collection type, and resource cleanup (cursors, files) is deterministic.
