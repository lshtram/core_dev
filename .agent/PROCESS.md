# AGENTIC SDLC (Strictness: S-3 High-Integrity)

You MUST follow these gates in sequence. At every [GATE], stop and wait for user approval.

0. **Workspace Setup**: Initialize the parallel environment.
   - **Action**: Use the `start_task` skill. See [PARALLEL_WORKFLOW.md](../docs/PARALLEL_WORKFLOW.md).
   - **Constraint**: Immediately switch context to `.worktrees/<feature-name>`. Do not verify or edit in the root.
1. **Requirements & PRD**: Scan relevant files; flag potential risks.
   - **Check**: Verify consistency against `docs/PRD_Core_Framework.md` (Master PRD). Feature PRDs must be a strict subset or extension, not a contradiction.
   - **Artifact**: Create `docs/PRD.md` (Do NOT hide in scratchpad).
2. **Tech Spec & Architecture**: Generate `docs/TECH_SPEC.md` (renamed from scratchpad).
   - **[GATE]**: User must approve the Technical Specification.
3. **UI Prototyping (Code-First)**: For any new UI, create `prototypes/<feature>.html`.
   - **Constraint**: Pure HTML/CSS (Tailwind allowed if configured). No React/Build steps yet. Faster iteration.
   - **[GATE]**: User approves layout and flow.
4. **Implementation**: Build in modular, reviewable chunks (<200 lines). Enforce patterns via `pattern-enforcement`.
5. **Static Verification**: Run `.agent/scripts/verify.py --lint --types`.
   - **Requirement**: Must be syntactically perfect before proceeding.
6. **Unit Testing**: Run `.agent/scripts/verify.py --unit`.
   - **Requirement**: TDD loop must pass 100%.
   - **[GATE]**: **Functional Check**. Verify implementation matches `docs/PRD.md`.
7. **E2E Validation**: Run `.agent/scripts/verify.py --e2e`.
8. **User QA Transfer**: Generate a concise "Review Note" for the manual vibe check.
9. **Post-Mortem**: Identify friction points AND operational inefficiencies (e.g., slow command paths).
10. **Doc Sync (CRITICAL)**:
    - **Update Requirements**: Mark relevant PRD items as ✅ (Pass) in `docs/PRD_Core_Framework.md` and feature-specific PRDs.
    - **Traceability**: Ensure every verified requirement links to its test file.
    - **Doc Audit**: Check if architecture diagrams or API docs need updates.
11. **Learning Loop**: Propose updates to `.agent/GUIDELINES.md`. Identify if a **New Skill** is needed.
    - **[GATE]**: User signs off on "Agent Memory Update."
