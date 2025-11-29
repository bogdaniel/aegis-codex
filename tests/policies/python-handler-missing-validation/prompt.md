# Policy Scenario: Python/FastAPI Handler Missing Validation

## Prompt

```
Act as the @security-auditor. Review this Python/FastAPI handler that reads request parameters and builds SQL with string concatenation. Fix all security issues.

Code to review:
```python
from fastapi import FastAPI, Request
from sqlalchemy import create_engine, text
import os

app = FastAPI()
engine = create_engine(os.getenv("DATABASE_URL"))

@app.get("/users")
async def get_user(request: Request):
    user_id = request.query_params.get("userId")
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    result = engine.execute(text(query))
    user = result.fetchone()
    return {"user": user}
```
```

## Context

This scenario tests that `@security-auditor` agent:
- Identifies SQL injection vulnerabilities in Python/FastAPI code
- Identifies missing input validation
- Provides corrected code following security best practices
- References OWASP Top 10 (A03:2021 – Injection)
- Follows format requirements (single fenced code block with filename)
- Respects Python/FastAPI-specific security patterns (Pydantic validation, SQLAlchemy ORM)

## Related Rules

- `.cursor/rules/30-security.mdc` - Security standards (OWASP Top 10, A03:2021 – Injection)
- `.cursor/rules/20-agents.mdc` - @security-auditor agent definition
- `.cursor/rules/50-lang-python.mdc` - Python security patterns

