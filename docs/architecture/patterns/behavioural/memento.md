# Memento

- **Intent:** Capture and restore an object’s state without exposing its internals.
- **Use when:** You need undo/rollback, checkpoints, or safe state snapshots (e.g., editors, workflows).
- **How:** Provide a memento object created by the originator; store only needed state; ensure restores are atomic and validated.
- **Pitfalls:** Large snapshots can be expensive; leaking mutable mementos breaks encapsulation; beware partial restores.
- **Check:** You can save and restore state safely across operations, and encapsulation of internals remains intact.
