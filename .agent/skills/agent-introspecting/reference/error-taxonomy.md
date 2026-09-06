# Agent Error Taxonomy

Standardized categories for analyzing agentic failure and inefficiency.

## 1. Contextual Failures

- **Context Blindness**: Missing information already present in the history.
- **Corpus Overload**: Retrieving too much irrelevant data, causing "Lost in the Middle".
- **Instruction Drift**: Gradually drifting away from the core goal over many turns.

## 2. Process Failures

- **Phase Skipping**: Going straight to code before research or planning.
- **Verification Neglect**: Assuming code works without running tests.
- **Planning Rigidity**: Sticking to a flawed plan after tool output suggests a better way.

## 3. Tool & Interaction Failures

- **Tool Misuse**: Using `browser_subagent` when `view_file` would suffice.
- **Failure Silence**: Ignoring a tool error and proceeding.
- **Redundant Probing**: Re-running `ls` or `grep` unnecessarily.

## 4. Communication Failures

- **Ambiguity Tolerance**: Proceeding with a vague user request without clarifying.
- **Reporting Omission**: Failing to notify the user of a pivot or a blocker.
- **Artifact Staleness**: Forgetting to update `task.md` or the PRD as the task evolves.

## 5. Intelligence / Logic Failures

- **Hallucination (API/Syntax)**: Inventing properties or methods.
- **Circular Reasoning**: Repeatedly investigating the same dead end.
- **Over-Engineering**: Solving a simple task with a high-complexity script.
