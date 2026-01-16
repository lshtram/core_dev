# The High-Integrity Feature Flow

This document outlines the exact "Day in the Life" of a feature development cycle in this environment.

---

## Phase -1: The SDLC Engine Setup
**Goal**: Initialize the environment as a "High-Integrity Platform."

1. **Git Initialization**: `git init` (Must have a repository for worktrees).
2. **Node Initialization**: `npm init -y` (Required for scaffolding and linting).
3. **Engine Installation**: Copy the following core files and directories to the project root:
   - `agent` (The unified CLI script)
   - `AGENTS.md` (The root constitution & index)
   - `plopfile.js` (Scaffolding generator config)
   - `.agent/` (The engine brain)
     - `skills/` (The cognitive logic)
     - `templates/` (PRDs, Specs, ADRs)
     - `scripts/` (Verification & utilities)
     - `configs/` (AI-optimized tool configs)
     - `PROCESS.md`, `GUIDELINES.md`, `CODING_STYLE.md` (The rules)
     - `REQUIREMENTS_MCP.md` (The plug-in checklist)
4. **Dependencies**: `./agent setup` (Installs `husky`, `plop`, `markdownlint`, and test tools).

---

## Phase 0: Selection & Initialization
**User Action**: Presents a new idea.
**User Prompt**:
- **Standard**: `/start-task feature-user-profiles`
- **Light Mode**: `/start-task light hotfix-login-error`

**Agent Action**:
- Reads `.agent/workflows/start-task.md`.
- Executes the corresponding `./agent start` command.
- Initializes the task environment.

---

## Phase 0.5: Workflow Selection (Standard vs. Light)

### Standard Mode (Default)
**Best for**: New Features, Major Refactors, Complex Tasks.
- **Mechanism**: Creates a unified git worktree isolated from `main`.
- **Command**: `./agent start <name>`

### Light Mode
**Best for**: Hotfixes, Documentation, Research, Small Refactors (< 50 lines).
- **Mechanism**: modifes the current branch directly.
- **Command**: `./agent start --light <name>`
- **Warning**: Ensure you are on a clean branch before starting.

---

## Phase 1: Requirements (PRD)
**User Action**: Approves/Refines requirements.
**User Action**: Approves/Refines requirements.
**Command**: `/requirements`
**Agent Action**:
- Creates `.agent/scratchpad/PRD_current.md` using the `PRD.md` template.
- Fills in User Stories and Functional Specs.

**GATE**: User must approve the PRD.

---

## Phase 2: Architecture (Tech Spec & ADR)
**User Action**: Discusses technical trade-offs.
**User Action**: Discusses technical trade-offs.
**Command**: `/adr "Decision Title"` (Optional)
**Agent Action**:
- Creates `.agent/scratchpad/TECH_SPEC_current.md` using the template.
- If `/adr` is used:
  - Generates a new ADR file in `.agent/adrs/`.
- Drafts the implementation plan.

**GATE**: User must approve the Tech Spec.

---

## Phase 3: Incremental Implementation
**User Action**: Monitors progress.
**User Action**: Monitors progress.
**Command**: `/generate` (Scaffolding)
**Agent Action**:
- Starts interactive Plop generator.
- Writes code in < 200 line chunks.
- Writes code in < 200 line chunks.
- Performs "Self-Correction" loops.

---

## Phase 4: S-3 Verification
**User Action**: None (Autonomous).
**User Action**: None (Autonomous).
**Command**: `/audit`
**Agent Action**:
- Runs types, lint, and unit tests via `./agent audit`.
- Use `/audit docs` to check PRD/Spec formatting.
- Fixes issues until all lights are green.

---

## Phase 5: Handoff & QA
**User Action**: Manual verification ("Vibe Check").
**Agent Action**:
- Generates `.agent/scratchpad/REVIEW_NOTE_current.md`.
- Prompt: "Check out the new profile page at `/profile/123`. I've verified the data fetching, please check the animations."

---

## Phase 6: Conclusion (Merge & Cleanup)
**User Action**: "Looks good, merge it."
**User Action**: "Looks good, merge it."
**Command**: `/finish-task`
**Agent Action**:
1. Runs final audit.
2. Merges (Standard) or Commits (Light).
3. Cleans up branch/worktree.

---

## Phase 7: Learning (Memory Weaver)
**User Action**: None (Autonomous).
**Agent Action**: Activates `knowledge-integration`.
- Reads `LEARNINGS_current.md`.
- Prompt: "I noticed we had a recurring issue with Supabase types. I've updated `CODING_STYLE.md` with a new rule to prevent this. Approve?"

---

## Summary Table of Commands
| Action | Command |
| :--- | :--- |
| **Get Help** | `./agent help` |
| **Verify Everything** | `/audit` |
| **Check Docs** | `/audit docs` |
| **New ADR** | `/adr "Title"` |
| **New Component** | `/generate` |
| **Initialize PRD** | `/requirements` |
| **Finish Task** | `/finish-task` |
| **Distill Info** | `/distill` |

---

## Cognitive Toolset
These commands access the agent's advanced reasoning capabilities without changing code.

| Command | Purpose |
| :--- | :--- |
| **`/refine-prompt "Idea"`** | Transforms a vague thought into a highly effective prompt string. |
| **`/perspective [lens] "Topic"`** | Analyzes a requirement or problem from multiple expert angles (Security, UX, etc.). |
| **`/research "Topic"`** | Conducts a systematic deep-dive and generates a research summary artifact. |

