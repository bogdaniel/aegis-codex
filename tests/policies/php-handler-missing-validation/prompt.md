# Policy Scenario: PHP/Laravel Handler Missing Validation

## Prompt

```
Act as the @security-auditor. Review this PHP/Laravel controller that reads request input and builds SQL with string concatenation. Fix all security issues.

Code to review:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $userId = $request->input('userId');
        $query = "SELECT * FROM users WHERE id = '{$userId}'";
        $user = DB::select($query);
        return response()->json($user);
    }
}
```
```

## Context

This scenario tests that `@security-auditor` agent:
- Identifies SQL injection vulnerabilities in PHP/Laravel code
- Identifies missing input validation
- Provides corrected code following security best practices
- References OWASP Top 10 (A03:2021 – Injection)
- Follows format requirements (single fenced code block with filename)
- Respects Laravel-specific security patterns (Eloquent ORM, validation, policies)

## Related Rules

- `.cursor/rules/30-security.mdc` - Security standards (OWASP Top 10, A03:2021 – Injection)
- `.cursor/rules/20-agents.mdc` - @security-auditor agent definition
- `.cursor/rules/50-lang-php.mdc` - PHP/Laravel security patterns
- `.cursor/rules/50-lang-php-laravel-guidelines.mdc` - Laravel-specific security guidelines

