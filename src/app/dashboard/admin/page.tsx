import { createClient } from '@/lib/supabase/server'
import { RoleBadge } from '@/components/rbac/RoleBadge'
import { AppRole } from '@/lib/supabase/types'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <p className="type-p" style={{ color: 'var(--destructive)' }}>
          Error loading blocking users: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="type-h2" style={{ margin: 0 }}>User Management</h1>
          <p className="type-p">Manage users, roles, and permissions.</p>
        </div>
        <button className="btn btn-primary">
          + Invite User
        </button>
      </header>
      
      <div className="toolbar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input 
          type="search" 
          placeholder="Search users by name or email..." 
          style={{ width: '300px' }} 
        />
        <select style={{ width: 'auto', backgroundColor: 'var(--background)' }}>
          <option value="">All Roles</option>
          <option value="system_admin">System Admin</option>
          <option value="org_admin">Org Admin</option>
          <option value="manager">Manager</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead style={{ backgroundColor: 'var(--muted)' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>Role</th>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>Joined</th>
              <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(profiles || []).map((user) => (
              <tr key={user.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div 
                      style={{ 
                        width: '32px', height: '32px', 
                        backgroundColor: 'var(--border)', 
                        borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', color: 'var(--muted-foreground)'
                      }}
                    >
                      {(user.full_name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{user.full_name || 'Unknown'}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                  <RoleBadge role={user.role as AppRole} />
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'middle', color: 'var(--muted-foreground)' }}>
                  {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                  <button className="btn btn-ghost" style={{ padding: '0.4rem' }}>•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
