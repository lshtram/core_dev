# Local Skills vs. Official Claude Skills Comparison

## 1. Structure & Format

| Feature            | Your Local Skills (`.agent/skills/`)                                              | Official Claude Skills (`anthropics/skills`)                                                     |
| :----------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **File Structure** | **Flat List**: Single `.md` files (e.g., `start_task.md`, `supabase-mastery.md`). | **Directories**: Each skill is a folder containing a `SKILL.md` file and optional subfolders.    |
| **Metadata**       | **None**: Pure Markdown content. Rely on filenames and manual selection.          | **YAML Frontmatter**: Required block at the top of `SKILL.md` defining `name` and `description`. |
| **Components**     | Single text file.                                                                 | Structured folders: `scripts/` (executable code), `references/` (docs), `assets/` (templates).   |

## 2. Usage Model

### Your Skills ("Manual/Contextual")

- **Design Pattern**: **Prompt Engineering**.
- **Mechanism**: The "Orchestrator" (`strong-prompt`) reads the registry and "recommends" a skill. The agent "loads" it by reading the text.
- **Goal**: Teach the agent _how_ to think or behave (e.g., "Always use git worktrees").
- **Execution**: The agent reads the instructions and performs them manually.

### Claude Skills ("Agentic/Tool-Use")

- **Design Pattern**: **Tool Engineering**.
- **Mechanism**: The system (Claude Code/API) scans the YAML `description` to decide if a skill is relevant.
- **Goal**: Provide executable actions or specific context lookup.
- **Execution**: Can trigger actual scripts (`scripts/*.py`) automatically.

## 3. Example Comparison

### Your Local `start_task.md`

```markdown
# START-TASK: The Workflow Initializer

> **Goal**: Initialize a new parallel task environment...

1. Read AGENTS.md
2. Create git worktree...
```

_Result_: Agent reads this and _manually_ runs `git worktree add...`.

### Equivalent Official `SKILL.md`

```markdown
---
name: start-task
description: Initialize a new parallel task environment using git worktrees.
---

# Instructions

Run the python script to setup the environment.

# Scripts

- scripts/setup_worktree.py
```

_Result_: Agent invokes the tool `start-task`, and the system runs `setup_worktree.py`.

## Summary

You are using a lightweight, prompt-based skill system that is excellent for **compliance and policy enforcement**. The official Claude Skills are heavier, structured for **automating repetitive tasks** with code.
