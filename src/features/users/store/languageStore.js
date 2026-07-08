import { create } from 'zustand'

/** Bahasa aktif untuk undangan (en | id). Default: id. */
export const useLanguageStore = create((set) => ({
  language: 'id',
  setLanguage: (language) => set({ language }),
}))
