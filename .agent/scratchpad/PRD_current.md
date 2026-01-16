# PRD: Core SaaS Framework (Single-Org)

## 1. Goal & Context

**Problem**: We lack a unified, scalable foundation for B2B applications. Existing boilerplates are often too complex (multi-tenant) or too simple (Next.js starter).
**Goal**: Build a **Single-Organization Core Framework** that serves as a high-performance, secure, and modular boilerplate for bespoke B2B projects (e.g., a specific School or Business).
**Context**: Pivoted from a multi-tenant SaaS model to a simpler "One Install = One Org" architecture to reduce complexity and focus on deep Role-Based Access Control (RBAC).

## 1.5 Traceability

**ID**: FEAT-SAAS-CORE
**Tech Spec**: [TECH_SPEC_current.md](file:///Users/liorshtram/dev/core_dev/.worktrees/feature-core-saas-requirements/.agent/scratchpad/TECH_SPEC_current.md)
**Verified By**: `tests/auth/rbac.test.ts`

## 2. User Stories

| Actor             | Action                  | Outcome                                                     | Priority |
| :---------------- | :---------------------- | :---------------------------------------------------------- | :------- |
| **SysAdmin**      | Deploys the App         | A new standalone environment for ONE organization is live.  | P0       |
| **Org Admin**     | Manages Users           | Can assign roles (Manager, Teacher, Student) effectively.   | P0       |
| **Dev**           | Switch Payment Provider | Modify only `PaymentInterface` without touching core logic. | P1       |
| **User (Hebrew)** | Use the Interface       | UI fully mirrors (RTL) and text renders correctly.          | P1       |
| **Teacher**       | Send Broadcast          | All students receive an alert (no risk of cross-org leaks). | P2       |

## 3. Requirements

- **Functional**:
  - **Authentication**: Supabase Auth (Email/Password, Social).
  - **Architecture**: **Single-Tenant**. No `tenant_id` complexity.
  - **RBAC**: Strict hierarchical roles (Admin > Manager > Generic Roles).
  - **File System**: Custom Explorer with quotas and RBAC.

### 3.1 Detailed Requirements & Test Traceability

> **Legend**: ✅ = Implemented/Planned, ⬜ = N/A, 🔄 = Needs Refactor, ❌ = Pending
> **Role Note**: Apps define their own 4-5 role hierarchy.

#### REQ-AUTH: Authentication & Identity

| ID           | Requirement                                                       | Priority | Status | Unit | RLS | E2E | Notes               |
| :----------- | :---------------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :------------------ |
| REQ-AUTH-001 | **Signup Flow**: Username/Password + Email Confirmation           |    P0    |   🔄   |  ⬜  | ⬜  | ✅  | Replaces magic link |
| REQ-AUTH-002 | **Login Flow**: Username/Password credential check                |    P0    |   🔄   |  ⬜  | ⬜  | ✅  | Replaces magic link |
| REQ-AUTH-003 | **Password Reset**: "Forgot Password" email flow                  |    P0    |   ❌   |  ⬜  | ⬜  | ✅  | Secure token reset  |
| REQ-AUTH-004 | **Profile Creation**: Auto-generate profile row on signup         |    P0    |   ✅   |  ⬜  | ✅  | ⬜  | Database trigger    |
| REQ-AUTH-005 | **Sign Out**: Secure session invalidation                         |    P0    |   ✅   |  ⬜  | ⬜  | ✅  |                     |
| REQ-AUTH-006 | **Route Security**: Redirect unauthenticated from protected pages |    P0    |   ✅   |  ⬜  | ⬜  | ✅  | Middleware check    |
| REQ-AUTH-007 | **Google OAuth**: Optional "Sign in with Google" toggle           |    P1    |   ❌   |  ⬜  | ⬜  | ✅  | App-specific config |
| REQ-AUTH-008 | **Extended OAuth**: GitHub/Apple providers                        |    P2    |   ❌   |  ⬜  | ⬜  | ⬜  | Future scope        |

#### REQ-RBAC: Role-Based Access Control

| ID           | Requirement                                                           | Priority | Status | Unit | RLS | E2E | Notes           |
| :----------- | :-------------------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :-------------- |
| REQ-RBAC-001 | **Role Schema**: Support 4-5 hierarchical roles (e.g. Admin/Mgr/User) |    P0    |   ✅   |  ⬜  | ✅  | ⬜  | Defined in enum |
| REQ-RBAC-002 | **Public Read**: All authenticated users can view basic profiles      |    P0    |   ✅   |  ⬜  | ✅  | ⬜  | RLS Policy      |
| REQ-RBAC-003 | **Self-Update**: Users can ONLY edit their own profile fields         |    P0    |   ✅   |  ⬜  | ✅  | ⬜  | RLS Policy      |
| REQ-RBAC-004 | **Role Integrity**: Only top-tier roles can modify user roles         |    P0    |   ✅   |  ⬜  | ✅  | ⬜  | RLS Policy      |
| REQ-RBAC-005 | **Admin Dashboard**: UI to list, search, and filter all users         |    P0    |   ❌   |  ⬜  | ⬜  | ✅  |                 |
| REQ-RBAC-006 | **User Creation**: Admin UI to manually create new accounts           |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |                 |
| REQ-RBAC-007 | **User Deletion**: Admin capability to remove users + data            |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |                 |
| REQ-RBAC-008 | **Role Management**: UI for Admins to promote/demote users            |    P0    |   ❌   |  ⬜  | ✅  | ✅  | Top-role gated  |

#### REQ-FILE: File System & Storage

| ID           | Requirement                                                  | Priority | Status | Unit | RLS | E2E | Notes    |
| :----------- | :----------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :------- |
| REQ-FILE-001 | **Explorer UI**: Folder/File browsing interface              |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |          |
| REQ-FILE-002 | **Upload**: File upload with role-based quota checks         |    P1    |   ❌   |  ⬜  | ✅  | ✅  |          |
| REQ-FILE-003 | **Delete**: Remove files (Owners can always delete own)      |    P1    |   ❌   |  ⬜  | ✅  | ✅  |          |
| REQ-FILE-004 | **Move**: Relocate files between folders                     |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |          |
| REQ-FILE-005 | **Rename**: Rename files/folders without re-upload           |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |          |
| REQ-FILE-006 | **Download**: Secure download link generation                |    P1    |   ❌   |  ⬜  | ⬜  | ✅  |          |
| REQ-FILE-007 | **Visibility Rules**: Strict RLS enforcement on file rows    |    P0    |   ❌   |  ⬜  | ✅  | ✅  |          |
| REQ-FILE-008 | **Admin Access**: Top role can view/manage ALL files         |    P1    |   ❌   |  ⬜  | ✅  | ✅  |          |
| REQ-FILE-009 | **Private Isolation**: Lowest role sees ONLY their own files |    P0    |   ❌   |  ⬜  | ✅  | ✅  |          |
| REQ-FILE-010 | **Storage Quotas**: Enforce max storage per role tier        |    P1    |   ❌   |  ⬜  | ⬜  | ✅  | DB check |
| REQ-FILE-011 | **Quota UI**: Visual display of used vs total storage        |    P2    |   ❌   |  ⬜  | ⬜  | ✅  |          |

#### REQ-NOTIFY: Notifications

| ID             | Requirement                                                   | Priority | Status | Unit | RLS | E2E | Notes             |
| :------------- | :------------------------------------------------------------ | :------: | :----: | :--: | :-: | :-: | :---------------- |
| REQ-NOTIFY-001 | **Provider Interface**: Standard API for Email/Push/In-App    |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | `sendEmail`, etc. |
| REQ-NOTIFY-002 | **Mock Provider**: Dev implementation (console logging)       |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | For local dev     |
| REQ-NOTIFY-003 | **Test UI**: Admin page to trigger manual notifications       |    P2    |   ❌   |  ⬜  | ⬜  | ✅  | Debugging tool    |
| REQ-NOTIFY-004 | **Group Broadcast**: Send message to all users in a Role      |    P2    |   ❌   |  ⬜  | ✅  | ✅  | Role-gated        |
| REQ-NOTIFY-005 | **Broadcast Perms**: Configurable rules for who can broadcast |    P1    |   ❌   |  ⬜  | ✅  | ⬜  | App config        |

#### REQ-PAY: Payment Integration

| ID          | Requirement                                              | Priority | Status | Unit | RLS | E2E | Notes             |
| :---------- | :------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :---------------- |
| REQ-PAY-001 | **Provider Interface**: Standard API for Subs/Invoices   |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | `createSub`, etc. |
| REQ-PAY-002 | **Mock Provider**: Dev implementation for payments       |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | For local dev     |
| REQ-PAY-003 | **Create Sub**: Admin capability to start a plan         |    P2    |   ✅   |  ✅  | ⬜  | ⬜  | Interface exists  |
| REQ-PAY-004 | **Cancel Sub**: Admin capability to stop a plan          |    P2    |   ✅   |  ✅  | ⬜  | ⬜  | Interface exists  |
| REQ-PAY-005 | **Billing Portal**: Generate Stripe/Provider portal link |    P2    |   ✅   |  ✅  | ⬜  | ⬜  | Interface exists  |
| REQ-PAY-006 | **Self-Service**: Optional user-facing billing page      |    P3    |   ❌   |  ⬜  | ⬜  | ✅  | App-specific      |

#### REQ-AI: AI Orchestration

| ID         | Requirement                                                 | Priority | Status | Unit | RLS | E2E | Notes              |
| :--------- | :---------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :----------------- |
| REQ-AI-001 | **Provider Interface**: Standard API for LLM interaction    |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | `chat`, `generate` |
| REQ-AI-002 | **Mock Provider**: Canned responses for dev/testing         |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | Cost-free test     |
| REQ-AI-003 | **Chat**: Conversational interface capability               |    P2    |   ✅   |  ✅  | ⬜  | ✅  | Interface exists   |
| REQ-AI-004 | **Task Gen**: AI-driven task extraction from text           |    P2    |   ✅   |  ✅  | ⬜  | ✅  | Interface exists   |
| REQ-AI-005 | **Research**: Trend analysis capability                     |    P2    |   ✅   |  ✅  | ⬜  | ✅  | Interface exists   |
| REQ-AI-006 | **Action Validator**: Non-AI logic to verify AI suggestions |    P0    |   ❌   |  ⬜  | ⬜  | ✅  | ADR-0004           |

#### REQ-REPORT: Reporting

| ID             | Requirement                                              | Priority | Status | Unit | RLS | E2E | Notes            |
| :------------- | :------------------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :--------------- |
| REQ-REPORT-001 | **Provider Interface**: API for Export/Report generation |    P1    |   ✅   |  ✅  | ⬜  | ⬜  | `generateExcel`  |
| REQ-REPORT-002 | **Excel Export**: Generate .xlsx from data sets          |    P2    |   ✅   |  ✅  | ⬜  | ✅  | Interface exists |
| REQ-REPORT-003 | **PDF Export**: Generate .pdf documents                  |    P2    |   ✅   |  ✅  | ⬜  | ✅  | Interface exists |
| REQ-REPORT-004 | **Export Manifest**: Handle large-scale data dumps       |    P2    |   ✅   |  ✅  | ⬜  | ⬜  | Batch processing |
| REQ-REPORT-005 | **Test UI**: Admin page to trigger sample reports        |    P2    |   ❌   |  ⬜  | ⬜  | ✅  | Debugging tool   |

#### REQ-UI: User Interface

| ID         | Requirement                                      | Priority | Status | Unit | RLS | E2E | Notes          |
| :--------- | :----------------------------------------------- | :------: | :----: | :--: | :-: | :-: | :------------- |
| REQ-UI-001 | **Login Page**: Standard Username/Password form  |    P0    |   🔄   |  ⬜  | ⬜  | ✅  | Needs refactor |
| REQ-UI-002 | **Signup Page**: Standard registration form      |    P0    |   🔄   |  ⬜  | ⬜  | ✅  | Needs refactor |
| REQ-UI-003 | **Reset Password**: UI for password recovery     |    P0    |   ❌   |  ⬜  | ⬜  | ✅  | Missing        |
| REQ-UI-004 | **Dashboard**: Protected home view per role      |    P0    |   ✅   |  ⬜  | ⬜  | ✅  | Basic version  |
| REQ-UI-005 | **Admin Users**: Management list view            |    P0    |   ❌   |  ⬜  | ⬜  | ✅  | Missing        |
| REQ-UI-006 | **File Explorer**: Finder-like UI component      |    P1    |   ❌   |  ⬜  | ⬜  | ✅  | Missing        |
| REQ-UI-007 | **Notify Tester**: UI to send mock notifications |    P2    |   ❌   |  ⬜  | ⬜  | ✅  | Missing        |
| REQ-UI-008 | **Provider Tester**: UI to invoke AI/Reports     |    P2    |   ❌   |  ⬜  | ⬜  | ✅  | Missing        |
| REQ-UI-009 | **RTL Layout**: Full right-to-left support       |    P1    |   ✅   |  ⬜  | ⬜  | ✅  | `globals.css`  |

#### REQ-INFRA: Infrastructure

| ID            | Requirement                                 | Priority | Status | Unit | RLS | E2E | Notes |
| :------------ | :------------------------------------------ | :------: | :----: | :--: | :-: | :-: | :---- |
| REQ-INFRA-001 | **Framework**: Next.js 16 (App Router) base |    P0    |   ✅   |  ⬜  | ⬜  | ✅  |       |
| REQ-INFRA-002 | **Supabase**: SSR-compatible Client setup   |    P0    |   ✅   |  ⬜  | ⬜  | ✅  |       |
| REQ-INFRA-003 | **State**: Zustand + IndexedDB persistence  |    P0    |   ✅   |  ⬜  | ⬜  | ✅  |       |
| REQ-INFRA-004 | **PWA**: Manifest & offline shell support   |    P1    |   ✅   |  ⬜  | ⬜  | ✅  |       |
| REQ-INFRA-005 | **Proxy**: Middleware route protection      |    P0    |   ✅   |  ⬜  | ⬜  | ✅  |       |

- **Non-Functional**:
  - **Performance**: Next.js SSR for immediate load.
  - **Resilience**: **State Persistence** (Refresh-safe active workflows using IndexedDB/Zustand).
  - **Availability**: **Offline-First** (PWA support for core app shell and cached media).
  - **Security**: Robust RBAC policies (verified by audit).
  - **Portability**: Native data export (**Excel/CSV/JSON/PDF** + Storage Manifest for high-capacity data).
  - **UI**: Minimalist, distraction-free design.

## 4. Success Metrics

- **Simplicity**: Codebase Lines of Code (LOC) reduced by ~20% vs multi-tenant implementation.
- **Modularity**: Time to swap payment provider < 4 hours.
- **Security**: 100% pass rate on RBAC permission tests.

## 5. Competitive Comparison (vs. ShipFast & Standard Boilerplates)

| Feature             | Standard Boilerplates (e.g., ShipFast)      | **Our Core Framework**                             |
| :------------------ | :------------------------------------------ | :------------------------------------------------- |
| **Target Audience** | B2C, Indie Hackers, fast MVPs.              | **B2B / Edu**, High-Integrity Organizations.       |
| **Architecture**    | Often "All-in-One" (Hardcoded Stripe/Mail). | **Modular Abstraction** (Swap providers easily).   |
| **Tenancy**         | Usually Single-User or Basic Team.          | **Deep RBAC** (Admin/Manager/User) for Single Org. |
| **Localization**    | Basic i18n support.                         | **Native Hebrew (RTL)** first-class citizen.       |
| **Data Strategy**   | App-centric (data locked in app logic).     | **Sovereign-centric** (Native CSV/JSON export).    |
| **UI Philosophy**   | "Flashy" Landing Page + Basic Dashboard.    | **Minimalist**, distraction-free, role-specific.   |

## 6. Intentional Omissions (vs. Market Leaders)

To maintain a lightweight, high-integrity framework, we explicitly **exclude** features found in "All-in-One" boilerplates:

- **Marketing/Landing Pages**: We provide the **App** shell only. No pre-built "Hero Sections" or pricing tables for public visitors.
- **Blog / CMS**: No built-in MDX blog or SEO-heavy content management.
- **Business Analytics**: No pre-wired integrations for Google Analytics, PostHog, or "MRR/Churn" dashboards (since this is internal/B2B).
- **Feedback Boards**: No "User Voice" or roadmap voting widgets.
- **AI Wrappers**: No generic "Chat with PDF" templates; AI logic will be bespoke if added.
