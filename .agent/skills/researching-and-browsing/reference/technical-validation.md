# Technical Anti-Hallucination & Validation

This guide provides a rigorous protocol for validating technical information to eliminate hallucinations.

## Implementation Protocol

### Phase 1: Dependency Identification

Before starting any technical research, pinpoint the targets:

1.  **Check `package.json`**: Identify the version of the library you are working with.
2.  **Environment Check**: Note the Node/Python version and the OS.
3.  **Conflict Scan**: Check for overlapping libraries (e.g., `react-router` vs `next/navigation`).

### Phase 2: Targeted Verification

Do not trust your memory for API signatures.

- **Search Pattern**: `[library_name]@[version] [method_name] example`
- **Verification points**:
  - Input parameters (types, optionality)
  - Return objects (nesting levels, nullable fields)
  - Exception handling (what errors it throws)

### Phase 3: The "Source Check"

1.  **Direct Read**: Use `read_url_content` on the official API reference page.
2.  **Wild Check**: Search GitHub for real-world usage of the exact signature in repositories updated within the last 3 months.
3.  **Issue Check**: Search GitHub Issues for the method name and common keywords like "undefined", "error", or "deprecated".

## Verification Output

When presenting a verified pattern, use the following block:

````markdown
### 🔍 Verified Implementation Pattern

**Tool**: [Name@Version]
**Primary Doc**: [URL]
**Pattern**:

```typescript
// Verified code block
```
````

**Notes**: [e.g., "Requires Node 18+", "Must be used inside a Provider"]

```

```
