---
name: researching-and-browsing
description: Use this skill when the task requires web research, gathering information from multiple online sources, investigating technical documentation, or validating API/library versions. This includes using search engines to find relevant URLs, extracting content using invisible text readers, and performing multi-perspective deep research. Invoke when the user asks for deep research, investigation, "browsing the web", or fact-checking technical details.
---

# Researching and Browsing Expert

Systematically gather, validate, and synthesize information from the web while maintaining transparency and eliminating hallucinations through rigorous multi-source validation.

## Core Philosophical Pillar: Invisible-First

The "Antigravity Research Protocol" prioritizes speed and efficiency by using text-only, headless extraction (`read_url_content`) over heavy visual browsing unless visual debugging is strictly required.

## Essential Reference Documents

For detailed methodologies and specialized sub-workflows, see:

- **[Antigravity Research Protocol](./reference/antigravity-research-protocol.md)**: The "Gold Standard" for agent-based web research.
- **[Technical Anti-Hallucination](./reference/technical-validation.md)**: Specific steps for verifying APIs and libraries.
- **[Deep Research Methodology](./reference/deep-research-methodology.md)**: The 8-phase exhaustive research pipeline.
- **[Report Template](./templates/research-report.md)**: Standard format for research findings.

---

## 1. Source Discovery & Ranking

- Use `search_web` to find candidate URLs.
- **Rank Sources**: evaluate search results by relevance, credibility (Official > GitHub > StackOverflow > Blogs), and recency.
- **Cross-Validate**: Verify major claims across at least **3 independent sources**.

## 2. Invisible Extraction & Analysis

- **Primary Tool**: Use `read_url_content` for documentation and generic research.
- **Visuals Only**: Use `browser_subagent` ONLY for visual debugging, UI interaction, or JS-heavy SPAs.
- **Chunk Management**: Read only necessary portions using `view_content_chunk`.

## 3. Technical Fact-Checking (Anti-Hallucination)

Before implementation:

1. Identify the exact version of the dependency (check `package.json`).
2. Search for: `[library_name] [version] doc [feature_goal]`.
3. Verify API signatures (input requirements, return types).
4. Document the "Verified API Pattern" in your thinking block.

## 4. Structured Reasoning Trace

Each thinking block during research MUST include:

1. **Insights**: What did you learn from the last action?
2. **Connections**: How does this connect to the research goal?
3. **Gaps**: What questions remain unanswered?
4. **Next Step**: Rationale for the next tool call.

---

## Prohibited Patterns (Red Flags)

- ❌ **Silent Tool Failure**: Proceeding after a 404 or error without acknowledgment.
- ❌ **Citation Without Retrieval**: Citing URLs that were never successfully read.
- ❌ **Technical Hallucination**: Assuming an API works based on training data without verifying the specific version's docs.
- ❌ **Placeholder Reporting**: Writing "TBD" or "TODO" in final research summaries.

## Quality Standards

- **Source Traceability**: Every significant claim must be followed by a clear, clickable citation.
- **Transparency**: If information is contradictory, present both perspectives with their relative credibility.
- **Closure**: Always include a "Limitations & Gaps" section if the research is incomplete.
