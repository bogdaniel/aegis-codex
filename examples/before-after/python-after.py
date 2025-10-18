from __future__ import annotations
from typing import Any

def add(a: int, b: int) -> int:
    """Add two integers with explicit typing."""
    return a + b

def _test():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

if __name__ == "__main__":
    _test()
