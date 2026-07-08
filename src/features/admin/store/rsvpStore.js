import { create } from 'zustand'
import { deleteRsvp, fetchRsvps } from '@/features/admin/api/rsvp'

/**
 * State daftar RSVP untuk dashboard admin.
 */
export const useAdminRsvpStore = create((set, get) => ({
  list: [],
  listStatus: 'idle', // idle | loading | success | error
  listError: null,

  loadList: async () => {
    set({ listStatus: 'loading', listError: null })
    try {
      const data = await fetchRsvps()
      set({ list: data, listStatus: 'success' })
    } catch (error) {
      set({ listStatus: 'error', listError: error.message })
    }
  },

  remove: async (id) => {
    await deleteRsvp(id)
    set({ list: get().list.filter((item) => item.id !== id) })
  },
}))
