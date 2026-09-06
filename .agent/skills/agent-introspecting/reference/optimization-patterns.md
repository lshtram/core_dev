# Optimization Patterns for Agentic Processes

Use these patterns to resolve common inefficiencies and errors identified during introspection.

## Addressing Mistake Patterns

### Pattern: Silent Failure Recovery

- **Issue**: Agent proceeds after a search/read error.
- **Fix**: Update the relevant `SKILL.md` to include a "Mandatory Error Acknowledgment" step.

### Pattern: Tool Looping

- **Issue**: Repeatedly calling `ls` or `grep` without refining the query.
- **Fix**: Add "Recursive Exploration" guidelines to the skill, requiring a query shift after 2 failures.

## Enhancing Efficiency

### Pattern: Progressive Disclosure

- **Issue**: Context window is cluttered with long checklists or examples.
- **Fix**: Split the skill into `SKILL.md` (core) and `./reference/*.md` (details).

### Pattern: Invisible Browsing

- **Issue**: Using a visual browser for simple text extraction.
- **Fix**: Require `read_url_content` as the primary tool in `researching-and-browsing`.

## Improving Adherence

### Pattern: The [GATE] Protocol

- **Issue**: Skipping user approval on architectural changes.
- **Fix**: Formalize `[GATE]` points in `PROCESS.md` and enforce them via the `finish-task` skill.

### Pattern: Pattern Enforcement

- **Issue**: Variable names or code structure deviating from `CODING_STYLE.md`.
- **Fix**: Run `pattern-enforcement` skill periodically during execution.
