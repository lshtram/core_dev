# Antigravity Research Protocol

This document defines the "Gold Standard" for web research for Antigravity Agents. It is designed to maximize information density while minimizing token waste and latency.

## The 5 Pillars of Antigravity Research

### 1. Invisible-First Execution

- **Strategy**: Always reach for `read_url_content` (or `gh` for repo data) as the baseline.
- **Rationale**: Headless extraction is 10x faster than `browser_subagent` and produces cleaner, more parsable markdown.
- **When to escalate**: Only use `browser_subagent` if the page is behind a heavy JS wall or requires visual confirmation of a UI state.

### 2. The Discovery-Filter-Extract Loop

Never read everything. Use a tiered approach:

1. **Discovery**: Broad search queries.
2. **Filtering**: Quick scans of snippets/meta-descriptions to select top-3 sources.
3. **Extraction**: Targeted reading of specific chunks (`view_content_chunk`) rather than whole pages.

### 3. Multi-Perspective Validation

Technical decisions must never rest on a single source.

- **The Rule of Three**: Every breaking change or API adoption requires confirmation from 3 distinct domains (e.g., official docs, a recent GitHub issue, and a verified community guide).
- **Credibility Scoring**:
  - **100**: Official Documentation (up-to-date)
  - **80**: GitHub Repository (Source Code/README)
  - **60**: StackOverflow (Recent, high upvotes)
  - **40**: Personal Blogs/Medium
  - **20**: Reddit/Forums (User anecdotes)

### 4. Technical Version Pinning

Hallucinations often occur because of version drift.

- **Protocol**: Before citing a pattern, find the `package.json` or `requirements.txt` in the source repo. Match it against the project's own version.
- **Verification query**: `site:[official_docs_url] [version_number] [function_name]`

### 5. Traceable Synthesis

The research result is a "live" document.

- **Citations**: All claims must have `[1](URL)` style links.
- **Negative Results**: Explicitly document what was NOT found. "I searched for X in docs Y and Z; it does not appear to exist."

## Tool Failure Workarounds

- **Search Web Failing?**: Use `gh search repos` to find code examples or `gh search code` to find usage patterns in the wild. Use `gh api` for targeted documentation fetches from GitHub.
- **403/Forbidden?**: Switch to `read_url_content` if `browser_subagent` failed, or vice versa. Some sites block headless browsers but allow "invisible" text readers.
