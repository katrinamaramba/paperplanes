'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'var(--color-ink)',
    fontSize: 15,
  }

  return (
    <header
      style={{
        background: '#FAF9F6', /* Changed to perfectly match the body's warm cream */
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          textDecoration: 'none',
          color: 'var(--color-ink)',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Image
          src="/images/logo.png"
          alt="PaperPlanes Logo"
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
        <span>PaperPlanes</span>
      </Link>

      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', fontSize: 14 }}>
        <Link href="/feed" style={linkStyle}>Feed</Link>
        <Link href="/about" style={linkStyle}>About</Link>

        {user ? (
          <>
            <Link href="/write" style={linkStyle}>Write a Letter</Link>
            <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
            <button
              onClick={handleLogout}
              style={{
                cursor: 'pointer',
                background: 'none',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                padding: '6px 14px',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                color: 'var(--color-ink-soft)',
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              ...linkStyle,
              padding: '6px 16px',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: 6,
            }}
          >
            Log In
          </Link>
        )}
      </nav>
    </header>
  )
}