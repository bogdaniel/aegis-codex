# Multi-Agent Test Scenarios

These scenarios test multi-agent workflows and validate that agents cooperate correctly.

## Structure

Each scenario includes:
- `prompt.md` - The prompt to run in Cursor
- `expected-output.md` - Expected agent behavior
- `validation.md` - Acceptance criteria

## Scenarios

- `scenario-1-orchestrator-end-to-end/` - Full feature development workflow
- `scenario-2-agent-delegation/` - Agent-to-agent delegation
- `scenario-3-parallel-execution/` - Parallel agent execution
- `scenario-4-conditional-workflow/` - Conditional agent execution
- `scenario-5-supervisor-validation/` - Supervisor quality gate validation

## How to Use

1. **Read the scenario prompt** from `prompt.md`
2. **Run the prompt in Cursor** using the specified agent
3. **Compare output** against `expected-output.md`
4. **Validate** using criteria in `validation.md`

## Testing Workflow

1. Copy prompt from `prompt.md`
2. Paste in Cursor and execute
3. Document actual output
4. Compare against expected output
5. Validate against acceptance criteria
6. Document any deviations or issues

## See Also

- `docs/multi-agent/overview.md` - Multi-agent system overview
- `docs/multi-agent/delegation-matrix.md` - Delegation capabilities
- `docs/multi-agent/parallel-semantics.md` - Parallel execution semantics
- `docs/multi-agent/conditional-semantics.md` - Conditional workflow semantics
- `.cursor/rules/21-orchestration.mdc` - Orchestration rules


