import { create } from 'zustand'
import { createRsvp, fetchPublicRsvps } from '@/features/users/api/rsvp'

const PAGE_SIZE = 10

/**
 * State RSVP sisi tamu: pengiriman form + daftar ucapan publik (infinite scroll).
 */
export const useRsvpStore = create((set, get) => ({
  // --- Pengiriman form ---
  status: 'idle', // idle | submitting | success | error
  submitError: null,

  submit: async (payload) => {
    set({ status: 'submitting', submitError: null })
    try {
      const data = await createRsvp(payload)
      set({ status: 'success' })
      return data
    } catch (error) {
      set({ status: 'error', submitError: error.message })
      throw error
    }
  },

  reset: () => set({ status: 'idle', submitError: null }),

  // --- Daftar ucapan publik (paginasi) ---
  list: [],
  listStatus: 'idle', // idle | loading | success | error
  loadingMore: false,
  hasMore: true,

  // Muat halaman pertama (reset daftar).
  loadFirst: async () => {
    set({ listStatus: 'loading' })
    try {
      const data = await fetchPublicRsvps({ from: 0, to: PAGE_SIZE - 1 })
      set({
        list: data,
        listStatus: 'success',
        hasMore: data.length === PAGE_SIZE,
      })
    } catch {
      set({ listStatus: 'error' })
    }
  },

  // Muat halaman berikutnya (append) untuk infinite scroll.
  loadMore: async () => {
    const { list, loadingMore, hasMore, listStatus } = get()
    if (loadingMore || !hasMore || listStatus !== 'success') return

    set({ loadingMore: true })
    try {
      const from = list.length
      const data = await fetchPublicRsvps({ from, to: from + PAGE_SIZE - 1 })
      set({
        list: [...list, ...data],
        loadingMore: false,
        hasMore: data.length === PAGE_SIZE,
      })
    } catch {
      set({ loadingMore: false })
    }
  },
}))
