import { AppRole } from '@/lib/supabase/types'

interface RoleBadgeProps {
  role: AppRole | string // Allow string for flexibility if types aren't perfect yet
}

export function RoleBadge({ role }: RoleBadgeProps) {
  // Map role to CSS class from globals.css
  const getBadgeClass = (r: string) => {
    switch (r) {
      case 'system_admin':
      case 'org_admin':
        return 'badge-admin'
      case 'manager':
        return 'badge-manager'
      case 'teacher':
      case 'student':
      default:
        return 'badge-student'
    }
  }

  const formatLabel = (r: string) => {
    return r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <span className={`badge ${getBadgeClass(role)}`}>
      {formatLabel(role)}
    </span>
  )
}
