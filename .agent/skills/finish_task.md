---
name: Finish Task
description: Concludes a task by merging, verifying, and cleaning up the worktree.
---

# Finish Task Skill

This skill handles the safe completion of a parallel task.

## Usage
When the user is satisfied with the changes in the worktree and wants to merge.

## Steps

1.  **Verify Location**: Confirm you are working in a worktree (e.g., path contains `.worktrees/`).
2.  **Commit Changes**:
    -   `git add .`
    -   `git commit -m "<concise message describing changes>"`
3.  **Sync with Main**:
    -   `git fetch origin main`
    -   `git merge origin/main`
    -   *Crucial*: Resolve any merge conflicts now. This ensures we test the code exactly as it will behave after merging.
4.  **Automated Verification**:
    -   Run linting: `npm run lint`
    -   Run unit tests: `npm run test`
    -   Run E2E tests: `npm run e2e` (or equivalent)
    -   **Stop** if any check fails. Fix issues in the worktree before proceeding.
5.  **Merge to Main**:
    -   `cd` back to root.
    -   `git merge --no-ff <task-branch-name>`
6.  **Cleanup**:
    -   `git worktree remove .worktrees/<task-name>`
    -   `git branch -d <task-name>`
6.  **Push**:
    -   `git push origin main` (Ask for confirmation if strictly required).

## Example Commands
```bash
# 1. Commit (in worktree)
git add .
git commit -m "feat: complete login flow"

# 2. Sync with Main
git fetch origin main
git merge origin/main

# 3. Verify (Unified Code)
npm run typecheck
npm test
npm run e2e

# 4. Merge & Cleanup (from root)
cd ../..
git merge --no-ff feature-temp
git worktree remove .worktrees/feature-temp
git branch -d feature-temp
```
