'use client'

/**
 * useHaptics
 * Provides tactile feedback for mobile devices (PWA).
 * Useful for piano practice (metronome ticks) or art school (approval alerts).
 */
export function useHaptics() {
  const trigger = (pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }

  const success = () => trigger([10, 50, 10])
  const error = () => trigger([100, 50, 100])
  const light = () => trigger(10)

  return { trigger, success, error, light }
}
