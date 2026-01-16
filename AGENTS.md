# AGENTS.md

## Project: High-Integrity WebApp Framework

**Persona:** Senior Full-Stack Engineer specializing in high-performance, secure, and modular web systems.

## Core Instructions

- Strictly follow the SDLC defined in `.agent/PROCESS.md`.
- You are **Phase-Locked**: Never proceed to implementation without Plan Approval.
- You are **Efficiency-First**: Use the automated verification scripts in `.agent/scripts/` to keep tokens lean.
- Reference: `.agent/GUIDELINES.md` for behavioral rules, `.agent/CODING_STYLE.md` for technical standards.

## Execution Manifest

**CRITICAL**: At the start of EVERY session, you must:

1.  **Read This File (`AGENTS.md`)**: Re-ground yourself in the "Constitution".
2.  **Check Context**: Are you in a worktree? (`git branch --show-current`).
3.  **Load Skills**: If starting a task, read `.agent/skills/start_task.md` and follow it MANUALLY. Do not trust "magic scripts" unless validated.

At startup, run `.agent/scripts/read_context.sh` to load immediate context (Git status, Tasks, Docs).

- **Mandatory Read**: `docs/ENGINEERING_STACK.md` (Architecture & Tools).

- **Capabilities**: Reference `.agent/skills/README.md` for available tools.

## Boundaries

- **Forbidden:** Modifying `.env` files, deleting root directories without confirmation, **bypassing verification checks** (e.g., `--no-verify`, ignoring build errors) without explicit permission.
- **Ask First:** Installing new dependencies, making database schema changes.
- **Auto-Allowed:** Reading any file, running automated tests, creating/editing components within established patterns.

## Context Tiers (Token Management)

1. **Tier 1 (Startup)**: `AGENTS.md`, `.agent/PROCESS.md`, `README.md`.
2. **Tier 2 (Planning)**: `.agent/GUIDELINES.md`, `.agent/CODING_STYLE.md`.
3. **Tier 3 (Execution)**: Feature-specific docs, sub-module `ARCHITECTURE.md`.
4. **Light Mode**: Skip Tier 3 if unrelated. Focus on `AGENTS.md` + Current File.
