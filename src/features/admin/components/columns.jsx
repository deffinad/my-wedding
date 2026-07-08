import { Badge } from '@/components/ui/badge'
import { DeleteRsvpButton } from './DeleteRsvpButton'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function createRsvpColumns({ onDelete }) {
  return [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.getValue('name')}
        </span>
      ),
    },
    {
      accessorKey: 'is_attending',
      header: 'Kehadiran',
      cell: ({ row }) => {
        const attending = row.getValue('is_attending')
        return (
          <Badge
            className={
              attending
                ? 'bg-emerald-100 text-emerald-500'
                : 'bg-red-100 text-red-500'
            }
          >
            {attending ? 'Hadir' : 'Tidak hadir'}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'max_persons',
      header: 'Jumlah',
      cell: ({ row }) => (
        <span className="tabular-nums">{row.getValue('max_persons')}</span>
      ),
    },
    {
      accessorKey: 'wishes',
      header: 'Ucapan',
      enableSorting: false,
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-xs text-muted-foreground">
          {row.getValue('wishes') || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Waktu',
      cell: ({ row }) => {
        const value = row.getValue('created_at')
        return (
          <span className="whitespace-nowrap text-muted-foreground">
            {value ? dateFormatter.format(new Date(value)) : '—'}
          </span>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <DeleteRsvpButton
          name={row.original.name}
          onConfirm={() => onDelete(row.original)}
        />
      ),
    },
  ]
}
