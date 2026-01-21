# Skill Recommendations

Based on research into the official [Antrhopics Skills](https://github.com/anthropics/skills) and community "Awesome" lists (Sentry, Composio), here are the top skills we should import/adapt for `core_dev`.

## 1. `code-review` (The "Sentry" Style)

**Source**: Inspired by Sentry's "Seer" and community Code Review skills.
**Concept**: A dedicated skill to analyze the _diff_ of the current worktree against `main` and provide specific, actionable feedback on:

- Security vulnerabilities (INPs, Secrets).
- Performance bottlenecks.
- Type safety (strict checks).
  **Implementation**:
- `SKILL.md`: Prompts specifically for "Reviewer Persona".
- `scripts/analyze_diff.sh`: Fetches the diff.
- `scripts/security_check.py`: Regex search for secrets/vulnerabilities.

## 2. `test-pilot` (The "Playwright" Style)

**Source**: `anthropics/skills/webapp-testing`.
**Concept**: An interactive test runner that doesn't just "run tests" but _debugs_ them.
**Implementation**:

- Wraps `npm run e2e`.
- **Feature**: If a test fails, it automatically:
  1. Captures the failure log.
  2. Reads the relevant test file.
  3. Reads the component code.
  4. Suggests a fix.
- Includes `scripts/with_server.py` to ensure the app is running before testing.

## 3. `spec-writer` (Productivity)

**Source**: Inspired by `skill-creator` and "Product Manager" agents.
**Concept**: Interactive tech-spec generator.
**Implementation**:

- Instead of "Write a spec for X", you run this skill.
- It asks you 5-7 questions (Database impact? UI changes? Security risks?).
- It compiles your answers into the project's standard `PRD.md` format.

## Recommendation

I recommend starting with **`test-pilot`** because it aligns with your "High-Integrity" goal (automating verification) and we already have the `verify.py` script we can reuse/enhance.
