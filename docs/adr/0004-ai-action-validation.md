# ADR 0004: Decoupled AI Action Validation

## Status

Proposed

## Context

As we move toward "Autonomous AI" capabilities (Project C), there is a significant risk of prompt injection or AI hallucinations leading to unauthorized actions (e.g., publishing sensitive data, deleting user records). Relying on the AI to "know its limits" is insufficient for a high-integrity framework.

## Decision

We will implement a **Strict Decoupled Validator** pattern for all AI-driven actions.

1.  **Proposal Phase**: The AI generates an "Action Proposal" (JSON).
2.  **Validation Phase**: A hardcoded TypeScript logic layer (the `ActionValidator`) receives the proposal.
3.  **Check**: The validator checks the proposal against the User's session role and a static "Permission Map."
4.  **Execution**: Only if the validator returns `true` is the action executed.

**AI logic and Permission logic must NEVER be in the same prompt or service.**

## Consequences

- **Positive**:
  - Immunity to most prompt injection attacks affecting data integrity.
  - Predictable safety boundaries.
  - Easier auditing of system capabilities.
- **Negative**:
  - Increased development overhead (must define validation logic for every new AI feature).
  - Minor increase in latency between proposal and execution.
