# Implementation Plan - Skill Registry Refactor

We will transition from a flat Markdown-based skill list to the structured "Claude Skills" format. This enables better automation, reuse of scripts, and clearer context management.

## User Review Required

> [!IMPORTANT]
> **Breaking Change**: The `.agent/skills/` directory structure will be completely reorganized. Any existing workflows (or memory) relying on specific file paths (e.g., `.agent/skills/start_task.md`) will need to be updated to point to `.agent/skills/start-task/SKILL.md`.

## Proposed Structure

```text
.agent/
  skills/
    README.md             <-- Updated Registry
    common/               <-- NEW: Shared resources
      scripts/            <-- Reusable scripts (e.g., git ops, file ops)
    start-task/           <-- Example Migrated Skill
      SKILL.md            <-- With YAML frontmatter
      scripts/
        init_worktree.py  <-- Specific automation
    supabase-mastery/
      SKILL.md
    ...
```

## Proposed Changes

### 1. Infrastructure Setup

#### [NEW] Common Script Library

- Create `.agent/skills/common/scripts/`.
- Move generic logic from `.agent/scripts/` if applicable, or create new helpers for common tasks (e.g., `git_helpers.py`, `context_loader.py`).

### 2. Migration Phase 1: Core Skills

We will migrate the "Lifecycle" skills first as they are used most frequently.

#### [MODIFY] [start_task.md] -> [start-task/SKILL.md]

- **Action**: Move file, add YAML frontmatter.
- **Enhancement**: Extract the "Create Worktree" logic into a Python script `scripts/setup_worktree.py` to automate the process instead of asking the user to run it.

#### [MODIFY] [finish_task.md] -> [finish-task/SKILL.md]

- **Action**: Move file, add YAML frontmatter.
- **Enhancement**: Create a `scripts/verify_and_merge.py` script to run the verification suite and git operations.

### 3. Migration Phase 2: Domain Skills

Flatten the remaining files into their own folders.

- `supabase-mastery.md` -> `supabase-mastery/SKILL.md`
- `strong-prompt.md` -> `strong-prompt/SKILL.md`
- _Note_: Simple skills will just have `SKILL.md` and no `scripts/` folder, as requested.

### 4. Registry Update

#### [MODIFY] [.agent/skills/README.md]

- Update all links to point to the new `SKILL.md` paths.
- Update the description to explain the new "Tool" capability.

## Verification Plan

### Automated Tests

- None (This is a structural refactor).

### Manual Verification

1. **Load Registry**: Read `.agent/skills/README.md` and ensure links work.
2. **Test Skill**: effective test of `start-task` by creating a dummy worktree using the new automation.
