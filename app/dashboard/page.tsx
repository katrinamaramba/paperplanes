'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [letters, setLetters] = useState<any[]>([])
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this letter? This cannot be undone.')
    if (!confirmed) return

    const { error } = await supabase.from('letters').delete().eq('id', id)

    if (error) {
      alert('Failed to delete: ' + error.message)
      return
    }

    setLetters(letters.filter((letter) => letter.id !== id))
  }

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/login')
      return
    }

    const checkProfile = async () => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profileData) {
        router.push('/choose-username')
        return
      }

      setProfile(profileData)

      const { data: lettersData } = await supabase
        .from('letters')
        .select('*, profiles(username)')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false })

      setLetters(lettersData || [])
      setChecking(false)
    }

    checkProfile()
  }, [user, authLoading])

  if (authLoading || checking) return <p style={{ padding: 20 }}>Loading...</p>

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <style>{`
        @keyframes page-header-rise {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-header-icon { opacity: 0; animation: page-header-rise 0.6s ease-out 0.05s forwards; }
        .page-header-eyebrow { opacity: 0; animation: page-header-rise 0.6s ease-out 0.15s forwards; }
        .page-header-title { opacity: 0; animation: page-header-rise 0.6s ease-out 0.25s forwards; }
        .page-header-flourish { opacity: 0; animation: page-header-rise 0.6s ease-out 0.35s forwards; }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="page-header-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <img src="/images/logo.png" alt="" width={30} height={30} />
        </div>

        <p
          className="page-header-eyebrow"
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-ink-soft)',
            margin: '0 0 10px 0',
          }}
        >
          Your space
        </p>

        <h1 className="page-header-title" style={{ fontSize: 34, margin: 0 }}>
          Welcome, {profile?.username}
        </h1>

        <div
          className="page-header-flourish"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0 0 0' }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="3.5" fill="var(--color-accent)" opacity="0.6" />
          </svg>
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
        </div>
      </div>

      <h2 style={{
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      }}>
        Your Letters
        <span style={{ flex: 1, height: 1, background: 'var(--color-line)' }} />
      </h2>

      {letters.length === 0 && (
        <div className="letter-card" style={{ padding: 32, textAlign: 'center', marginBottom: 24 }}>
          <p style={{ color: 'var(--color-ink-soft)', marginTop: 0 }}>
            You haven't written any letters yet.
          </p>
          <a
            href="/write"
            style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '10px 24px',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            Write your first letter
          </a>
        </div>
      )}

      {letters.map((letter) => (
        <div key={letter.id} className="letter-card" style={{ padding: 20, marginBottom: 16 }}>
          <Link href={`/letter/${letter.share_token}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <p style={{ marginTop: 0 }}><strong>To:</strong> {letter.recipient_name}</p>
            <p style={{ color: 'var(--color-ink-soft)' }}>{letter.content.slice(0, 100)}...</p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-soft)' }}>
              by {letter.profiles?.username} · {letter.is_public ? 'Public' : 'Private'}
            </p>
          </Link>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => handleDelete(letter.id)}
              style={{
                fontSize: 14,
                cursor: 'pointer',
                color: 'var(--color-accent)',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
