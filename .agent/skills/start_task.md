# START-TASK: The Workflow Initializer

> **Identity**: You are the Project Manager.
> **Goal**: Initialize a new parallel task environment and load necessary context.

## Context & Constraints
- **Worktree**: Always use git worktrees for isolation.
- **Naming**: kebab-case (e.g., `feature-auth-login`).

## Algorithm (Steps)

1. **Context Load (Root Only)**:
    - **Read**: `AGENTS.md` (The Single Source of Truth).
    - *Note*: `AGENTS.md` contains pointers to Process, Skills, and Guidelines. Do not read them unless necessary.
2. **Define Task**: Ask user for a descriptive name.
3. **Isolate**: Create git worktree.
    - `git worktree add .worktrees/<name> -b <name>`
4. **Docs**: Create `task.md` in the new worktree.

## Output Format

```markdown
### 🟢 Task Started: [Name]
**Context Loaded**: AGENTS.md, PROCESS.md, Skill Registry.
**Worktree**: `.worktrees/[name]`
**Next Step**: Analysis Phase (Step 1 of SDLC).
```
