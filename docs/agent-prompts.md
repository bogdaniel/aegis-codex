# Agent Prompt Scenarios

These prompts are designed to **exercise each agent and rule** in this repo without restating standards or docs. Use them in Cursor (or similar tools) after loading this project.

Keep the pattern: “Act as the @agent and do X for this file/snippet.” The rules and docs will supply standards automatically.

---

## 1. End-to-End Flow (TypeScript Express Handler)

- `@architect`  
  `Act as the @architect. Design a minimal architecture for a user service exposing GET /users/:id in TypeScript/Express, including data layer, observability, and basic scaling considerations.`

- `@api-designer`  
  `Act as the @api-designer. Design the API for a user service that exposes GET /users/:id and GET /users (paginated). Return the contract as a single OpenAPI snippet.`

- `@security-auditor`  
  `Act as the @security-auditor. Review and fix security issues in examples/before-after/ts-express-handler-before.ts.`

- `@test-engineer`  
  `Act as the @test-engineer. Add tests for the current user handler implementation so that happy path, validation errors, and not-found cases are fully covered.`

- `@perf-optimizer`  
  `Act as the @perf-optimizer. Optimize the hot path of the user handler for latency and scalability without changing behavior.`

- `@devops`  
  `Act as the @devops. Create CI and basic runtime configuration for the user service, including linting, tests, security scans, and a container build.`

- `@code-reviewer`  
  `Act as the @code-reviewer. Review the updated user service code and return the corrected file if any blocking issues remain.`

---

## 2. Security Auditor Quick Checks

- TypeScript snippet  
  `Act as the @security-auditor. Review this TypeScript snippet and apply all necessary security fixes:`
  ```ts
  const token = "sk_test_123";
  const userInput = req.query.q;
  const sql = `SELECT * FROM accounts WHERE name = '${userInput}'`;
  db.query(sql);
  res.cookie("sid", token, { httpOnly: false, secure: false });
  ```

- Python snippet  
  `Act as the @security-auditor. Review and fix security issues in this Python function:`
  ```py
  import sqlite3

  def get_user(name):
      conn = sqlite3.connect("db.sqlite")
      cur = conn.cursor()
      cur.execute(f"SELECT * FROM users WHERE name = '{name}'")
      return cur.fetchall()
  ```

---

## 3. Test Engineer Scenarios

- TypeScript function  
  `Act as the @test-engineer. Design and implement tests for this function:`
  ```ts
  export function isStrongPassword(pw: string) {
    return pw.length > 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
  }
  ```

- Python service function  
  `Act as the @test-engineer. Add unit and integration tests for the main login function in this service to cover happy path, invalid credentials, and lockout behavior.`

---

## 4. Performance Optimizer Scenarios

- Hot loop in TypeScript  
  `Act as the @perf-optimizer. Optimize this TypeScript function for large inputs without changing behavior:`
  ```ts
  export function findDuplicates(values: string[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (values[i] === values[j] && !result.includes(values[i])) {
          result.push(values[i]);
        }
      }
    }
    return result;
  }
  ```

- Go handler  
  `Act as the @perf-optimizer. Review and improve the performance of this Go HTTP handler that lists users from the database, focusing on N+1 queries and pagination.`

---

## 4.1 Language-Specific Perf Scenarios

- Rust iterator  
  `Act as the @perf-optimizer. Optimize this Rust function for large vectors, focusing on allocations and iterator usage:`
  ```rs
  pub fn filter_positive(nums: Vec<i32>) -> Vec<i32> {
      let mut out = Vec::new();
      for n in nums {
          if n > 0 {
              out.push(n);
          }
      }
      out
  }
  ```

- PHP collection handling  
  `Act as the @perf-optimizer. Improve the performance of this PHP function that filters and sorts a large array of orders without changing behavior.`

## 5. DevOps / CI Scenarios

- CI pipeline  
  `Act as the @devops. Create a CI pipeline configuration for a TypeScript service that runs lint, format, type-check, tests with coverage, security checks, and builds a Docker image.`

- Deployment manifest  
  `Act as the @devops. Provide a Kubernetes deployment and service for a stateless HTTP API with health and readiness probes enabled.`

---

## 6. API Designer Scenarios

- REST API  
  `Act as the @api-designer. Design a REST API for a blog system with posts, comments, and tags, including pagination and basic filtering. Return a single OpenAPI snippet.`

- GraphQL API  
  `Act as the @api-designer. Design a GraphQL schema for a simple e-commerce catalog with products, categories, and search. Return a single SDL block.`

---

## 7. Code Reviewer Scenarios

- General review  
  `Act as the @code-reviewer. Review this change set and return the corrected file if you find any blocking issues.`

- Legacy refactor review  
  `Act as the @code-reviewer. Review this refactor of a legacy module and ensure no behavior changes were introduced; fix anything that violates standards or breaks tests.`

---

## 8. Frontend & UI Scenarios (HTML/CSS/JS)

- HTML/CSS structure  
  `Act as the @code-reviewer. Review this HTML/CSS for semantic structure, accessibility, and performance; return the corrected version if needed.`

- JS component  
  `Act as the @test-engineer. Add tests for this JavaScript/TypeScript UI component, covering rendering, interactions, and edge cases.`

---

## 9. Dart/Flutter & GDScript Scenarios

- Dart/Flutter widget  
  `Act as the @test-engineer. Add widget tests for this Flutter screen, including navigation and error states.`

- GDScript gameplay logic  
  `Act as the @refactorer. Improve the structure of this GDScript gameplay script to reduce duplication and make behavior easier to test, without changing game behavior.`
