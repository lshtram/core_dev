import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'
import { Tables } from '../lib/supabase/types'

// Custom storage object for IndexedDB using idb-keyval
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name)
  },
}

interface SessionState {
  profile: Tables<'profiles'> | null
  setProfile: (profile: Tables<'profiles'> | null) => void
  activeWorkflowId: string | null
  setActiveWorkflowId: (id: string | null) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      activeWorkflowId: null,
      setActiveWorkflowId: (id) => set({ activeWorkflowId: id }),
    }),
    {
      name: 'core-session-storage',
      storage: createJSONStorage(() => storage),
    }
  )
)
