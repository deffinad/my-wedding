import { supabase } from '@/lib/supabase'

/**
 * Kirim satu entri RSVP dari tamu ke tabel `rsvp`.
 * @param {{ name: string, isAttending: boolean, wishes?: string, maxPersons?: number }} payload
 */
export async function createRsvp({ name, isAttending, wishes, maxPersons }) {
  // Sengaja TANPA .select(): tamu (anon) tidak punya policy SELECT, dan
  // membaca kembali baris hasil insert (RETURNING) akan ditolak RLS.
  const { error } = await supabase.from('rsvp').insert({
    name,
    is_attending: isAttending,
    wishes: wishes || null,
    max_persons: maxPersons ?? 1,
  })

  if (error) throw error
}

/**
 * Ambil daftar ucapan RSVP (yang punya ucapan) untuk ditampilkan publik,
 * dengan paginasi untuk infinite scroll. Butuh policy SELECT untuk role `anon`.
 * @param {{ from?: number, to?: number }} range - rentang baris (inklusif)
 */
export async function fetchPublicRsvps({ from = 0, to = 9 } = {}) {
  const { data, error } = await supabase
    .from('rsvp')
    .select('id, name, is_attending, wishes, created_at')
    .not('wishes', 'is', null)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw error
  return data ?? []
}
