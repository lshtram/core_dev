# Test Traceability & Status Report

> **Last Updated**: 2026-01-16
> **Purpose**: Strictly map every PRD Requirement to its verifying test file and current execution status.

## 1. Core Framework (REQ-CORE)

| Req ID             | Requirement        | Test File                            | Status | Notes             |
| :----------------- | :----------------- | :----------------------------------- | :----: | :---------------- |
| **REQ-AUTH-001**   | Signup Flow        | `tests/e2e/auth/signup.spec.ts`      |   🔄   | Pending E2E Retry |
| **REQ-AUTH-002**   | Login Flow         | `tests/e2e/auth/login.spec.ts`       |   🔄   | Pending E2E Retry |
| **REQ-AUTH-004**   | Profile Creation   | `tests/auth/triggers.test.ts`        |   ✅   | Verified          |
| **REQ-AUTH-005**   | Sign Out           | `tests/e2e/auth/signout.spec.ts`     |   ✅   | Verified          |
| **REQ-AUTH-006**   | Route Security     | `tests/middleware/auth.test.ts`      |   ✅   | Verified          |
| **REQ-NOTIFY-001** | Provider Interface | `tests/lib/notify/interface.test.ts` |   ✅   | Verified          |
| **REQ-NOTIFY-002** | Mock Provider      | `tests/lib/notify/mock.test.ts`      |   ✅   | Verified          |
| **REQ-PAY-001**    | Provider Interface | `tests/lib/pay/interface.test.ts`    |   ✅   | Verified          |
| **REQ-PAY-002**    | Mock Provider      | `tests/lib/pay/mock.test.ts`         |   ✅   | Verified          |
| **REQ-PAY-003**    | Create Sub         | `tests/lib/pay/subs.test.ts`         |   ✅   | Verified          |
| **REQ-PAY-004**    | Cancel Sub         | `tests/lib/pay/subs.test.ts`         |   ✅   | Verified          |
| **REQ-PAY-005**    | Billing Portal     | `tests/lib/pay/portal.test.ts`       |   ✅   | Verified          |
| **REQ-AI-001**     | LLM Interface      | `tests/lib/ai/interface.test.ts`     |   ✅   | Verified          |
| **REQ-AI-002**     | Mock Provider      | `tests/lib/ai/mock.test.ts`          |   ✅   | Verified          |
| **REQ-AI-003**     | Chat Hook          | `tests/hooks/useChat.test.ts`        |   ✅   | Verified          |
| **REQ-AI-004**     | Task Extraction    | `tests/lib/ai/extract.test.ts`       |   ✅   | Verified          |
| **REQ-AI-005**     | Research Agent     | `tests/lib/ai/research.test.ts`      |   ✅   | Verified          |
| **REQ-REPORT-001** | Export Interface   | `tests/lib/report/interface.test.ts` |   ✅   | Verified          |
| **REQ-REPORT-002** | Excel Export       | `tests/lib/report/excel.test.ts`     |   ✅   | Verified          |
| **REQ-REPORT-003** | PDF Export         | `tests/lib/report/pdf.test.ts`       |   ✅   | Verified          |
| **REQ-REPORT-004** | Export Manifest    | `tests/lib/report/manifest.test.ts`  |   ✅   | Verified          |
| **REQ-UI-004**     | Dashboard Guard    | `tests/e2e/dashboard.spec.ts`        |   ✅   | Verified          |
| **REQ-UI-009**     | RTL Layout         | `tests/e2e/ui/rtl.spec.ts`           |   ✅   | Verified          |
| **REQ-INFRA-001**  | Build Config       | `tests/infra/build.test.ts`          |   ✅   | Verified          |
| **REQ-INFRA-002**  | Supabase Connect   | `tests/infra/supabase.test.ts`       |   ✅   | Verified          |
| **REQ-INFRA-003**  | Zustand Store      | `tests/infra/store.test.ts`          |   ✅   | Verified          |
| **REQ-INFRA-004**  | PWA Manifest       | `tests/infra/pwa.test.ts`            |   ✅   | Verified          |
| **REQ-INFRA-005**  | Middleware Chain   | `tests/middleware/chain.test.ts`     |   ✅   | Verified          |

## 2. Role-Based Access Control (REQ-RBAC)

| Req ID             | Requirement     | Test File                                  | Status | Notes            |
| :----------------- | :-------------- | :----------------------------------------- | :----: | :--------------- |
| **REQ-RBAC-001**   | 5-Tier Schema   | `tests/auth/rbac_schema.test.ts`           |   ✅   | Enforced in SQL  |
| **REQ-RBAC-002**   | Public Profiles | `tests/auth/rls_profiles.test.ts`          |   ✅   | RLS Policy       |
| **REQ-RBAC-003**   | Self-Edit Only  | `tests/auth/rls_profiles.test.ts`          |   ✅   | RLS Policy       |
| **REQ-RBAC-004**   | Admin Integrity | `tests/auth/rls_roles.test.ts`             |   ✅   | RLS Policy       |
| **REQ-RBAC-009**   | Route Guard     | `tests/middleware/rbac.test.ts`            |   ✅   | Middleware       |
| **REQ-RBAC-UI-01** | User Table      | `stories/admin/UserTable.stories.tsx`      |   ✅   | Admin Dashboard  |
| **REQ-RBAC-UI-02** | Role Badge      | `stories/components/RoleBadge.stories.tsx` |   ✅   | Visual Component |
| **REQ-RBAC-UI-06** | 403 Page        | `stories/pages/403.stories.tsx`            |   ✅   | Error Page       |

## 3. Pending / Unverified Features

### File System (Upcoming)

| Req ID           | Requirement    | Planned Test                       | Status |
| :--------------- | :------------- | :--------------------------------- | :----: |
| **REQ-FILE-007** | RLS Visibility | `tests/storage/rls.test.ts`        |   ❌   |
| **REQ-FILE-001** | Explorer UI    | `tests/e2e/files/explorer.spec.ts` |   ❌   |
