import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <form action="/auth/signout" method="post">
          <button type="submit" className="signout-button">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </header>
      <section className="dashboard-content">
        <div className="profile-card">
          <h2>Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
          <p><strong>Role:</strong> {profile?.role || 'student'}</p>
        </div>
      </section>
    </main>
  )
}
