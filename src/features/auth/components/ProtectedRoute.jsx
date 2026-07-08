import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'

export function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)

  if (loading) {
    return (
      <div className="grid min-h-svh place-items-center text-muted-foreground">
        Memuat...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
