import { create } from 'zustand'
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signOut,
} from '@/features/auth/api/auth'

/**
 * State autentikasi admin berbasis Supabase Auth.
 * Panggil `init()` sekali saat aplikasi mount untuk memuat session & memasang listener.
 */
export const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,
  error: null,
  _initialized: false,

  init: async () => {
    if (get()._initialized) return
    set({ _initialized: true })

    const {
      data: { session },
    } = await getSession()
    set({ session, user: session?.user ?? null, loading: false })

    onAuthStateChange((_event, nextSession) => {
      set({ session: nextSession, user: nextSession?.user ?? null })
    })
  },

  signIn: async (email, password) => {
    set({ error: null })
    const { data, error } = await signInWithPassword(email, password)
    if (error) {
      set({ error: error.message })
      throw error
    }
    set({ session: data.session, user: data.user })
    return data
  },

  signOut: async () => {
    await signOut()
    set({ session: null, user: null })
  },
}))
