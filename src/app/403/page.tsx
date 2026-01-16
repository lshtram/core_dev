import Link from 'next/link'

export default function AccessDeniedPage() {
  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div style={{ maxWidth: '400px', background: 'white', padding: '3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🚫</span>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 700 }}>Access Denied</h1>
        <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: '2rem' }}>
          You do not have the required permissions to view this resource.
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
