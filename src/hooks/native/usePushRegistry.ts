'use client'

import { useState, useMemo } from 'react'

/**
 * usePushRegistry
 * Manages Service Worker registration and Push Subscription.
 */
export function usePushRegistry() {
  const isSupported = useMemo(() => {
    if (typeof window === 'undefined') return false
    return 'serviceWorker' in navigator && 'PushManager' in window
  }, [])
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)


  const register = async () => {
    if (!isSupported) return null

    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      })
      setSubscription(sub)
      return sub
    } catch (error) {
      console.error('Push registration failed:', error)
      return null
    }
  }

  return { isSupported, subscription, register }
}
