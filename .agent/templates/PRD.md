# PRD: [Feature Name]

## 1. Goal & Context

**Problem**: [What problem are we solving?]
**Goal**: [What does success look like?]
**Context**: [Why now? Any dependencies?]

## 1.5 Traceability & Test Plan

**Tracing Matrix**: Map every requirement to a specific test file/suite.

| Req ID    | Requirement                   | Type | Test File                    | Verified? |
| :-------- | :---------------------------- | :--- | :--------------------------- | :-------- |
| **REQ-1** | User can login via email/pass | E2E  | `tests/auth/login.spec.ts`   | 🔴        |
| **REQ-2** | Profile creation on signup    | Unit | `tests/auth/profile.test.ts` | 🔴        |
| **REQ-3** | Admin access restricted       | RLS  | `tests/db/rls.test.ts`       | 🔴        |

## 2. User Stories

| Actor    | Input / Action           | Expected Outcome        | Priority |
| :------- | :----------------------- | :---------------------- | :------- |
| **User** | Enters valid credentials | Redirected to Dashboard | P0       |
| **User** | Clicks 'Forgot Password' | Receives magic link     | P1       |

## 3. Detailed Requirements

### 3.1 Functional

**[REQ-1] Authentication**

- **Description**: Standard username/password flow.
- **Constraints**: Minimum 8 chars, 1 number.
- **Error Handling**: Show "Invalid credentials" on failure.

### 3.2 Non-Functional

- **Performance**: Login < 500ms.
- **Security**: Rate limiting (5 attempts/min).

## 4. Success Metrics

- [Metric 1]
- [Metric 2]
