import SignupForm from './SignupForm'
import Link from 'next/link'

export const metadata = {
  title: 'Sign Up - Core SaaS',
}

export default function SignupPage() {
  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <p>Register with your email and password</p>
      <SignupForm />
      <p className="auth-redirect">
        Already have an account? <Link href="/login">Sign In</Link>
      </p>
    </div>
  )
}
