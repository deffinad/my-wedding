import { supabase } from '@/lib/supabase'

/** Ambil semua entri RSVP (butuh policy SELECT untuk authenticated). */
export async function fetchRsvps() {
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

/** Hapus satu entri RSVP berdasarkan id. */
export async function deleteRsvp(id) {
  const { error } = await supabase.from('rsvp').delete().eq('id', id)
  if (error) throw error
}
