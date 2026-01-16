import { render, screen } from '@testing-library/react'
import { RoleBadge } from '@/components/rbac/RoleBadge'
import { describe, it, expect } from 'vitest'

describe('RoleBadge', () => {
  it('renders system_admin with correct badge class', () => {
    render(<RoleBadge role="system_admin" />)
    const badge = screen.getByText('System Admin')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge-admin')
  })

  it('renders manager with correct badge class', () => {
    render(<RoleBadge role="manager" />)
    const badge = screen.getByText('Manager')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge-manager') // From RoleBadge.tsx logic
  })

  it('renders student with correct badge class', () => {
    render(<RoleBadge role="student" />)
    const badge = screen.getByText('Student')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge-student')
  })

  it('handles unknown roles gracefully', () => {
    render(<RoleBadge role="unknown_role" />)
    const badge = screen.getByText('Unknown Role')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge-student') // Default case
  })
})
