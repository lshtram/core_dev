// This process is handled client-side in /update-password/page.tsx via supabase.auth.updateUser()
// This file can be removed or used for server-side actions in the future.
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Use client-side updateUser' }, { status: 200 })
}
