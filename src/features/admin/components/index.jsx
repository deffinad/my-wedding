import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { LogOut, Users, UserCheck, UserX } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useAdminRsvpStore } from '@/features/admin/store/rsvpStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from './DataTable'
import { createRsvpColumns } from './columns'

function StatCard({ icon, label, value }) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3">
        <span className="grid size-14 place-items-center rounded-lg bg-secondary/10 text-secondary">
          {icon}
        </span>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold tabular-nums text-foreground">
            {value}
          </span>
          <span className="text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminPage() {
  const navigate = useNavigate()
  const signOut = useAuthStore((state) => state.signOut)

  const list = useAdminRsvpStore((state) => state.list)
  const listStatus = useAdminRsvpStore((state) => state.listStatus)
  const listError = useAdminRsvpStore((state) => state.listError)
  const loadList = useAdminRsvpStore((state) => state.loadList)
  const remove = useAdminRsvpStore((state) => state.remove)

  useEffect(() => {
    loadList()
  }, [loadList])

  const stats = useMemo(() => {
    const attending = list.filter((item) => item.is_attending)
    const persons = attending.reduce(
      (sum, item) => sum + (item.max_persons || 0),
      0
    )
    return {
      total: list.length,
      attending: attending.length,
      declined: list.length - attending.length,
      persons,
    }
  }, [list])

  const columns = useMemo(
    () =>
      createRsvpColumns({
        onDelete: async (row) => {
          try {
            await remove(row.id)
            toast.success('RSVP dihapus.')
          } catch (error) {
            toast.error(error.message || 'Gagal menghapus RSVP.')
          }
        },
      }),
    [remove]
  )

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-svh bg-gray-100 space-y-4 px-4 py-6">
      <header>
        <div className="relative flex min-h-56 max-w-5xl mx-auto justify-between overflow-hidden rounded-3xl bg-secondary p-6 text-white sm:p-8">
          <div className="z-10 flex flex-col gap-2 justify-center">
            <p className="text-3xl font-bold">Halo, Selamat Datang 👋</p>
            <p className="max-w-md text-white/80 text-sm">
              Pantau dan kelola konfirmasi kehadiran tamu undangan pernikahan
              Anda di satu tempat.
            </p>
          </div>

          <div>
            <Button
              type="button"
              onClick={handleSignOut}
              className="z-10 rounded-full border border-white/30 bg-white/15 text-white hover:bg-white/25"
            >
              <LogOut />
              Keluar
            </Button>
          </div>

          <img
            src="/assets/images/melati3.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute -bottom-6 -right-4 w-40 select-none"
          />
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <StatCard
            icon={<Users className="size-5" />}
            label="Total RSVP"
            value={stats.total}
          />
          <StatCard
            icon={<UserCheck className="size-5" />}
            label="Hadir"
            value={stats.attending}
          />
          <StatCard
            icon={<UserX className="size-5" />}
            label="Tidak hadir"
            value={stats.declined}
          />
          <StatCard
            icon={<Users className="size-5" />}
            label="Total tamu"
            value={stats.persons}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Tamu</CardTitle>
            <CardDescription>Kelola daftar tamu anda</CardDescription>
          </CardHeader>

          <CardContent>
            {listStatus === 'error' ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                Gagal memuat data: {listError}. Pastikan kredensial Supabase
                &amp; kebijakan RLS (SELECT) sudah diatur.
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={list}
                searchPlaceholder="Cari nama atau ucapan..."
                isLoading={listStatus === 'loading'}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
