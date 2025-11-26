# Policy Scenario: TypeScript Handler Missing Validation

## Prompt

```
Act as the @security-auditor. Review this TypeScript Express handler that reads req.query and builds SQL with string concatenation. Fix all security issues.

Code to review:
```typescript
import { Request, Response } from 'express';
import { db } from './database';

export async function getUserHandler(req: Request, res: Response) {
  const userId = req.query.userId;
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  const user = await db.query(query);
  res.json(user);
}
```
```

## Context

This scenario tests that `@security-auditor` agent:
- Identifies SQL injection vulnerabilities
- Identifies missing input validation
- Provides corrected code following security best practices
- References OWASP Top 10 (A03:2021 – Injection)
- Follows format requirements (single fenced code block with filename)

## Related Rules

- `.cursor/rules/30-security.mdc` - Security standards (OWASP Top 10, A03:2021 – Injection)
- `.cursor/rules/20-agents.mdc` - @security-auditor agent definition
- `.cursor/rules/50-lang-typescript.mdc` - TypeScript security patterns

