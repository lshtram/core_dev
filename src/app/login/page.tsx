import LoginForm from './LoginForm'
import Link from 'next/link'

export const metadata = {
  title: 'Login - Core SaaS',
}

export default function LoginPage() {
  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <p>Sign in with your email and password</p>
      <LoginForm />
      <p className="auth-redirect">
        Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  )
}
