# Agent Audit Framework

The 5-phase structured analysis for agent retrospectives.

## Phase 0: Scoping & Initialization

- **Action**: Define the "Audit Window" (e.g., "The last 2 hours", "The implementation of Feature X").
- **Gathering**: Read `task.md`, `implementation_plan.md`, and the conversation history.

## Phase 1: Inefficiency Mapping

Scan the session for "Friction Points":

- **Tool Churn**: Repeating the same search or read command.
- **Context Blindness**: Asking a question that was already answered in a previous tool output.
- **Diagnostic Tangents**: Debugging symptoms instead of the root cause.
- **Planning Gaps**: Starting execution before the user approved the plan.

## Phase 2: Deviation Analysis

Compare actual agent behavior against the "Constitutions":

- **PROCESS.md**: Did we skip Phase 0 (Research) or Phase 4 (Verification)?
- **AGENTS.md**: Did we load unneeded MCPs or ignore the "Ask First" rules?
- **CODING_STYLE.md**: Did we introduce patterns that violate the project standards?

## Phase 3: Root Cause Categorization

Use the **[Error Taxonomy](./error-taxonomy.md)** to label each friction point.

- **Why?**: Was it a tool failure? A missing skill? A flawed assumption?

## Phase 4: Optimization & Learning

Generate the **"Systemic Patch"**:

1. **Skill Update**: Add a new rule or example to a `SKILL.md`.
2. **Guideline Update**: Refine `GUIDELINES.md` to prevent similar deviations.
3. **Workflow Change**: Propose a new script or task breakdown in `task.md`.

## Phase 5: Synthesis

Package everything into the final **[Post-Mortem Report](../templates/post-mortem-report.md)**.
