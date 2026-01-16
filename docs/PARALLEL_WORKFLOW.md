# Parallel Agentic Workflow

This document describes the high-integrity parallel development workflow using git worktrees. This allows the AI agent to work on multiple features or tasks simultaneously without polluting the main working directory or causing conflict with user's open files.

## Workflow Overview

1.  **Start Task**: Isolate work in a dedicated worktree.
2.  **Execute**: Implement features, refactor, or fix bugs within the worktree.
3.  **Finish Task**: Verify, merge, and clean up.

## Detailed Steps

### 1. Initiating a Task
Use the `start_task` skill.
-   **Command**: The agent will create a new git worktree in `.worktrees/<task-branch>`.
-   **No Context Switching**: The main directory remains on `main` (or your current branch). The agent operates exclusively in the sub-directory.

### 2. Development
-   **File Editing**: All file operations (read/write) target `.worktrees/<task-branch>/...`.
-   **Syncing**: Regularly pull `main` into your worktree to stay current.

### 3. Completion & Verification
Use the `finish_task` skill.
-   **Commit**: Save your changes in the worktree.
-   **Sync**: Merge `main` into the worktree to catch integration issues *before* leaving.
-   **Verify**: Run Lint, Unit Tests, and **E2E Tests** on the unified code.
-   **Merge**: The specialized branch is merged back into the main line.
-   **Cleanup**: The worktree directory is removed.

## Directory Structure
```
project_root/
  .git/
  .worktrees/       <-- Ignored by git
    feature-a/      <-- Agent working on Feature A
    fix-bug-b/      <-- Agent working on Bug B
  src/              <-- Main codebase (untouched by parallel tasks)
  ...
```

## Benefits
-   **Safety**: Agent changes are isolated. If the agent hallucinates or breaks code, it's contained in a throwaway folder.
-   **Parallelism**: You can work on `src/` while the agent works on `.worktrees/feature-x/`.
-   **Cleanliness**: `git worktree remove` wipes the entire temporary environment instantly.
