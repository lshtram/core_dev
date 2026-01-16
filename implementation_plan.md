# Implementation Plan - RBAC Feature

This plan covers the end-to-end implementation of the Role-Based Access Control system, ensuring strict adherence to the [PRD](../docs/PRD_RBAC.md) and [Tech Spec](../docs/TECH_SPEC.md).

## User Review Required

> [!IMPORTANT] > **Database Migration**: This plan involves a database migration to add the `app_role` enum. This is a destructive/schema-altering change.
> **Middleware**: Global middleware will be updated to enforce RBAC. This could affect existing routes if not tested carefully.

## Proposed Changes

### Design System (Step 0)

#### [MODIFY] `src/app/globals.css`

- Port variables from `docs/prototypes/style_guide.html`.
- Define standard utility classes (`.btn`, `.badge`, `.input` etc) to ensure consistency.

### Database Layer

#### [NEW] `supabase/migrations/20240101000000_add_rbac.sql`

- Define `app_role` enum (`system_admin`, `org_admin`, `manager`, `teacher`, `student`).
- Add `role` column to `public.profiles`.
- implementation of `auth.user_role()` helper function.
- RLS Policies for "Public Read", "Self Update", "Admin Update".

### Core Type System

#### [MODIFY] `src/types/database.types.ts`

- Update with new schema (via generation or manual sync for now).

#### [NEW] `src/types/rbac.ts`

- Helper types for Role checks in frontend code.

### Middleware & Security

#### [MODIFY] `src/middleware.ts`

- Update `updateSession` to inspect user role.
- Implement redirection logic for `/dashboard/admin` -> `/403` if role < `org_admin`.

### UI Components (Code-First Verification)

> Reference: `docs/prototypes/rbac_admin_dashboard.html` & `docs/prototypes/rbac_403.html`

#### [NEW] `src/components/rbac/RoleBadge.tsx`

- Component to display role with correct color coding (Red/Blue/Gray).

#### [NEW] `src/app/403/page.tsx`

- Implementation of the Access Denied page.

#### [NEW] `src/app/dashboard/admin/page.tsx`

- The main Admin Dashboard table.
- **Storybook**: `stories/admin/Dashboard.stories.tsx`.

## Verification Plan

### Automated Tests

- **Unit (RLS)**: `npm test tests/auth/rbac_schema.test.ts` (Verify DB constraints).
- **Unit (Components)**: `npm test tests/components/UserRow.test.tsx`.
- **E2E**: `npm test tests/e2e/admin/dashboard.spec.ts` (Navigate as Admin vs Student).

### Manual Verification

1. **Migrations**: Apply migration locally (`supabase db reset`).
2. **Storybook**: Run `npm run storybook` and verify `RoleBadge` and `Dashboard` states.
3. **Browser**:
   - Log in as Admin -> Visit `/dashboard/admin` -> Pass.
   - Log in as Student -> Visit `/dashboard/admin` -> Redirect to `/403`.
