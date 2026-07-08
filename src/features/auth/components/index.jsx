import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const signIn = useAuthStore((state) => state.signIn)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err?.message || 'Gagal masuk. Periksa email dan kata sandi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-svh place-items-center bg-gray-50 px-4">
      <div className="space-y-6 w-full max-w-sm">
        <div>
          <p className="text-xl font-semibold text-center">Admin Login</p>
          <p className="text-sm text-center text-muted-foreground">
            Masuk untuk mengelola daftar RSVP tamu
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@email.com"
              className="h-auto px-3 py-2.5"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="h-auto px-3 py-2.5"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="mt-2 w-full hover:bg-secondary/90 bg-secondary"
          >
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  )
}
