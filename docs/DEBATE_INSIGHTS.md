# Perspective Engineering: SDLC Engine Critique

**Session Goal**: Identify blind spots in the "High-Integrity Agentic Environment" by simulating professional debate.

---

## 🏛️ The Personas

| Persona | Primary Value | Primary Concern |
| :--- | :--- | :--- |
| **System Architect** | Scalability & Coupling | Process Bloat & Tooling Fragility |
| **FE Designer** | Visual Fidelity & UX | SDLC "Rigidity" killing creative flow |
| **Junior Developer** | Ease of Use / Velocity | High Barrier to Entry (Cognitive Overload) |
| **Quality Engineer** | Traceability & Coverage | "Checkbox Culture" vs. Real Quality |
| **Security Expert** | Hardened Perimeter | Agent Over-privilege & Secret Leaks |

---

## 🗣️ The Debate (Highlights)

### 1. On "Friction & Velocity"
> **Junior Dev**: "The SDLC is 10 steps! If I just want to fix a typo in a CSS module, do I really need a PRD, a Tech Spec, and a worktree fork? I feel like the engine makes simple things 5x slower."
>
> **FE Designer**: "Agreed. If I'm 'vibing' on a design in Storybook, I don't want to stop to write a Tech Spec. We need a 'Fast Track' for UI-only changes where we skip the heavy docs."
>
> **Architect**: "Wait. Skipping docs is how we get 10,000 lines of unmaintainable CSS. But I agree—we should have a **'Light' vs 'Heavy' SDLC toggle** in the `./agent start` command."

### 2. On "Agent Privacy & Permission" (The MCP Gap)
> **Security Expert**: "I'm looking at `REQUIREMENTS_MCP.md`. We're giving the Agent `execute_sql` and `github-mcp`. If the agent's prompt is hijacked, it can wipe the production DB or leak the repo. We need **Human-in-the-loop** for ALL DDL operations, regardless of what the skill says."
>
> **Architect**: "Excellent point. Our engine lacks a 'Safe Mode' for the CLI that prevents destructive scripts without a physical 2FA or User confirmation."

### 3. On "Traceability & The Requirement Gap"
> **Quality Engineer**: "We added IDs to the PRD, which is great. But who checks if the test *actually* covers the ID? We need a **Traceability Matrix**—a script that scans code comments for `@verifies FEAT-001` and matches it against the PRD."
>
> **Junior Dev**: "That sounds like more work for me!"
>
> **Quality Engineer**: "Actually, Plop could automate it. When you generate a test, it should ask which Requirement ID you're covering."

### 4. On "The Knowledge Junk Drawer"
> **Architect**: "The `knowledge-integration` skill is smart, but if it patches `CODING_STYLE.md` every 4 hours, the file will become a 50MB mess. We need **Tiered Documentation**: Core Principles (rarely change) vs. Tactical Tips (change often)."

---

## 💡 New Insights & Actionable Refinements

1. **Insight: "SDLC Tiers"**
   - *Refinement*: Modify `./agent start` to support `./agent start --light` (skips PRD/Spec for UI/Refactor/Typo tasks).
2. **Insight: "Semantic Traceability"**
   - *Refinement*: Update Plop templates to include a `@verifies [REQ-ID]` field in tests to automate the coverage map.
3. **Insight: "Permission Boundary"**
   - *Refinement*: Update the `SUPABASE-MASTERY` skill to explicitly state: "Agent must NEVER run DDL (Create/Alter/Drop) without the user physically approving the SQL block in the chat."
4. **Insight: "Onboarding Skill"**
   - *Refinement*: Create an `onboarding.md` skill for Junior developers that explains the "Why" of the rules when they trigger a lint error.

---

**Consensus**: The engine is technically solid but needs to be more "Adaptive" to the task size to avoid becoming a burden on the developer.
