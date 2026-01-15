# AGENTIC SDLC (Strictness: S-3 High-Integrity)

You MUST follow these gates in sequence. At every [GATE], stop and wait for user approval.

1. **Requirements & PRD**: Scan relevant files; flag potential risks.
   - **Artifact**: Create `.agent/scratchpad/PRD_current.md`.
2. **Tech Spec & Architecture**: Generate `.agent/scratchpad/TECH_SPEC_current.md` (formerly PLAN_current).
   - **[GATE]**: User must approve the Technical Specification.
3. **Implementation**: Build in modular, reviewable chunks (<200 lines). Enforce patterns via `pattern-enforcement`.
4. **Static Verification**: Run `.agent/scripts/verify.py --lint --types`.
   - **Requirement**: Must be syntactically perfect before proceeding.
5. **Unit Testing**: Run `.agent/scripts/verify.py --unit`.
   - **Requirement**: TDD loop must pass 100%.
   - **[GATE]**: **Functional Check**. Verify implementation matches `PRD_current.md`.
6. **E2E Validation**: Run `.agent/scripts/verify.py --e2e`.
7. **User QA Transfer**: Generate a concise "Review Note" for the manual vibe check.
8. **Post-Mortem**: Identify friction points AND operational inefficiencies (e.g., slow command paths).
9. **Doc Sync**: Update relevant docs. Ask for approval if major changes occur.
10. **Learning Loop**: Propose updates to `.agent/GUIDELINES.md`. Identify if a **New Skill** is needed.
    - **[GATE]**: User signs off on "Agent Memory Update."
