# PRD: Core SaaS Framework (Single-Org)

## 1. Goal & Context

**Problem**: We lack a unified, scalable foundation for B2B applications. Existing boilerplates are often too complex (multi-tenant) or too simple (Next.js starter).
**Goal**: Build a **Single-Organization Core Framework** that serves as a high-performance, secure, and modular boilerplate for bespoke B2B projects (e.g., a specific School or Business).
**Context**: Pivoted from a multi-tenant SaaS model to a simpler "One Install = One Org" architecture to reduce complexity and focus on deep Role-Based Access Control (RBAC).

## 1.5 Traceability

**ID**: FEAT-SAAS-CORE
**Tech Spec**: `docs/TECH_SPEC.md`

## 2. User Stories

| Actor             | Action                  | Outcome                                                     | Priority |
| :---------------- | :---------------------- | :---------------------------------------------------------- | :------- |
| **SysAdmin**      | Deploys the App         | A new standalone environment for ONE organization is live.  | P0       |
| **Org Admin**     | Manages Users           | Can assign roles (Manager, Teacher, Student) effectively.   | P0       |
| **Dev**           | Switch Payment Provider | Modify only `PaymentInterface` without touching core logic. | P1       |
| **User (Hebrew)** | Use the Interface       | UI fully mirrors (RTL) and text renders correctly.          | P1       |
| **Teacher**       | Send Broadcast          | All students receive an alert (no risk of cross-org leaks). | P2       |

## 3. Requirements

### 3.1 Detailed Requirements & Test Traceability

> **Legend**: ✅ = Pass, ❌ = Fail, 🚧 = In Progress

#### REQ-AUTH: Authentication & Identity

| ID           | Requirement                                  | Priority | Status | Verified By (File > Test)        | Notes               |
| :----------- | :------------------------------------------- | :------: | :----: | :------------------------------- | :------------------ |
| REQ-AUTH-001 | **Signup Flow**: Username/Password + Email   |    P0    |   🔄   | `tests/e2e/auth/signup.spec.ts`  | Replaces magic link |
| REQ-AUTH-002 | **Login Flow**: Username/Password check      |    P0    |   🔄   | `tests/e2e/auth/login.spec.ts`   | Replaces magic link |
| REQ-AUTH-003 | **Password Reset**: "Forgot Password" flow   |    P0    |   ❌   | `tests/e2e/auth/reset.spec.ts`   | Secure token reset  |
| REQ-AUTH-004 | **Profile Creation**: Auto-generate profile  |    P0    |   ✅   | `tests/auth/triggers.test.ts`    | Database trigger    |
| REQ-AUTH-005 | **Sign Out**: Secure session invalidation    |    P0    |   ✅   | `tests/e2e/auth/signout.spec.ts` |                     |
| REQ-AUTH-006 | **Route Security**: Redirect unauthenticated |    P0    |   ✅   | `tests/middleware/auth.test.ts`  | Middleware check    |
| REQ-AUTH-007 | **Google OAuth**: Optional toggle            |    P1    |   ❌   | `tests/auth/providers.test.ts`   | App-specific        |
| REQ-AUTH-008 | **Extended OAuth**: GitHub/Apple             |    P2    |   ❌   | `tests/auth/providers.test.ts`   | Future scope        |

#### REQ-RBAC: Role-Based Access Control

> **Source of Truth**: Detailed RBAC requirements are maintained in [docs/PRD_RBAC.md](PRD_RBAC.md).

| ID        | Capability           | Priority | Status | Verified By            |
| :-------- | :------------------- | :------: | :----: | :--------------------- |
| FEAT-RBAC | **Full RBAC System** |    P0    |   ✅   | See `docs/PRD_RBAC.md` |

#### REQ-FILE: File System & Storage

| ID  | Requirement | Priority | Status | Verified By (File > Test) | Notes |
| :-- | :---------- | :------: | :----: | :------------------------ | :---- |

> **Detailed Spec**: [docs/PRD_FileSystem.md](PRD_FileSystem.md)
> | REQ-FILE-001 | **Explorer UI**: Folder/File browsing | P1 | ✅ | `src/components/files/FileExplorer.tsx` | Basics provided |
> | REQ-FILE-002 | **Upload**: File upload with quotas | P1 | ✅ | `src/modules/files/FileService.ts` | Service Layer |
> | REQ-FILE-003 | **Delete**: Remove files | P1 | ✅ | `src/modules/files/FileService.ts` | Soft Delete |
> | REQ-FILE-004 | **Move**: Relocate files | P1 | ✅ | `src/modules/files/FileService.ts` | Metadata Move |
> | REQ-FILE-005 | **Rename**: Rename files/folders | P1 | ✅ | `src/modules/files/FileService.ts` | metadata update |
> | REQ-FILE-006 | **Download**: Secure link generation | P1 | ✅ | `src/modules/files/FileService.ts` | Signed URLs |
> | REQ-FILE-007 | **Visibility**: Strict RLS enforcement | P0 | ✅ | `supabase/migrations/..._filesystem.sql`| |
> | REQ-FILE-008 | **Admin Access**: View ALL files | P1 | ❌ | | Future scope |
> | REQ-FILE-009 | **Private Isolation**: Own files only | P0 | ✅ | `supabase/migrations/..._filesystem.sql`| |
> | REQ-FILE-010 | **Storage Quotas**: Enforce max storage | P1 | ❌ | `tests/storage/quotas.test.ts` | |
> | REQ-FILE-011 | **Quota UI**: Visual display | P2 | ❌ | `tests/e2e/files/quota.spec.ts` | |

#### REQ-NOTIFY: Notifications

| ID             | Requirement                             | Priority | Status | Verified By (File > Test)            | Notes |
| :------------- | :-------------------------------------- | :------: | :----: | :----------------------------------- | :---- |
| REQ-NOTIFY-001 | **Provider Interface**: API for Sending |    P1    |   ✅   | `tests/lib/notify/interface.test.ts` |       |
| REQ-NOTIFY-002 | **Mock Provider**: Dev implementation   |    P1    |   ✅   | `tests/lib/notify/mock.test.ts`      |       |
| REQ-NOTIFY-003 | **Test UI**: Admin trigger page         |    P2    |   ❌   | `tests/e2e/admin/notify.spec.ts`     |       |
| REQ-NOTIFY-004 | **Group Broadcast**: Role-based send    |    P2    |   ❌   | `tests/lib/notify/broadcast.test.ts` |       |
| REQ-NOTIFY-005 | **Broadcast Perms**: Configurable rules |    P1    |   ❌   | `tests/lib/notify/perms.test.ts`     |       |

#### REQ-PAY: Payment Integration

| ID          | Requirement                           | Priority | Status | Verified By (File > Test)         | Notes |
| :---------- | :------------------------------------ | :------: | :----: | :-------------------------------- | :---- |
| REQ-PAY-001 | **Provider Interface**: Subs/Invoices |    P1    |   ✅   | `tests/lib/pay/interface.test.ts` |       |
| REQ-PAY-002 | **Mock Provider**: Dev implementation |    P1    |   ✅   | `tests/lib/pay/mock.test.ts`      |       |
| REQ-PAY-003 | **Create Sub**: Admin start plan      |    P2    |   ✅   | `tests/lib/pay/subs.test.ts`      |       |
| REQ-PAY-004 | **Cancel Sub**: Admin stop plan       |    P2    |   ✅   | `tests/lib/pay/subs.test.ts`      |       |
| REQ-PAY-005 | **Billing Portal**: Provider link     |    P2    |   ✅   | `tests/lib/pay/portal.test.ts`    |       |
| REQ-PAY-006 | **Self-Service**: User billing page   |    P3    |   ❌   | `tests/e2e/billing.spec.ts`       |       |

#### REQ-AI: AI Orchestration

| ID         | Requirement                              | Priority | Status | Verified By (File > Test)        | Notes |
| :--------- | :--------------------------------------- | :------: | :----: | :------------------------------- | :---- |
| REQ-AI-001 | **Provider Interface**: LLM API          |    P1    |   ✅   | `tests/lib/ai/interface.test.ts` |       |
| REQ-AI-002 | **Mock Provider**: Canned responses      |    P1    |   ✅   | `tests/lib/ai/mock.test.ts`      |       |
| REQ-AI-003 | **Chat**: Interface capability           |    P2    |   ✅   | `tests/hooks/useChat.test.ts`    |       |
| REQ-AI-004 | **Task Gen**: Extraction from text       |    P2    |   ✅   | `tests/lib/ai/extract.test.ts`   |       |
| REQ-AI-005 | **Research**: Trend analysis             |    P2    |   ✅   | `tests/lib/ai/research.test.ts`  |       |
| REQ-AI-006 | **Action Validator**: Verification logic |    P0    |   ❌   | `tests/lib/ai/safety.test.ts`    |       |

#### REQ-REPORT: Reporting

| ID             | Requirement                        | Priority | Status | Verified By (File > Test)            | Notes |
| :------------- | :--------------------------------- | :------: | :----: | :----------------------------------- | :---- |
| REQ-REPORT-001 | **Provider Interface**: Export API |    P1    |   ✅   | `tests/lib/report/interface.test.ts` |       |
| REQ-REPORT-002 | **Excel Export**: .xlsx generation |    P2    |   ✅   | `tests/lib/report/excel.test.ts`     |       |
| REQ-REPORT-003 | **PDF Export**: .pdf generation    |    P2    |   ✅   | `tests/lib/report/pdf.test.ts`       |       |
| REQ-REPORT-004 | **Export Manifest**: Large dumps   |    P2    |   ✅   | `tests/lib/report/manifest.test.ts`  |       |
| REQ-REPORT-005 | **Test UI**: Sample trigger        |    P2    |   ❌   | `tests/e2e/admin/reports.spec.ts`    |       |

#### REQ-UI: User Interface

| ID         | Requirement                     | Priority | Status | Verified By (File > Test)           | Notes |
| :--------- | :------------------------------ | :------: | :----: | :---------------------------------- | :---- |
| REQ-UI-001 | **Login Page**: Form            |    P0    |   🔄   | `tests/e2e/auth/login.spec.ts`      |       |
| REQ-UI-002 | **Signup Page**: Form           |    P0    |   🔄   | `tests/e2e/auth/signup.spec.ts`     |       |
| REQ-UI-003 | **Reset Password**: UI          |    P0    |   ❌   | `tests/e2e/auth/reset.spec.ts`      |       |
| REQ-UI-004 | **Dashboard**: Protected home   |    P0    |   ✅   | `tests/e2e/dashboard.spec.ts`       |       |
| REQ-UI-005 | **Admin Users**: List view      |    P0    |   ✅   | See `docs/PRD_RBAC.md`              |       |
| REQ-UI-006 | **File Explorer**: UI component |    P1    |   ❌   | `tests/e2e/files/explorer.spec.ts`  |       |
| REQ-UI-007 | **Notify Tester**: UI           |    P2    |   ❌   | `tests/e2e/admin/notify.spec.ts`    |       |
| REQ-UI-008 | **Provider Tester**: UI         |    P2    |   ❌   | `tests/e2e/admin/providers.spec.ts` |       |
| REQ-UI-009 | **RTL Layout**: Right-to-left   |    P1    |   ✅   | `tests/e2e/ui/rtl.spec.ts`          |       |

#### REQ-INFRA: Infrastructure

| ID            | Requirement                  | Priority | Status | Verified By (File > Test)        | Notes |
| :------------ | :--------------------------- | :------: | :----: | :------------------------------- | :---- |
| REQ-INFRA-001 | **Framework**: Next.js 16    |    P0    |   ✅   | `tests/infra/build.test.ts`      |       |
| REQ-INFRA-002 | **Supabase**: SSR setup      |    P0    |   ✅   | `tests/infra/supabase.test.ts`   |       |
| REQ-INFRA-003 | **State**: Zustand + IDB     |    P0    |   ✅   | `tests/infra/store.test.ts`      |       |
| REQ-INFRA-004 | **PWA**: Offline support     |    P1    |   ✅   | `tests/infra/pwa.test.ts`        |       |
| REQ-INFRA-005 | **Proxy**: Middleware        |    P0    |   ✅   | `tests/middleware/chain.test.ts` |       |
| REQ-INFRA-006 | **Storybook**: Component Dev |    P1    |   ❌   | `.storybook/main.ts`             |       |

## 4. Success Metrics

- **Simplicity**: Codebase Lines of Code (LOC) reduced by ~20% vs multi-tenant implementation.
- **Modularity**: Time to swap payment provider < 4 hours.
- **Security**: 100% pass rate on RBAC permission tests.

## 5. Competitive Comparison

| Feature           | Standard Boilerplates | Our Core Framework                    |
| :---------------- | :-------------------- | :------------------------------------ |
| **Data Strategy** | App-centric           | **Sovereign-centric** (Native export) |
| **UI Philosophy** | Flashy                | **Minimalist**                        |

## 6. Intentional Omissions

- **Marketing Pages**: No landing pages.
- **Blog/CMS**: No MDX blog.
- **Analytics**: No Google Analytics / Posthog.
- **Feedback**: No voting widgets.
- **AI Wrappers**: No generic templates.
