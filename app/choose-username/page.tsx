'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ChooseUsername() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (username.trim().length < 3) {
      setAvailable(null)
      return
    }

    setChecking(true)
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.trim())
        .maybeSingle()

      setAvailable(!data)
      setChecking(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('profiles')
      .insert([{ id: user?.id, username }])

    setLoading(false)

    if (error) {
      if (error.code === '23505') {
        setError('That username is already taken.')
      } else {
        setError(error.message)
      }
      return
    }

    router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 440, margin: '80px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Choose a username</h1>

      <div className="letter-card" style={{ padding: 32, marginTop: 20 }}>
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 0, marginBottom: 20, textAlign: 'center' }}>
          This is how you'll appear on PaperPlanes.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            placeholder="e.g. yourname"
            style={{
              width: '100%',
              padding: 10,
              border: `1px solid ${available === false ? 'var(--color-accent)' : 'var(--color-line)'}`,
              borderRadius: 8,
              fontFamily: 'var(--font-ui)',
              fontSize: 15,
              background: '#fff',
            }}
          />

          <p style={{ fontSize: 13, marginTop: 6, marginBottom: 12, minHeight: 18 }}>
            {checking && <span style={{ color: 'var(--color-ink-soft)' }}>Checking...</span>}
            {!checking && available === true && (
              <span style={{ color: '#4B7A51' }}>✓ Username available</span>
            )}
            {!checking && available === false && (
              <span style={{ color: 'var(--color-accent)' }}>Already taken</span>
            )}
          </p>

          {error && (
            <p style={{ color: 'var(--color-accent)', fontSize: 14, marginBottom: 12 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || available === false}
            style={{
              width: '100%',
              padding: 12,
              background: available === false ? 'var(--color-ink-soft)' : 'var(--color-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              cursor: available === false ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}