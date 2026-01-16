# Test Specification: Core SaaS Framework

> **Context**: Verified Requirements from `PRD_current.md` > **Traceability ID**: TEST_SPEC-CORE-SAAS

## 1. Test Manifest

| Test ID          | Requirement | Type        | Description                                              | File Path                            |
| :--------------- | :---------- | :---------- | :------------------------------------------------------- | :----------------------------------- |
| **TST-RBAC-001** | REQ-RBAC    | Unit (DB)   | Verifies student cannot update roles via RLS.            | `supabase/tests/auth/rbac.test.sql`  |
| **TST-AUTH-001** | REQ-AUTH    | Integration | Verifies profile auto-creation on signup trigger.        | `tests/auth/profile_trigger.test.ts` |
| **TST-PERS-001** | REQ-PERS    | Browser     | Verifies Zustand state persists via IndexedDB on reload. | `tests/infra/persistence.spec.ts`    |
| **TST-RTL-001**  | REQ-I18N    | Style       | Verifies CSS Logical Properties usage for Hebrew parity. | `tests/ui/rtl_integrity.test.ts`     |
| **TST-PAY-001**  | REQ-ABSTR   | Unit        | Verifies `PaymentInterface` works with MockProvider.     | `src/lib/payments/payment.test.ts`   |

## 2. Test Environment

- **Data**: Supabase Local (Dockerized PostgreSQL)
- **Browser**: Playwright (for PWA/Persistence/RTL checks)
- **Unit Testing**: Vitest
- **API Mocks**: MSW for external provider testing (Stripe/Resend)

## 3. Coverage Analysis

| Requirement          | Total Tests | Pass/Fail |
| :------------------- | :---------- | :-------- |
| RBAC Enforcement     | 1           | [Pending] |
| Single-Org Isolation | 1           | [Pending] |
| State Persistence    | 1           | [Pending] |
| RTL Integrity        | 1           | [Pending] |
| Provider Abstraction | 1           | [Pending] |
