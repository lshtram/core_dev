# Porting the "Mission Control" Agent Environment

This guide outlines the **Progressive Disclosure Architecture** for agentic workflows. Use this to setup a token-efficient, high-capability environment in any new project.

---

## 1. The 3-Tier Architecture

### Tier 1: The Technical Registry (`mcp_config.json`)

Defines the "Hands" (tools). By using `npx`, we avoid manual installation and keep the environment portable.

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp-server"],
      "env": { "SUPABASE_URL": "...", "SUPABASE_SERVICE_ROLE_KEY": "..." }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." }
    }
  }
}
```

### Tier 2: The Semantic Manifest (`AGENTS.md`)

Defines the "Menu". This tells the agent what is available without loading thousands of lines of tool definitions into the context window.

**Template Section:**

```markdown
## Agent Capabilities & On-Demand Tools (Progressive Disclosure)

### Available MCP Servers (Load on Demand)

- **[Service Name]**: [Dormant] Brief description of when to query this.
- **github-manager**: [Dormant] Use for PR reviews and issue tracking.

### Loading Instructions

1.  Check this list before starting a task.
2.  Command the agent to "Load [Server Name]" only when the reasoning path requires it.
```

### Tier 3: The Reasoner Skills (`.agent/skills/*.md`)

Defines the "Brain". These are markdown instructions that guide the agent on _how_ to use its tools effectively.

---

## 2. Key Universal Skills

### Sequential Thinking

_Save as `.agent/skills/sequential-thinking.md`_

```markdown
---
name: Sequential Thinking
description: A method for breaking down complex problems into logical, sequential steps.
---

# Sequential Thinking Skill

Use this for complex refactoring or debugging.

## Process

1. **Deconstruct**: Break the problem into atomic parts.
2. **Order**: Arrange by logical dependency.
3. **Hypothesize**: For each step, state expected behavior and risks.
4. **Verify**: Define a success metric for each step before proceeding.

## Implementation Pattern

"Applying Sequential Thinking:

1. I will first [Step 1]...
2. Then [Step 2]...
3. Finally [Step 3] to verify."
```

---

## 3. Deployment Steps for a New Project

1.  **Initialize Registry**: Create `mcp_config.json` with your required servers.
2.  **Declare Manifest**: Add the "Dormant" section to your `AGENTS.md`.
3.  **Setup Secrets**: Create a `.env.template` listing all required `API_KEYS`.
4.  **Inject Skills**: Copy universal skill files into `.agent/skills/`.

---

## 4. Efficiency Gains

- **Token Savings**: Reduces startup context by 90%+.
- **Reduced Hallucination**: The agent focuses on code rather than being distracted by irrelevant tool schemas.
- **Portability**: Moving to a new project only requires updating the registry URLs and API keys.
