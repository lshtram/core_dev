'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
  
    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setMessage('')
  
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
          },
        },
      })
  
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email to confirm your account!')
      }
      setLoading(false)
    }
  
    return (
      <form onSubmit={handleSignup} className="auth-form">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    )
}
