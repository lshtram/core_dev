# Deep Retrospective: Auth Refactor & Process Hygiene

Date: 2026-01-16
Scope: First functionality implementation in the new agentic framework.

## 1. The Breakdown: "Helpful" Agent vs. Strict Protocol

**Observation**: The agent (me) initially bypassed the custom templates in `.agent/templates/` and wrote a generic PRD.
**Root Cause**: The LLM's "default mode" is to generate standard software artifacts based on general training data. I ignored the unique "local laws" of this repo because `AGENTS.md` wasn't forcefully loaded into my immediate context at the start.
**Fix Implemented**: Updated `AGENTS.md` to force a "Constitutional Read" at the start of every session.

## 2. The PRD Evolution: From Prose to Matrix

**Initial State**: The PRD had vague bullet points like "Secure Login".
**Friction**: This led to ambiguity about _how_ to verify it. "Secure" is not testable.
**Breakthrough**: We introduced the **Tracing Matrix**.

- Instead of text, we used a table: `| Req ID | Description | Test Type | Test File |`.
- This forced specific thinking: "If I write this requirement, I MUST name the test file that verifies it."
- **Result**: The implementation phase became "fill in the blanks" for the tests defined in the PRD.
  **Action**: Updated `.agent/templates/PRD.md` to enforce this matrix structure by default.

## 3. The Git/Worktree Incident

**Incident**: Accidentally committed `node_modules` to the feature branch.
**Deep Dive**:

- **Why**: The worktree was created in a directory (`.worktrees/feature-x`) that did not inherent the `.gitignore` from the root because the root _had no .gitignore_ (or git didn't respect it in the new isolation).
- **Compounding Error**: I trusted `git add .` without checking `git status` output carefully in a new environment.
- **Recovery**: The recovery was technically sound (creating a temp worktree to fix a dirty branch), but it highlighted a fragility in the "Parallel Workflow" (Standard vs Worktrees).
  **Action**: Added strict `.gitignore` to the project root. Added mental check to `AGENTS.md`: "Check checks: Are you in a worktree?".

## 4. Meta-Insight: The "Finish Task" Illusion

The `/finish-task` workflow assumed a clean, happy path.
**Reality**: Real development is dirty. Dependencies change, local configs drift.
**Adaptation**: The workflow scripts (like `agent audit`) need to be robust or the agent needs to fallback to manual git commands (which I did). The lesson is: **Trust Primitive Commands** (git, npm) over "Magic Scripts" that hide state.

## 5. Conclusion

This session was "Process Validation by Fire".

- We proved the **Tracing Matrix** is superior to standard PRDs for agentic coding.
- We proved **Strict Types** (which verified our refactor) prevent regression.
- We exposed the clean-up risks of **Worktrees**.

**Next Steps**:

- Stick to the new `PRD.md` template rigidly.
- Use `git status` paranoia before every `git add .`.
