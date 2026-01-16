# SKILL REGISTRY

> **System**: High-Integrity Agentic Framework
> **Usage**: The Orchestrator (`strong-prompt`) reads this registry to recommend skills.

## Core Skills (Lifecycle)
| Skill | Goal | Trigger |
| :--- | :--- | :--- |
| **[strong-prompt](./strong-prompt.md)** | **ORCHESTRATOR**. Analysis & Strategy. | **STARTUP**, Complex Requests. |
| **[start-task](./start_task.md)** | Initialize workspace & context. | user: "Start task X" |
| **[finish-task](./finish_task.md)** | Verify, Commit, Merge, Cleanup. | user: "I'm done" |
| **[context-management](./context-management.md)** | Manage Tokens & Living Docs. | Long conversations (>20k tokens). |

## specialized Skills (On-Demand)
| Skill | Goal | Trigger |
| :--- | :--- | :--- |
| **[self-correction](./self-correction.md)** | **VERIFIER**. Logic/Code Critique. | Before implementation, After bugs. |
| **[perspective-engineering](./perspective-engineering.md)** | **DEBATER**. Multi-persona simulation. | Architectural/Product decisions. |
| **[pattern-enforcement](./pattern-enforcement.md)** | **ENFORCER**. Code Style Police. | Writing Code. |
| **[meta-prompting](./meta-prompting.md)** | **OPTIMIZER**. Complex Logic Planning. | "Zero-shot" failures. |

## Domain Skills (Expertise)
| Skill | Goal | Trigger |
| :--- | :--- | :--- |
| **[security-audit](./security-audit.md)** | OWASP/Red Team Review. | Auth, APIs, Data Handling. |
| **[test-architect](./test-architect.md)** | Test Strategy (Unit/E2E). | Before writing tests. |
| **[doc-maintainer](./doc-maintainer.md)** | Sync Code -> Docs. | Post-implementation. |
| **[knowledge-integration](./knowledge-integration.md)** | **MEMORIZER**. Update master docs. | **STEP 10 (Learning Loop)**. |

## Service Mastery (MCP Enabled)
| Skill | Goal | Trigger |
| :--- | :--- | :--- |
| **[supabase-mastery](./supabase-mastery.md)** | Migration-First Schema Management. | DB changes, `supabase-mcp`. |
| **[github-automation](./github-automation.md)** | Automated PRs & GitHub Actions. | Merging, Releases. |
| **[env-security](./env-security.md)** | Secret Hygiene & Monitoring. | Committing, CI Setup. |
| **[research-mastery](./research-mastery.md)** | Anti-Hallucination & API Validation. | **Step 2 (Tech Spec)**. |
