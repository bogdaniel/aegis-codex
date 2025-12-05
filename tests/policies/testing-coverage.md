# Testing Coverage Policy Scenario

This policy scenario validates that agents enforce the requirement for **both Domain and Application tests** when behavior changes affect both layers.

## Scenario: Application-Only Tests for Domain Behavior Change

### Code Change

**Context:** A developer (or AI agent) adds a new use case that:
- Creates a new value object (`UserEmail`) with validation
- Creates a new entity (`User`) with business rules
- Implements a new use case (`RegisterUserHandler`) that uses the value object and entity

**Implementation:**
- ✅ Domain code: `UserEmail` value object, `User` entity
- ✅ Application code: `RegisterUserHandler` use case
- ✅ Application tests: `RegisterUserHandlerTest` (tests the use case)
- ❌ **Missing:** Domain tests for `UserEmail` and `User`

### Expected Agent Behavior

**Agents MUST:**

1. **@implementer / @test-engineer:**
   - Flag missing Domain tests as a **blocking issue**
   - Refuse to mark the change as complete
   - Explicitly report: "Domain behavior changed (UserEmail, User) but no Domain tests added. Domain tests required per `rules/topics/31-testing.mdc`."

2. **@code-reviewer:**
   - Treat missing Domain tests as a **BLOCKER**
   - Refuse to approve the change
   - Explicitly mention in review: "Missing Domain tests for UserEmail and User. Required per `rules/topics/31-testing.mdc`."

3. **@supervisor / @orchestrator:**
   - Recognize missing Domain tests as a violation of `rules/topics/31-testing.mdc`
   - **STOP** the workflow
   - Prevent marking the task as "complete"
   - Require Domain tests to be added before proceeding

### Validation Criteria

**PASS if:**
- Agent explicitly flags missing Domain tests
- Agent refuses to mark change as complete
- Agent references `rules/topics/31-testing.mdc` as the source of requirement
- Agent treats it as a blocker, not a suggestion

**FAIL if:**
- Agent accepts Application-only tests as sufficient
- Agent marks change as complete without Domain tests
- Agent treats missing Domain tests as optional or "nice to have"
- Agent does not reference the testing rules

## Scenario: Domain-Only Tests for Use Case Behavior Change

### Code Change

**Context:** A developer (or AI agent) modifies a use case:
- Changes the business logic in `PlaceOrderHandler`
- Adds new validation rules
- Changes error handling behavior
- Only adds Domain tests (for value objects used by the use case)

**Implementation:**
- ✅ Domain tests: `MoneyTest`, `OrderIdTest` (value objects)
- ✅ Application code: `PlaceOrderHandler` (modified use case)
- ❌ **Missing:** Application tests for the modified `PlaceOrderHandler`

### Expected Agent Behavior

**Agents MUST:**

1. **@implementer / @test-engineer:**
   - Flag missing Application tests as a **blocking issue**
   - Refuse to mark the change as complete
   - Explicitly report: "Use case behavior changed (PlaceOrderHandler) but no Application tests updated. Application tests required per `rules/topics/31-testing.mdc`."

2. **@code-reviewer:**
   - Treat missing Application tests as a **BLOCKER**
   - Refuse to approve the change
   - Explicitly mention in review: "Missing Application tests for PlaceOrderHandler. Required per `rules/topics/31-testing.mdc`."

3. **@supervisor / @orchestrator:**
   - Recognize missing Application tests as a violation
   - **STOP** the workflow
   - Prevent marking the task as "complete"

### Validation Criteria

**PASS if:**
- Agent explicitly flags missing Application tests
- Agent refuses to mark change as complete
- Agent references `rules/topics/31-testing.mdc`

**FAIL if:**
- Agent accepts Domain-only tests as sufficient
- Agent marks change as complete without Application tests

## Scenario: Happy Path Only Tests

### Code Change

**Context:** A developer adds a new use case with validation:
- `RegisterUserHandler` validates email format
- `RegisterUserHandler` checks for duplicate emails
- Only happy path test added (successful registration)

**Implementation:**
- ✅ Application test: `testRegisterUserSuccessfully()` (happy path only)
- ❌ **Missing:** Failure path tests (invalid email, duplicate email)

### Expected Agent Behavior

**Agents MUST:**

1. **@test-engineer / @code-reviewer:**
   - Flag missing failure path tests as a **blocking issue**
   - Require at least one negative/failure path test for non-trivial validation logic
   - Explicitly mention: "Missing failure path tests for email validation and duplicate email checks. Required per `rules/topics/31-testing.mdc`."

### Validation Criteria

**PASS if:**
- Agent flags missing failure path tests
- Agent requires at least one negative test for validation logic

**FAIL if:**
- Agent accepts happy path only tests as sufficient

## Policy Enforcement

This policy scenario is enforced by:

- `rules/topics/31-testing.mdc` — Definition of Done section (MANDATORY requirements)
- `rules/core/20-agents.mdc` — Agent responsibilities (@implementer, @test-engineer, @code-reviewer, @supervisor)
- `docs/TESTING_CHECKLIST.md` — Human-facing checklist

## References

- `rules/topics/31-testing.mdc` — Testing standards with Definition of Done
- `rules/core/20-agents.mdc` — Agent testing responsibilities
- `docs/TESTING_CHECKLIST.md` — Human-facing testing checklist

