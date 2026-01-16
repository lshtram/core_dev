# SDLC Engine: Required MCP Servers

To achieve 100% efficiency and adherence to our High-Integrity framework, the following Model Context Protocol (MCP) servers SHOULD be configured in your agentic environment.

## 1. Supabase (CRITICAL)
- **Tooling**: `supabase-mcp-server`
- **Purpose**: Enables the agent to execute migrations, manage branches, and audit security (RLS) directly via the CLI.
- **Used by**: `supabase-mastery.md`

## 2. GitHub (RECOMMENDED)
- **Tooling**: `github-mcp-server`
- **Purpose**: Allows the agent to create PRs, manage issues, and trigger GitHub Actions without leaving the chat.
- **Used by**: `github-automation.md`

## 3. Linear / Jira (OPTIONAL - TRACEABILITY)
- **Tooling**: `linear-mcp` or `jira-mcp`
- **Purpose**: Synchronize PRD Requirements directly to tickets.
- **Used by**: `PRD.md` traceability section.

## 4. Search & Research (STRATEGIC)
- **Tooling**: `google-search` or `tavily-mcp`
- **Purpose**: Prevents library version hallucinations. Required for "Chain of Thought" research.
- **Used by**: `strong-prompt.md` (Iterative Mode).

## 5. Sentry / Monitoring (OPERATIONAL)
- **Tooling**: `sentry-mcp`
- **Purpose**: Pulls real-time production errors into the "Learning Loop" (Step 10).
- **Used by**: `knowledge-integration.md`.

## 3. Local Shell (NATIVE)
- **Purpose**: Required for running `./agent audit`, `python verify.py`, and `plop`.
- **Note**: This is typically built into your agent's environment, but is the "glue" for all other tools.

---

## How to use this file
When moving the **SDLC Engine** to a new project:
1. Ensure your AI Client (e.g., Desktop App, IDE Plugin) has the servers above active.
2. The agent will read this file during initialization to confirm it has the "Expert Tools" needed for the mission.
