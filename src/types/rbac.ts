import { AppRole } from '@/lib/supabase/types'

export const ROLES: Record<string, AppRole> = {
  SYSTEM_ADMIN: 'system_admin',
  ORG_ADMIN: 'org_admin',
  MANAGER: 'manager',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const

export const ROLE_HIERARCHY: Record<AppRole, number> = {
  system_admin: 100,
  org_admin: 80,
  manager: 60,
  teacher: 40,
  student: 20,
}

export function hasRole(userRole: AppRole, requiredRole: AppRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

export function isExactRole(userRole: AppRole, requiredRole: AppRole): boolean {
  return userRole === requiredRole
}
