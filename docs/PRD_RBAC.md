# PRD: Role-Based Access Control (RBAC)

## 1. Goal & Context

**Problem**: The current app has Authentication (Login/Signup) but no Authorization. Any logged-in user can theoretically access any resource if they guess the URL.
**Goal**: Implement a strict, hierarchical RBAC system where a user's role (`system_admin`, `org_admin`, etc.) determines their access to UI routes and Database rows.
**Context**: This is the "Core" of the B2B framework. All future features (File System, Reports) rely on this module being 100% secure.

## 1.5 Traceability

**ID**: FEAT-CORE-RBAC
**Tech Spec**: [docs/TECH_SPEC.md]

## 2. User Stories

| Actor         | Action                    | Outcome                                               | Priority |
| :------------ | :------------------------ | :---------------------------------------------------- | :------- |
| **Org Admin** | Visits `/dashboard/admin` | Sees a table of all users in their Org.               | P0       |
| **Student**   | Visits `/dashboard/admin` | Redirected to `/dashboard` (or sees 403 page).        | P0       |
| **Manager**   | Clicks "Delete User"      | Can only delete `teacher` or `student` roles.         | P1       |
| **Org Admin** | Promotes a user           | Selects "Manager" from a dropdown; updates instantly. | P0       |

## 3. Requirements

### 3.1 definitions

**Role Hierarchy (ENUM)**:

1.  `system_admin` (Superuser)
2.  `org_admin` (Owner of the Organization instance)
3.  `manager` (Can manage lower tiers)
4.  `teacher` (Content creator/distributor)
5.  `student` (Consumer)

### 3.2 Detailed Requirements & Test Traceability

> **Legend**: ✅ = Pass, ❌ = Fail, 🚧 = In Progress

#### REQ-RBAC-CORE: Data & Security logic

| ID           | Requirement                                        | Priority | Status | Verified By (File > Test)         | Notes         |
| :----------- | :------------------------------------------------- | :------: | :----: | :-------------------------------- | :------------ |
| REQ-RBAC-001 | **Role Schema**: Implement 5-tier Enum (above)     |    P0    |   ✅   | `tests/auth/rbac_schema.test.ts`  | DB Constraint |
| REQ-RBAC-002 | **Public Read**: Profiles visible to auth users    |    P0    |   ✅   | `tests/auth/rls_profiles.test.ts` | RLS Policy    |
| REQ-RBAC-003 | **Self-Update**: User edits own profile only       |    P0    |   ✅   | `tests/auth/rls_profiles.test.ts` | RLS Policy    |
| REQ-RBAC-004 | **Role Integrity**: Only Admin modifies roles      |    P0    |   ✅   | `tests/auth/rls_roles.test.ts`    | RLS Policy    |
| REQ-RBAC-009 | **Route Guard**: Middleware redirects unauthorized |    P0    |   ✅   | `tests/middleware/rbac.test.ts`   | Middleware    |

#### REQ-RBAC-UI: Admin Interface & UX

| ID             | Requirement                                         | Priority | Status | Verified By (File > Test)                  | Notes           |
| :------------- | :-------------------------------------------------- | :------: | :----: | :----------------------------------------- | :-------------- |
| REQ-RBAC-UI-01 | **User Table**: Columns [Name, Email, Role, Joined] |    P0    |   ✅   | `stories/admin/UserTable.stories.tsx`      | ShadCN Table    |
| REQ-RBAC-UI-02 | **Role Badge**: Color-coded badges for roles        |    P1    |   ✅   | `stories/components/RoleBadge.stories.tsx` | Visual Aid      |
| REQ-RBAC-UI-03 | **Edit Action**: Dropdown to change Role            |    P0    |   ❌   | `stories/admin/RoleSelect.stories.tsx`     | Optimistic UI   |
| REQ-RBAC-UI-04 | **Self-Demotion Guard**: Disable "Edit" on self     |    P1    |   ❌   | `tests/e2e/admin/roles.spec.ts`            | Prevent lockout |
| REQ-RBAC-UI-05 | **Create Modal**: Simple form [Email, Role]         |    P1    |   ❌   | `stories/admin/UserModal.stories.tsx`      | invites user    |
| REQ-RBAC-UI-06 | **403 Page**: Friendly "Access Denied" UI           |    P1    |   ✅   | `stories/pages/403.stories.tsx`            | Not just JSON   |

## 4. Success Metrics

- **Security**: 100% of "Student tries to update Role" tests fail.
- **UX**: Admin can promote a user in < 3 clicks.

## 6. Intentional Omissions

- **Granular Permissions**: No "Custom Role" builder. Roles are fixed code constants.
- **Audit Logs**: Full audit logging is deferred to a future feature.
