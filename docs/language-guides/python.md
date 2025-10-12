# Python Guide

- **Style:** PEP 8 via `black`; `ruff` for lint; `mypy --strict` for typing.
- **Frameworks:** FastAPI (pydantic v2), SQLAlchemy 2.x.
- **Patterns:** Repository + Service; Command for use-cases; DTOs via pydantic models.
- **Testing:** `pytest`, `pytest-asyncio`, `hypothesis` for properties; coverage ≥ 90%.
- **Security:** Use `pydantic` validation at boundaries; parameterized queries; secrets via env/secret manager.
- **Resource Management:** context managers; `async with` for IO.

## Example Config Snippets
```toml
# pyproject.toml
[tool.black]
line-length = 100
target-version = ["py311"]

[tool.ruff]
target-version = "py311"

[tool.mypy]
strict = true
python_version = "3.11"
```

## FastAPI Skeleton
```python
from fastapi import FastAPI, Depends
from pydantic import BaseModel

class CreateUser(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str

app = FastAPI()

@app.post("/users", response_model=User)
def create_user(payload: CreateUser):
    # validate, hash, persist (omitted for brevity)
    ...
```

